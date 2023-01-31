Configure SAP Hana
=====================

This role configures a SLES 15 SP 1 system according to the SAP notes.

Requirements
------------

To use this role your system needs to be installed with at SLES 15 following modules:

 - Basesystem-Module 15-0
 - Desktop-Applications-Module 15-0
 - Development-Tools-Module 15-0
 - Legacy-Module 15-0
 - SAP-Applications-Module 15-0
 - SLE-15-SAP 15-0
 - SLEHA15 15-0
 - Server-Applications-Module 15-0

 Role Variables
 --------------

 ### FQDN
The following variable define fully-qualified domain
```yaml
fqdn: test.local
```
### Registration Code
The following variable define SUSE account subscription registration code
```yaml
regcode: *************
```
### Operating System Disk Drives
The following variable define Operating Systems Logical Drives assigned disk drives.
```yaml
OS_Data_Drives:
  - 1I:1:2
  - 1I:1:1
```
### Operating System Logical Drive Name
The following variable define Operating Systems Logical Drive Name.
```yaml
OS_LogicalDriveName: OS
```
### Operating System Logical Drive Raid Type
The following variable define Operating Systems Logical Drive Raid Type.
```yaml
OS_Raid: Raid1
```
### Operating System Logical Drive Capacity
The following variable define Operating Systems Logical Drive Capacity Gib.
Set to -1 to use all remaining space for maximum size
```yaml
OS_CapacityGiB: 180
```
### Hana Log Disk Drives
The following variable define Hana Log Logical Drives assigned disk drives.
```yaml
Hana_Log_Drives:
  - 1I:1:2
  - 1I:1:1
```
### Hana Log Logical Drive Name
The following variable define Hana Log Logical Drive Name.
```yaml
Hana_Log_LogicalDriveName: LOG
```
### Hana Log Logical Drive Raid Type
The following variable define Hana Log Logical Drive Raid Type.
```yaml
Hana_Log_Raid: Raid1
```
### Hana Log Logical Drive Capacity
The following variable define Hana Log Logical Drive Capacity Gib.
Set to -1 to use all remaining space for maximum size
```yaml
Hana_Log_CapacityGiB: 120
```
### Hana Data Disk Drives
The following variable define Hana Data Logical Drives assigned disk drives.
```yaml
Hana_Data_Drives:
  - 1I:1:2
  - 1I:1:1
```
### Hana Data Logical Drive Name
The following variable define Hana Data Logical Drive Name.
```yaml
Hana_Data_LogicalDriveName: DATA
```
### Hana Data Logical Drive Raid Type
The following variable define Hana Data Logical Drive Raid Type.
```yaml
Hana_Data_Raid: Raid1
```
### Hana Data Logical Drive Capacity
The following variable define Hana Data Logical Drive Capacity Gib.
Set to -1 to use all remaining space for maximum size
```yaml
Hana_Data_CapacityGiB: 120
```

### Physical Disk
The following variable define to physical disk information's
```yaml
disks:
    partition: /dev/sdb
    volume_group: vg_hana
```

### SAP Hana Shared Mount Point
The following variable define /hana/shared mount point and logical volume information
```yaml
hanavols:
    hana_shared:
      size: 1536G
      vol: vg_hana
      lv: lv_hana_shared
      mountpoint: /hana/shared
      fs_type: xfs
```

### SAP Hana Data Mount Point
The following variable define /hana/data mount point and logical volume information
```yaml
hanavols:
  hana_data:
    size: 5400G
    vol: vg_hana
    lv: lv_hana_data
    mountpoint: /hana/data
    fs_type: xfs
```

### SAP Hana Log Mount Point
The following variable define /hana/log mount point and logical volume information
```yaml
hanavols:
  hana_logs:
    size: 1536G
    vol: vg_hana
    lv: lv_hana_log
    mountpoint: /hana/log
    fs_type: xfs
```
### SAP Hana sap application Mount Point
The following variable define /usr/sap mount point and logical volume information
```yaml
hanavols:
  usr_sap:
    size: 80G
    vol: vg_root
    lv: lv_hana_usr_sap
    mountpoint: /usr/sap
    fs_type: xfs
```
### Time Server
The following variable define NTP server information
```yaml
ntp_servers:
     hostname: 192.168.1.11
```

### Hana Installtion Files
The following variable define SAP Hana installation files
```yaml
hana_deployment:
    server: IMDB_SERVER20_045_0-80002031.SAR
    client: IMDB_CLIENT20_004_171-80002082.SAR
    sapcar: SAPCAR_1311-80000935.EXE
    source: /home/emre/Documents/SAP/SAP-IMAGES/HANA2.0/SP04
    destination: /setup
```
### Hana DB Configuration Parameters
The following variable define SAP Hana DB configuration parameters
```yaml
# Hana DB Configuration Parameters
# Components ( Valid values: all | client | es | ets | lcapps | server | smartda | streaming | rdsync | xs | studio | afl | pos | sal | sca | sop | trd | udf )
components: server,client
# Action ( Default: exit; Valid values: install | update | extract_components )
action: install
# SAP HANA System ID (ex: HDB)
sid: IEP
# Instance Number (ex: 00)
number: "00"
# Database Mode ( Default: single_container; Valid values: single_container | multiple_containers )
db_mode: multiple_containers
# System Usage ( Default: custom; Valid values: production | test | development | custom )
system_usage: production
# SAP Host Agent User (sapadm) Password
sapadm_password: *******
# System Administrator Password
system_admin_password: *******
# Database User (SYSTEM) Password
system_user_password: ********
# Restrict maximum memory allocation? ( Default: off; Valid values: off | on )
restrict_max_mem: off
# Maximum Memory Allocation in MB
max_mem: 0
```
### Hana DB Replication Parameters
The following variable define SAP Hana DB Replication Parameters
```yaml
primary_server:
  hostname: testhanadb1
  public_ip: 192.168.1.21
  replication_ip: 192.168.254.11

secondary_server:
  hostname: testhanadb2
  public_ip: 192.168.1.22
  replication_ip: 192.168.254.12

# Replication Type ( sync | syncmem | async )
replication_type: async

# Hana Key Exchange Temporary Storage ( logreplay )
sap_hana_hsr_keyexchange_tmp: /home/emre/Documents/Office/git/ansible-sap-hana-deploy-rhel/hsr_keyexchange_tmp

```

### Deployment Roles
HPE Proliant Server Preconfigure Role Tasks {{ role: proliant-server-preconfigure }}
```yaml
- Check Proliant Server power state, powered on server if needed
  - 01-power-state.yml
- Configure Raid Controller
  - 02-logical-drives.yml
- Configure Bios Settings
  - 03-bios-settings.yml
```
Operating System Preconfigure Role Tasks { role: sap-hana-preconfigure }}
```yaml
- Configure Hostname
  - 01-configure-hostname.yml
- Configure Login Messages
  - 02-configure-issue.yml
- Configure Network Time Protocol
  - 03-configure-network-time-and-date.yml
- Configure OS Disk Snapshot Policies
  - 04-tune-snapshot-parameters.yml
- Register Operating System to the SUSE Customer Center
  - 05-register-suse.yml
- Update Operating System
  - 06-update-operating-system.yml
- Configure Logical Volumes and Mount Points
  - 07-sap-hana-filesystem.yml
- Apply Sap Hana Tuning Parameters
  - 08-configuring-system-parameters.yml
```
Deploy Sap Hana Services { role: sap-hana-deploy }
```yaml
- Pre installation Process
  - 01-preparing-installation.yml
- SAP Hana Installation & Configuration
  - 02-hana-installation.yml
- Sap Hana Host Agent Installation
  - 03-host-agent-installation.yml
```
Maintain Sap Hana System Replication { role: sap-hana-replication }
```yaml
- Prepare Master Server
  - 01-preparing-master-server.yml
- Prepare Slave Server
  - 02-preparing-slave-server.yml
- Perform System Replication
  - 03-perform-system-replication.yml
- Check System Replication Status
  - 04-system-replication-status.yml
```


Example Playbook
----------------

```yaml
---
- hosts: hana
  remote_user: root

  vars:
          # Sap Servers Hostname / IP Informations
          fqdn: test.local

          # subscribe  variables
          regcode: *************

          OS_Data_Drives:
            - 1I:1:2
            - 1I:1:1
          OS_LogicalDriveName: OS
          OS_Raid: Raid1
          #Set to -1 to use all remaining space for maximum size
          OS_CapacityGiB: 180

          # Hana Log Logical Drive
          HANA_Log_Drives:
            - 1I:1:2
            - 1I:1:1
          HANA_Log_LogicalDriveName: LOG
          HANA_Log_Raid: Raid1
          #Set to -1 to use all remaining space for maximum size
          HANA_Log_CapacityGiB: 120

          # Hana Data Logical Drive
          HANA_Data_Drives:
            - 1I:1:2
            - 1I:1:1
          HANA_Data_LogicalDriveName: DATA
          HANA_Data_Raid: Raid1
          #Set to -1 to use all remaining space for maximum size
          HANA_Data_CapacityGiB: -1

          # disk-init role variables
          disks:
              partition: /dev/sdb
              volume_group: vg_hana
          hanavols:
              hana_shared:
                size: 1536G
                vol: vg_hana
                lv: lv_hana_shared
                mountpoint: /hana/shared
                fs_type: xfs
              hana_data:
                size: 5400G
                vol: vg_hana
                lv: lv_hana_data
                mountpoint: /hana/data
                fs_type: xfs
              hana_logs:
                size: 1536G
                vol: vg_hana
                lv: lv_hana_log
                mountpoint: /hana/log
                fs_type: xfs
              usr_sap:
                size: 80G
                vol: vg_root
                lv: lv_hana_usr_sap
                mountpoint: /usr/sap
                fs_type: xfs


          # rhel-system-roles.timesync variables
          ntp_servers:
               hostname: 192.168.1.11
              # hostname: 1.rhel.pool.ntp.org


          # Hana Installation files
          hana_deployment:
              server: IMDB_SERVER20_045_0-80002031.SAR
              client: IMDB_CLIENT20_004_171-80002082.SAR
              sapcar: SAPCAR_1311-80000935.EXE
              source: /home/emre/Documents/SAP/SAP-IMAGES/HANA2.0/SP04
              destination: /setup

          # Hana DB Configuration Parameters
          # Components ( Valid values: all | client | es | ets | lcapps | server | smartda | streaming | rdsync | xs | studio | afl | pos | sal | sca | sop | trd | udf )
          components: server,client
          # Action ( Default: exit; Valid values: install | update | extract_components )
          action: install
          # SAP HANA System ID (ex: HDB)
          sid: IEP
          # Instance Number (ex: 00)
          number: "00"
          # Database Mode ( Default: single_container; Valid values: single_container | multiple_containers )
          db_mode: multiple_containers
          # System Usage ( Default: custom; Valid values: production | test | development | custom )
          system_usage: production
          # SAP Host Agent User (sapadm) Password
          sapadm_password: *******
          # System Administrator Password
          system_admin_password: *******
          # Database User (SYSTEM) Password
          system_user_password: ********
          # Restrict maximum memory allocation? ( Default: off; Valid values: off | on )
          restrict_max_mem: off
          # Maximum Memory Allocation in MB
          max_mem: 0

          # Hana DB Replication Configuration Parameters

          primary_server:
            hostname: testhanadb1
            public_ip: 192.168.1.21
            replication_ip: 192.168.254.11

          secondary_server:
            hostname: testhanadb2
            public_ip: 192.168.1.22
            replication_ip: 192.168.254.12

          # Replication Type ( sync | syncmem | async )
          replication_type: syncmem




  roles:
         - { role: proliant-server-preconfigure }
         - { role: sap-hana-preconfigure }
         - { role: sap-hana-deploy }
         - { role: sap-hana-replication }

```
