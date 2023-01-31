#!/bin/bash

# Checking Secondary Server Network Health througt Master Server

# flag to check if email has been sent
email_sent=0

# Set the recipient email address
recipient="{{ recipientmail }}"

 while true
  do


    nc -z -w 5 {{ secondary_server['public_ip'] }} 22 &> /dev/null
    if  [ $? -eq 0 ]; then
        nc -z -w 5 {{ secondary_server['replication_ip'] }} 22 &> /dev/null
        if  [ $? -eq 0 ]; then
           # Check ssh service health
           if [ $email_sent -eq 1 ]; then
              body="
Hi

This mail was sent from server $(hostname).

{{ secondary_server['hostname'] }} reachable, Check Operating System && SAP Hana Services !!


Regards"

        echo "$body" | mail -s "Server availibility for {{ secondary_server['hostname'] }} server !!" "$recipient"
        email_sent=0
            fi

         fi

    else

      if [ $email_sent -eq 0 ]; then

       body="
Hi

This mail was sent from server $(hostname).

{{ secondary_server['hostname'] }} is giving unresponse, Check Operating System && Hardware State !!


Regards"

        echo "$body" | mail -s "Server availibility for {{ secondary_server['hostname'] }} server !!" "$recipient"
        email_sent=1
      fi
    fi

sleep 20

done
