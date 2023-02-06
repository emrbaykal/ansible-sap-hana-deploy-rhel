#!/bin/bash

# Define the bonding interface name and email address
data_bond_interface={{ data_interface }}
rep_bond_interface={{ rep_interface }}
email_sent_data=0
email_sent_rep=0
data_all_up=0
rep_all_up=0
data_all=0
rep_all=0

# Set the recipient email address
recipient="{{ recipientmail }}"

while true
do

# Data Network Redundancy Check --

if  [ -f /proc/net/bonding/$data_bond_interface ]; then

   # Get the current status of the bonding interface
   data_net_status=$(cat /proc/net/bonding/$data_bond_interface 2>&1 | grep "Slave Interface" | awk '{print $3}')
   data_all=$(cat /proc/net/bonding/$data_bond_interface 2>&1 | grep "Slave Interface" | wc -l)

  # Loop through each bonding member
  for i in $data_net_status; do

    # Check if the bonding member is down
    if [ "$(cat /sys/class/net/$i/operstate)" = "up" ]; then

      # Set the all_up flag to 0 if any bonding member is down
      ((data_all_up=data_all_up+1))

    fi

  done


  if [ $data_all_up -eq $data_all ] && [ $email_sent_data -eq 1 ]; then

    body="

This mail was sent from server $(hostname).

Data Network All Bonding Members Are Up !!

Number Of Data Network Interfaces Actively Running On Bonding Configuration : $data_all_up

This email is an automated message. Please do not reply. "

    echo "$body" | mail -s "Data Network Redundancy Turned Back Desired State From $(hostname) Server !" "$recipient"
    email_sent_data=0

  fi

  if [ $data_all_up -lt $data_all ] && [ $email_sent_data -eq 0 ]; then

     body="

This mail was sent from server $(hostname).

Data Network One Or More Bonding Members Are Down !!

Number Of Data Network Interfaces Actively Running On Bonding Configuration : $data_all_up

This email is an automated message. Please do not reply. "

     echo "$body" | mail -s "Data Network Redundancy Decreased From $(hostname) Server !" "$recipient"
     email_sent_data=1
  fi

fi

# Replication Network Redundancy Check --

if  [ -f /proc/net/bonding/$rep_bond_interface ]; then

   # Get the current status of the bonding interface
   rep_net_status=$(cat /proc/net/bonding/$rep_bond_interface 2>&1 | grep "Slave Interface" | awk '{print $3}')
   rep_all=$(cat /proc/net/bonding/$rep_bond_interface 2>&1 | grep "Slave Interface" | wc -l)


  # Loop through each bonding member
  for j in $rep_net_status; do

    # Check if the bonding member is down
    if [ "$(cat /sys/class/net/$j/operstate)" = "up" ]; then

      # Set the all_up flag to 0 if any bonding member is down
      ((rep_all_up=rep_all_up+1))
    fi

  done


  if [ $rep_all_up -eq $rep_all ] && [ $email_sent_rep -eq 1 ]; then

     body="

This mail was sent from server $(hostname).

Replication Network All Bonding Members Are Up !!

Number Of Replication Network Interfaces Actively Running On Bonding Configuration : $rep_all_up

This email is an automated message. Please do not reply. "

    echo "$body" | mail -s "Replication Network Redundancy Turned Back Desired State From $(hostname) Server !" "$recipient"
    email_sent_rep=0
  fi

  if [ $rep_all_up -lt $rep_all ] && [ $email_sent_rep -eq 0 ]; then

     body="

This mail was sent from server $(hostname).

Replication Network One Or More Bonding Members Are Down !!

Number Of Replication Network Interfaces Actively Running On Bonding Configuration : $rep_all_up

This email is an automated message. Please do not reply. "

     echo "$body" | mail -s "Replication Network Redundancy Decreased From $(hostname) Server !" "$recipient"
     email_sent_rep=1
  fi

fi


data_all_up=0
rep_all_up=0

# Sleep for 1 minutes
sleep 60

done

