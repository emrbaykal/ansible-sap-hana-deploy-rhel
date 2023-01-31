#!/bin/bash

# flag to check if email has been sent
email_sent=0

# Set the recipient email address
recipient="{{ recipientmail }}"


while true
do

# Get SAP Hana Process List
processes_list=$(/usr/sap/hostctrl/exe/sapcontrol -nr {{ number }} -function GetProcessList)

# Get Stopped Process List
stopped_count=$(echo "$processes_list" | grep -i "stopped" | wc -l)

# Check if the count is greater or equal than 1
if [ "$stopped_count" -ge 1 ]  && [ "$email_sent" -eq 0 ]; then


body="
Hi

This mail was sent from server $(hostname).

SAP HANA {{ sid }} Instances on $(hostname) does not working properly !!

PED Instance Process List:

$processes_list

Regards"

echo "$body" | mail -s "Warning Is Received From SAP HANA Services Running On $(hostname) Server !" "$recipient"

# Set the flag to indicate that email has been sent
email_sent=1
fi



# Check if the count is equal than 0
if [ "$stopped_count" -eq 0 ] && [ "$email_sent" -eq 1 ]; then


body="
Hi

This mail was sent from server $(hostname).

SAP HANA {{ sid }} Instances on $(hostname) working properly.

PED Instance Process List:

$processes_list

Regards"

echo "$body" | mail -s "SAP HANA Services Returned To Desired Status $(hostname) Server !" "$recipient"

# reset the flag
email_sent=0

fi

# Sleep for 5 minutes
sleep 300

done
