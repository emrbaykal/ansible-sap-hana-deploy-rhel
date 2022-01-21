Configuring the SAP HANA on local disks located on HPE proliant Gen 10 servers
=====================

This role configures a Redhat Enterprise Linux 8.x system on HPE proliant Gen 10 servers.

**When this role is run, the following steps will be applied briefly.**

  - Create host variable files according to the data read from the csv file.
  - Configure following Proliant Server hardware components:
      - Apply best bios settings for sap hana application.
      - Configure Raid Configurations for Operating systems disk and sap hana disks.
      - Apply bios settings for pmem if pmem order is given.
      - Mount operating system installation media from ilo interface.
  - Necessary operating system settings are made in order to install SAP Hana:
      - Configure Operating system hostname.
      - Configure ssh login banner.
      - Configure operating system network time protocol (NTP).
      - Apply brtfs snapshot Parameters.
      - Register operating system to the Redhat customer center & Satellite Server.
      - Apply latest operating system upgrates.
      - Confige Hana disks and mount points.
      - Operating system settings required for SAP Hanna are made (tuneadm and kernel parameters).
      - Necessary operating system and host settings are made to activate pmem.
  - Apply operating system security hardening settings.
  - Installing Sap Hana Application.
  - Build Sap Hana Database system replication.
  - Proliant servers are registered on the oneview application.

**In order for the installation to be concluded in a healthy way, the instructions detailed below must be followed !**

### 1. Edit site-local-storage.yml File:

Before the ansible playbooks will be executed, the site-local-storage.yml file must be configured according to the installation environment.

**Varibale Definitions:**

  - **automate_install:** If the operating system will be installed with automation, the value should be set to **true**. Otherwise assigned as **false**.
  - **installation_media:** Operating System Installation media source.
  - **fqdn:** fqdn information of the systems to be installed.
  - **relayhost:** Relay host information to be used in operating system mail settings.
  - **usermail:** The email address to which the operating system will send its mails.
  - **rsys_log_srv:** rsys log server ip information required for rsyslog redirection.
  - **rsys_log_srv_port:** rsys log server tcp port information required for rsyslog redirection.
  - **ntp_servers - hostname:** ntp server hostname information required for ntp server settings.
  - **oneview_ip:** If oneview is installed in the environment, the oneview ip address.
  - **oneview_username:** If oneview is installed in the environment, the oneview admin username address.
  - **oneview_password:** If oneview is installed in the environment, the oneview admin password address.
  - **email_Sender:** If oneview is installed in the environment, the email address to which the oneview will send its mails.
  - **hana_deployment - server:** IMDB Server Installation Media Source.
  - **hana_deployment - client:** IMDB SClient Installation Media Source.
  - **hana_deployment - sapcar:** Sapcar Installation Media Source.
  - **hana_deployment - hostnagent:** Host Agent Installation Media Source.


### 2.Edit vms-local-storage.csv File:

Before the ansible playbooks will be executed, the vms-local-storage.csv file located
under the host-vms-csv directory must be configured according to the installation environment.

Following example We will be plan to deploy sync replication sap hana servers.

| hostname | data_ip (Public IP) | rep_ip (Replication IP) | ilo_ip (Ilo Int. IP) | ilo_password (Ilo Int. Password) | satellite_user  |satellite_organization  |        
| -------- | ------------------  | ----------------------- | -------------------- | -------------------------------- | --------------- |----------------------- |
| test01   |   192.168.10.15     |       192.168.20.15     |    192.168.30.15     |              test1234!           |      admin      |      HPE-TUR           |
| test02   |   192.168.10.16     |       192.168.20.16     |    192.168.30.16     |              test1234!           |      admin      |      HPE-TUR           |

| satellite_location | satellite_host_group | satellite_activation_key | rhn_org_id     | rhn_act_key | rhel_rlease |        
| -------------------| ---------------------| ------------------------ | -------------- | ----------- | ----------- |
|     Istanbul       |      SAP-HANA        |     RHEL 8 HANA          |                |             |      8.2    |   
|     Istanbul       |      SAP-HANA        |     RHEL 8 HANA          |                |             |      8.2    |

| pmem_conf(Persis. Mem. Conf) | os_disc_raid | os_disc_capacity_gb | hana_disc_raid | hana_disc_capacity (-1 Remain Cap.) | hana_shared_lv_size |        
| ---------------------------- | -------------| ------------------- | -------------- | ----------------------------------- | ------------------- |
| true                         |      Raid1   |        148          |       Raid1    |                -1                   |          256        |   
| false                        |      Raid1   |        148          |       Raid1    |                -1                   |          256        |

| hana_data_lv_size_gb | hana_log_lv_size_gb | usr_sap_lv_size_gb | hana_sid | hana_instance_number | system_usage | hana_sapadm_password |       
| -------------------- | ------------------- | ------------------ | -------- | -------------------- | ------------ | -------------------- |
|        512           |         256         |        80          |   PED    |        00            |  production  |     test123!         |
|        512           |         256         |        80          |   PED    |        00            |  production  |     test123!         |

| hana_system_admin_password | hana_system_user_password | restrict_max_mem_allocation | restrict_max_mem_mb | rep_primary_hostname | rep_primary_public_ip |        
| -------------------------- | ------------------------- | --------------------------- | ------------------- | -------------------- | --------------------- |
|       test123!             |        test123!           |            off              |         0           |        test01        |     192.168.10.15     |
|       test123!             |        test123!           |            off              |         0           |        test01        |     192.168.10.15     |

| rep_primary_rep_ip | rep_secondary_hostname | rep_secondary_public_ip | rep_secondary_rep_ip | replication_type | rep_operation_mode |        
| ------------------ | -----------------------| ----------------------- | -------------------- | ---------------- | ------------------ |
|   192.168.20.15    |        test02          |     192.168.10.16       |    192.168.20.16     |     syncmem      |    logreplay       |
|   192.168.20.15    |        test02          |     192.168.10.16       |    192.168.20.16     |     syncmem      |    logreplay       |

**Varibale Definitions:**

  - **hostname:** The hostname of the server that is planned to be installed.
  - **data_ip:** Data Ip Address of the server that is planned to be installed.
  - **rep_ip:** Replication Ip Address of the server that is planned to be installed.
  - **ilo_ip:** HPE Porliant Server ilo ip address.
  - **ilo_password:** HPE Proliant Server ilo password.
  - **satellite_user:** Redhat Satellite Server user name.
  - **satellite_password:** Redhat Satellite Server password.
  - **satellite_organization:** Redhat Satellite Server Organization Name.
  - **satellite_location:** Redhat Satellite Location.
  - **satellite_host_group:** Redhat Satellite SAP Hana Host Group Name.
  - **satellite_activation_key:** Redhat Satellite activation key.
  - **rhn_org_id:** access.redhat.com organisation id.
  - **rhn_act_key:** access.redhat.com activation key.
  - **rhel_release:** Redhat Enterprise Linux release number.
  - **pmem_conf:** It should be assigned as **true** if there is a persistent memory configuration in the hardware. Otherwise assigned as **false**.
  - **os_disc_raid:** The raid configuration of the disk where the operating system is located. You can use **Raid1, Raid10, Raid5, Raid5, Raid6** Parameters.
  - **os_disc_capacity_gb:** Disk size (GB) where the operating system will be located.
  - **hana_disc_raid:** The raid configuration of the disk where the Hana Database is located. You can use **Raid1, Raid10, Raid5, Raid5, Raid6** Parameters.
  - **hana_disc_capacity_gb:** Disk size (GB) where the Hana Database will be located. if **-1** is used, all the rest of the disk is used.
  - **hana_shared_lv_size:** The size of the logical disk to be assigned to Hana Shared.
  - **hana_data_lv_size:** The size of the logical disk to be assigned to Hana Data.
  - **hana_log_lv_size:** The size of the logical disk to be assigned to Hana Log.
  - **hana_usr_sap_lv_size:** The size of the logical disk to be assigned to /usr/sap.
  - **hana_sid:** SID of Hana Database.
  - **hana_instance_number:** Hana Instance Number of Hana database.
  - **system_usage:** Hana database system usage information. You can use **production, development, custom, test** Parameters.
  - **hana_sapadm_password:** sapadm password of Hana Database.
  - **hana_system_admin_password:** System Admin password of Hana Database.
  - **hana_system_user_password:** System User password of Hana Database.
  - **restrict_max_mem_allocation:** Restrict Memory definition of Hana Database. It should be assigned as **off** if you do not use restrict memory. Otherwise assigned as **on**.
  - **restrict_max_mem_mb:** Restrict Max Memory size of Hana Database.
  - **rep_primary_hostname:** The hostname of the Primary server that is planned to be Sap Hana Replication.
  - **rep_primary_public_ip:** Data IP Address of the Primary server that is planned to be Sap Hana Replication.
  - **rep_primary_rep_ip:** Replication IP Address of the Primary server that is planned to be Sap Hana Replication.
  - **rep_secondary_hostname:** The hostname of the Secondary server that is planned to be Sap Hana Replication.
  - **rep_secondary_public_ip:** Data IP Address of the Secondary server that is planned to be Sap Hana Replication.
  - **rep_secondary_rep_ip:** Replication IP Address of the Secondary server that is planned to be Sap Hana Replication.
  - **replication_type:** Replication Type of Hana Database Replication Process. You can use **sync, syncmem, async** Parameters.
  - **rep_operation_mode:** Replication Operation Mode of Hana Database Replication Process. You can use **logreplay** Parameters.

### When site-local-storage.yml is run, it will briefly perform the following steps on the target server.

 ### 3. Call host-variable-local Role:

  **When this role is called, create host variable files according to the data read from the csv file.**


   **_# ansible-palybook site-local-storage.yml --tags role::host-variable-local_**


   This role import following yaml files:

   - Import 01-host-var.yml
      - It creates host variable files according to the data read from the csv file for each host to be deployed.
   - Import 02-hosts.yml
      - It's implementing ansible hosts files according to the data read from the csv file for each host to be deployed.

 ### 4. Call proliant-server-preconfigure-local Role:

  **When this role is called, hardware settings are made in accordance with the SAP Hana application.**


   **_# ansible-palybook site-local-storage.yml --tags role::physical-server-preconfigure-local_**

   This role import following yaml files:

   - Import 01-power-state.yml
     - Powered on Proliant Server via using ilo interface.
   - Import 02-logical-drives.yml
     - Configure Raid Configurations for Operating systems disk and sap hana disks.
   - Import 03-bios-settings.yml
     - Apply best bios settings for sap hana application.
   - Import 04-pmem-bios-settings.yml
     - Apply bios settings for pmem if pmem order is given.
   - Import 05-automate-server-install.yml
     - Mount operating system installation media from ilo interface.


 ### 5. Call  sap-hana-preconfigure-local Role:

 **When this role is called, necessary operating system settings are made in order to install SAP Hana.**


  **_# ansible-palybook site-local-storage.yml --tags role::sap-hana-preconfigure-local_**


  This role import following yaml files:

  - Import 01-configure-hostname
    - Configure Operating system hostname.
  - Import 02-configure-issue.yml
    - Configure ssh login banner.
  - Import 03-configure-network-time-and-date.yml
    - Configure operating system network time protocol (NTP).
  - Import 04-disable-firewalld-and-selinux.yml
    - Disable Firewalld service and disable selinux.
  - Import 05-register-rhel.yml
    - Register operating system to the sRedhat customer center & Satellite Server.
  - 06-required-packages.yml
   - Install required packages that sap hana needed
  - Import 07-update-operating-system.yml
    - Apply latest operating system upgrates.
  - Import 08-sap-hana-filesystem.yml
    - Confige Hana disks and mount points.
  - Import 09-configuring-system-parameters.yml
    -  Operating system settings required for SAP Hanna are made (saptune and kernel parameters).
  - Import 10-pmem-config.yml
    - Necessary operating system and host settings are made to activate pmem.

 ### 6. Call sap-hana-security-hardening Role:

 **When this role is called, apply operating system security hardening settings.**


  **_# ansible-palybook site-local-storage.yml --tags role::sap-hana-security-hardening_**


  This role import following yaml files:

  - Import 01-os-security-hardening.yml
    - Security hardening approved by SAP is applied to the operating system.
    - You can see the security hardening settings in the security-hardening excel file under the read-me directory.

 ### 7. Call sap-hana-deploy Role:

 **When this role is called, installing Sap Hana Application.**


  **_# ansible-palybook site-local-storage.yml --tags role::sap-hana-deploy_**


  This role import following yaml files:

  - Import 01-preparing-installation.yml
    - Copying the SAP Hana installation files to the target system and Extracting hana installation files from the archive using sapcar.
  - Import 02-hana-installation.yml
    - Installation of HANA application in line with the hana variables entered in the csv file.
  - Import 03-host-agent-installation.yml
    - Installing hana host agent.
  - Import 04-hana-pmem-config.yml
    - Entering the necessary settings in the global.ini file for the SAP hana system to use pmem.
  - Import 05-hana-service-user.yml
    - Ensuring that sapamd and <SID> adm users are not affected by current user security hardening rules.

 ### 8. Call sap-hana-replication Role:

 **When this role is called, build Sap Hana Database system replication.**

  **_# ansible-palybook site-local-storage.yml --tags role::sap-hana-replication_**

  This role import following yaml files:

  - Import 01-preparing-master-server.yml
    - Making necessary settings on the master server to install hana system replication.
  - Import 02-preparing-slave-server.yml
    - Making necessary settings on the slave server to install hana system replication..
  - Import 03-perform-system-replication.yml
    - Perform Hana System Replication.
  - Import 04-system-replication-status.yml
    - Reporting the health of hana system replication.

 ### 9. Call oneview-config Role:

 **When this role is called, Proliant servers are registered on the oneview application.**

  **_# ansible-palybook site-local-storage.yml --tags role::oneview-config_**

  This role import following yaml files:

  - Import 01-authenticate-oneview.yml
    - Made authentication to OneView Software.
  - Import 02-time-config.yml
    - Time settings of the OneView software are being made..
  - Import 03-create-scope.yml
    - Server scope definition is made on the oneview software where sap hana servers will be located..
  - Import 04-add-server-hardware.yml
    - Reporting the health of hana system replication.
  - Import 05-get-server-hardware.yml
    - Proliant Servers made registration to oneview software.
  - Import 06-email-notification.yml
    - Making the necessary mail settings to be transmitted over onview software  in case of hardware malfunctions.
