#!/bin/bash

# Set the threshold for disk usage (in percent)
threshold={{ mem_threshold }}

# flag to check if email has been sent
email_sent=0


# Set the recipient email address
recipient="{{ recipientmail }}"



  while true
  do
    # Get the memory usage in the last $interval minutes
    memory_usage=$(sar -r 5 70 | tail -n 1 | awk '{print $5}')




    # Check if the memory usage is greater than 90%
    if (( $(echo "$memory_usage > $threshold" | bc -l) )) && [ "$email_sent" -eq 0 ]; then
        # Get the top 5 processes using the most memory
        top_processes=$(ps -eo %mem,comm | sort -k 1 -r | hawk 'FNR <= 5')

        # Send the email with the memory usage and top processes information
        body="

This mail was sent from server $(hostname).

Memory Usage on $(hostname) has exceeded $threshold% during last 5 minutes.

Current memory usage is $memory_usage%.

Top processes using the most memory:

$top_processes

This email is an automated message. Please do not reply. "

        echo "$body" | mail -s "High Memory Usage Warning from $(hostname) server !" "$recipient"


         # Set the flag to indicate that email has been sent
         email_sent=1
    fi



    # check if usage falls below threshold
    if (( $(echo "$memory_usage < $threshold" | bc -l) )) && [ "$email_sent" -eq 1 ]; then
        body="

This mail was sent from server $(hostname).

Memory Usage on $(hostname) went below $threshold% level during last 5 minutes.

Current memory usage is $memory_usage%.

This email is an automated message. Please do not reply. "

        echo "$body" | mail -s "Memory Usage turned back nominal levels for $(hostname) server !" "$recipient"

        # reset the flag
        email_sent=0
    fi

  done
