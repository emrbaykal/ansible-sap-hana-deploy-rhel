#!/bin/bash

# Set the threshold for disk usage (in percent)
threshold={{ cpu_threshold }}

# flag to check if email has been sent
email_sent=0


# Set the recipient email address
recipient="{{ recipientmail }}"


  while true
  do
    # Get the cpu usage in the last $interval minutes
    cpu_usage=$(sar -u 5 70 | tail -n 1 | awk '{print $3}')




    # Check if the mcpu usage is greater than 85%
    if (( $(echo "$cpu_usage > $threshold" | bc -l) )) && [ "$email_sent" -eq 0 ]; then
        # Get the top 5 processes using the most cpu
        top_processes=$(ps aux | sort -nrk 3,3 | awk 'FNR <= 5')

        # Send the email with the memory usage and top processes information
        body="

This mail was sent from server $(hostname).

Memory Usage on $(hostname) has exceeded $threshold% during last 5 minutes.

Current cpu usage is $cpu_usage%.

Top processes using the most cpu:

USER   |   PID  |  %CPU  |  %MEM  |  VSZ  |  RSS   |  TTY   |   STAT   |  START   |   TIME   |   COMMAND

$top_processes

This email is an automated message. Please do not reply. "

        echo "$body" | mail -s "High CPU Usage Warning from $(hostname) server !" "$recipient"


         # Set the flag to indicate that email has been sent
         email_sent=1
    fi



    # check if usage falls below threshold
    if (( $(echo "$cpu_usage < $threshold" | bc -l) )) && [ "$email_sent" -eq 1 ]; then
        body="

This mail was sent from server $(hostname).

Memory Usage on $(hostname) went below $threshold% level during last 5 minutes.

Current cpu usage is $cpu_usage%.

This email is an automated message. Please do not reply. "

        echo "$body" | mail -s "CPU Usage turned back nominal levels for $(hostname) server !" "$recipient"

        # reset the flag
        email_sent=0
    fi

  done
