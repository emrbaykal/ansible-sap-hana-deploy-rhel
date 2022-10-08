Role Name: sap-hana-preconfigure-shared
=========

**When this role is called, necessary operating system settings are made in order to install SAP Hana.**


 **_# ansible-palybook site-shared-storage.yml --tags role::sap-hana-preconfigure-shared_**


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

   Main Playbook
   ----------------

```yaml
---
  #tasks file for suse-os-preconfigure

  - name: Gathering facts
    setup:
    tags:
      - role::sap-hana-preconfigure-shared
      - role::sap-hana-preconfigure-shared::setup

  - import_tasks: 01-configure-hostname.yml
    tags:
      - role::sap-hana-preconfigure-shared
      - role::sap-hana-preconfigure-shared::hostname

  - import_tasks: 02-configure-issue.yml
    tags:
      - role::sap-hana-preconfigure-shared
      - role::sap-hana-preconfigure-shared::issue

  - import_tasks: 03-configure-network-time-and-date.yml
    tags:
    - role::sap-hana-preconfigure-shared
    - role::sap-hana-preconfigure-shared::configure-network-time-and-date

  -  import_tasks: 04-disable-firewalld-and-selinux.yml
     tags:
     - role::sap-hana-preconfigure-shared
     - role::sap-hana-preconfigure-shared::disable-firewalld-and-selinux

  - import_tasks: 05-register-rhel.yml
    tags:
    - role::sap-hana-preconfigure-shared
    - role::sap-hana-preconfigure-shared::register-rhel

  - import_tasks: 06-required-packages.yml
    tags:
    - role::sap-hana-preconfigure-shared
    - role::sap-hana-preconfigure-shared::required-packages

  - import_tasks: 07-update-operating-system.yml
    tags:
    - role::sap-hana-preconfigure-shared
    - role::sap-hana-preconfigure-shared::update-operating-system

  - import_tasks: 08-sap-hana-filesystem.yml
    tags:
    - role::sap-hana-preconfigure-shared
    - role::sap-hana-preconfigure-shared::sap-hana-filesystem

  - import_tasks: 09-configuring-system-parameters.yml
    tags:
    - role::sap-hana-preconfigure-shared
    - role::sap-hana-preconfigure-shared::configuring-system-parameters

  - import_tasks: 10-pmem-config.yml
    when:  pmem == true
    tags:
    - role::sap-hana-preconfigure-shared
    - role::sap-hana-preconfigure-shared::pmem-config
```
