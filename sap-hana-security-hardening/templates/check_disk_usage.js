#!/bin/bash

# Set the threshold for disk usage (in percent)
threshold={{ disk_threshold }}

# flag to check if email has been sent
email_sent_hana_data=0
email_sent_mount_hana_data=0
email_sent_hana_shared=0
email_sent_mount_hana_shared=0
email_sent_hana_log=0
email_sent_mount_hana_log=0
email_sent_root=0
email_sent_mount_root=0
email_sent_hana_usr_sap=0
email_sent_mount_hana_usr_sap=0
email_sent_hana_backup=0
email_sent_mount_hana_backup=0

# Set the recipient email address
recipient="{{ recipientmail }}"

# Mount Points
hana_usr_sap_mount_point="/usr/sap"
hana_data_mount_point="/hana/data"
hana_shared_mount_point="/hana/shared"
hana_log_mount_point="/hana/log"
hana_backup_mount_point="/hana/backup"
root_mount_point="/"


  while true
  do
    # Get the current disk usage
    root_usage=$(df / 2> /dev/null | awk '{ print $5 }' | tail -1 | cut -d'%' -f1)
    hana_data_usage=$(df /hana/data  2> /dev/null | awk '{ print $5 }' | tail -1 | cut -d'%' -f1)
    hana_shared_usage=$(df /hana/shared 2> /dev/null | awk '{ print $5 }' | tail -1 | cut -d'%' -f1)
    hana_log_usage=$(df /hana/log 2> /dev/null | awk '{ print $5 }' | tail -1 | cut -d'%' -f1)
    hana_usr_sap_usage=$(df /usr/sap 2> /dev/null | awk '{ print $5 }' | tail -1 | cut -d'%' -f1)
    hana_backup_usage=$(df /hana/backup 2> /dev/null | awk '{ print $5 }' | tail -1 | cut -d'%' -f1)

#----- Root FileSystem -----

if [ -d "$root_mount_point" ]; then

    if mountpoint -q "$root_mount_point" ; then

    # check if / usage exceeds threshold and email has not been sent yet
    if [ "$root_usage" -gt "$threshold" ] && [ "$email_sent_root" -eq 0 ]; then
      # Send email using the mail command
      body="

This mail was sent from server $(hostname).

Disk usage / on $(hostname) has exceeded $threshold%.

Current disk usage is $root_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "High Disk Usage Warning for / from $(hostname) server !" "$recipient"

      # Set the flag to indicate that email has been sent
      email_sent_root=1
    fi

    # check if / usage falls below threshold
    if [ "$root_usage" -lt "$threshold" ] && [ "$email_sent_root" -eq 1 ]; then
    body="

This mail was sent from server $(hostname).

Disk usage / on $(hostname) went bellow $threshold%.

Current disk usage is $root_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "/ Disk Usage turning back from $(hostname) server !" "$recipient"

        # reset the flag
        email_sent_root=0
    fi

     # Set the flag to indicate that email has been sent
      email_sent_mount_root=0

    else
       if   [ "$email_sent_mount_root" -eq 0 ]; then


         email_sent_mount_root=1

        body="

This mail was sent from server $(hostname).

Mount point "$root_mount_point" is not working or healthy !!

This email is an automated message. Please do not reply. "

        echo "$body" | mail -s " Warning $root_mount_point mount point from $(hostname) server !" "$recipient"

       fi
   fi

fi

#----- /hana/data FileSystem -----

if [ -d "$hana_data_mount_point" ]; then

    if mountpoint -q "$hana_data_mount_point" ; then

    # check if /hana/data usage exceeds threshold and email has not been sent yet
    if [ "$hana_data_usage" -gt "$threshold" ] && [ "$email_sent_hana_data" -eq 0 ]; then
      # Send email using the mail command
       body="

This mail was sent from server $(hostname).

Disk usage /hana/data on $(hostname) has exceeded $threshold%.

Current disk usage is $hana_data_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "High Disk Usage Warning for /hana/data from $(hostname) server !" "$recipient"

      # Set the flag to indicate that email has been sent
      email_sent_hana_data=1
    fi

    # check if /hana/data usage falls below threshold
    if [ "$hana_data_usage" -lt "$threshold" ] && [ "$email_sent_hana_data" -eq 1 ]; then
        body="

This mail was sent from server $(hostname).

Disk usage /hana/data on $(hostname) went bellow $threshold%.

Current disk usage is $hana_data_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "/hana/data Disk Usage turning back from $(hostname) server !" "$recipient"

        # reset the flag
        email_sent_hana_data=0
    fi

    # Set the flag to indicate that email has been sent
      email_sent_mount_hana_data=0

    else
       if   [ "$email_sent_mount_hana_data" -eq 0 ]; then

      email_sent_mount_hana_data=1

      body="

This mail was sent from server $(hostname).

Mount point "$hana_data_mount_point" is not working or healthy !!

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s " Warning $hana_data_mount_point mount point from $(hostname) server !" "$recipient"

       fi
   fi

fi

#----- /hana/log FileSystem -----

if [ -d "$hana_log_mount_point" ]; then

    if mountpoint -q "$hana_log_mount_point" ; then

    # check if /hana/log usage exceeds threshold and email has not been sent yet
    if [ "$hana_log_usage" -gt "$threshold" ] && [ "$email_sent_hana_log" -eq 0 ]; then
      # Send email using the mail command
       body="

This mail was sent from server $(hostname).

Disk usage /hana/log on $(hostname) has exceeded $threshold%.

Current disk usage is $hana_log_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "High Disk Usage Warning for /hana/log from $(hostname) server !" "$recipient"

      # Set the flag to indicate that email has been sent
      email_sent_hana_log=1
    fi

    # check if /hana/log usage falls below threshold
    if [ "$hana_log_usage" -lt "$threshold" ] && [ "$email_sent_hana_log" -eq 1 ]; then
    body="

This mail was sent from server $(hostname).

Disk usage /hana/log on $(hostname) went bellow $threshold%.

Current disk usage is $hana_log_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "/hana/log Disk Usage turning back from $(hostname) server !" "$recipient"

        # reset the flag
        email_sent_hana_log=0
    fi

    # Set the flag to indicate that email has been sent
      email_sent_mount_hana_log=0

    else
       if   [ "$email_sent_mount_hana_log" -eq 0 ]; then

      email_sent_mount_hana_log=1

      body="

This mail was sent from server $(hostname).

Mount point "$hana_log_mount_point" is not working or healthy !!

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s " Warning $hana_log_mount_point mount point from $(hostname) server !" "$recipient"

       fi
   fi

fi

#----- /hana/shared FileSystem -----

if [ -d "$hana_shared_mount_point" ]; then

    if mountpoint -q "$hana_shared_mount_point" ; then

    # check if /hana/shared usage exceeds threshold and email has not been sent yet
    if [ "$hana_shared_usage" -gt "$threshold" ] && [ "$email_sent_hana_shared" -eq 0 ]; then
      # Send email using the mail command
       body="

This mail was sent from server $(hostname).

Disk usage /hana/shared on $(hostname) has exceeded $threshold%.

Current disk usage is $hana_shared_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "High Disk Usage Warning for /hana/shared from $(hostname) server !" "$recipient"

      # Set the flag to indicate that email has been sent
      email_sent_hana_shared=1
    fi

    # check if /hana/shared usage falls below threshold
    if [ "$hana_shared_usage" -lt "$threshold" ] && [ "$email_sent_hana_shared" -eq 1 ]; then
    body="

This mail was sent from server $(hostname).

Disk usage /hana/shared on $(hostname) went bellow $threshold%.

Current disk usage is $hana_shared_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "/hana/shared Disk Usage turning back from $(hostname) server !" "$recipient"

        # reset the flag
        email_sent_hana_shared=0
    fi

    # Set the flag to indicate that email has been sent
      email_sent_mount_hana_shared=0

    else
       if   [ "$email_sent_mount_hana_shared" -eq 0 ]; then

      email_sent_mount_hana_shared=1

      body="

This mail was sent from server $(hostname).

Mount point "$hana_shared_mount_point" is not working or healthy !!

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s " Warning $hana_shared_mount_point mount point from $(hostname) server !" "$recipient"

       fi
   fi

fi
#----- /usr/sap FileSystem -----

if [ -d "$hana_usr_sap_mount_point" ]; then

    if mountpoint -q "$hana_usr_sap_mount_point" ; then

    # check if /usr/sap usage exceeds threshold and email has not been sent yet
    if [ "$hana_usr_sap_usage" -gt "$threshold" ] && [ "$email_sent_hana_usr_sap" -eq 0 ]; then
      # Send email using the mail command
       body="

This mail was sent from server $(hostname).

Disk usage /usr/sap on $(hostname) has exceeded $threshold%.

Current disk usage is $hana_usr_sap_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "High Disk Usage Warning for /usr/sap from $(hostname) server !" "$recipient"

      # Set the flag to indicate that email has been sent
      email_sent_hana_usr_sap=1
    fi

    # check if /usr/sap usage falls below threshold
    if [ "$hana_usr_sap_usage" -lt "$threshold" ] && [ "$email_sent_hana_usr_sap" -eq 1 ]; then
    body="

This mail was sent from server $(hostname).

Disk usage /uar/sap on $(hostname) went bellow $threshold%.

Current disk usage is $hana_usr_sap_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "/usr/sap Disk Usage turning back from $(hostname) server !" "$recipient"

        # reset the flag
        email_sent_hana_usr_sap=0
    fi

    # Set the flag to indicate that email has been sent
      email_sent_mount_hana_usr_sap=0

    else
       if   [ "$email_sent_mount_hana_usr_sap" -eq 0 ]; then

      email_sent_mount_hana_usr_sap=1

      body="

This mail was sent from server $(hostname).

Mount point "$hana_usr_sap_mount_point" is not working or healthy !!

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s " Warning $hana_usr_sap_mount_point mount point from $(hostname) server !" "$recipient"

       fi
   fi

fi

#----- /hana/backup FileSystem -----

if [ -d "$hana_backup_mount_point" ]; then

if mountpoint -q "$hana_backup_mount_point" ; then

    # check if /hana/backup usage exceeds threshold and email has not been sent yet
    if [ "$hana_backup_usage" -gt "$threshold" ] && [ "$email_sent_hana_backup" -eq 0 ]; then
      # Send email using the mail command
       body="

This mail was sent from server $(hostname).

Disk usage /hana/backup on $(hostname) has exceeded $threshold%.

Current disk usage is $hana_backup_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "High Disk Usage Warning for /hana/backup from $(hostname) server !" "$recipient"

      # Set the flag to indicate that email has been sent
      email_sent_hana_backup=1
    fi

    # check if /hana/backup usage falls below threshold
    if [ "$hana_backup_usage" -lt "$threshold" ] && [ "$email_sent_hana_backup" -eq 1 ]; then
    body="

This mail was sent from server $(hostname).

Disk usage /hana/backup on $(hostname) went bellow $threshold%.

Current disk usage is $hana_backup_usage%.

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s "/hana/backup Disk Usage turning back from $(hostname) server !" "$recipient"

        # reset the flag
        email_sent_hana_backup=0
    fi

    # Set the flag to indicate that email has been sent
      email_sent_mount_hana_backup=0

    else
       if   [ "$email_sent_mount_hana_backup" -eq 0 ]; then

      email_sent_mount_hana_backup=1

      body="

This mail was sent from server $(hostname).

Mount point "$hana_backup_mount_point" is not working or healthy !!

This email is an automated message. Please do not reply. "

      echo "$body" | mail -s " Warning $hana_backup_mount_point mount point from $(hostname) server !" "$recipient"

       fi
   fi
fi

    # Sleep for 1 minutes
    sleep 60
done

