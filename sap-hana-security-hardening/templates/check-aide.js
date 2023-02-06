#!/bin/bash

# Set the recipient email address
recipient="{{ recipientmail }}"


# Get the memory usage in the last $interval minutes
aide_check=$(/usr/sbin/aide --check)
show_date=$(/usr/bin/date "+%A %B %d %Y")



# Send the email with the memory usage and top processes information

body="

AIDE report dated $show_date from $(hostname) server is listed below.

#############     Advanced Intrusion Detection Environment Report     #############

#############              Report Date: $show_date              #############


$aide_check


###################################################################################

This email is an automated message. Please do not reply. "

echo "$body" | mail -s "Advanced Intrusion Detection Environment Report from $(hostname) server !" "$recipient"

# Update Database
/usr/sbin/aide --update  &>/dev/null
mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db  &>/dev/null

