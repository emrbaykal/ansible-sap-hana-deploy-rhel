Role Name: sap-hana-preconfigure-local
=========

**Necessary operating system settings are made in order to install SAP Hana**

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
    - name: Gathering facts
      setup:
      tags:
        - role::sap-hana-preconfigure-local
        - role::sap-hana-preconfigure-local::setup

    - import_tasks: 01-configure-hostname.yml
      tags:
        - role::sap-hana-preconfigure-local
        - role::sap-hana-preconfigure-local::hostname

    - import_tasks: 02-configure-issue.yml
      tags:
        - role::sap-hana-preconfigure-local
        - role::sap-hana-preconfigure-local::issue

    - import_tasks: 03-configure-network-time-and-date.yml
      tags:
      - role::sap-hana-preconfigure-local
      - role::sap-hana-preconfigure-local::configure-network-time-and-date

    -  import_tasks: 04-disable-firewalld-and-selinux.yml
       tags:
       - role::sap-hana-preconfigure-local
       - role::sap-hana-preconfigure-local::disable-firewalld-and-selinux

    - import_tasks: 05-register-rhel.yml
      tags:
      - role::sap-hana-preconfigure-local
      - role::sap-hana-preconfigure-local::register-rhel

    - import_tasks: 06-required-packages.yml
      tags:
      - role::sap-hana-preconfigure-local
      - role::sap-hana-preconfigure-local::required-packages

    - import_tasks: 07-update-operating-system.yml
      tags:
      - role::sap-hana-preconfigure-local
      - role::sap-hana-preconfigure-local::update-operating-system

    - import_tasks: 08-sap-hana-filesystem.yml
      tags:
      - role::sap-hana-preconfigure-local
      - role::sap-hana-preconfigure-local::sap-hana-filesystem

    - import_tasks: 09-configuring-system-parameters.yml
      tags:
      - role::sap-hana-preconfigure-local
      - role::sap-hana-preconfigure-local::configuring-system-parameters

    - import_tasks: 10-pmem-config.yml
      when:  pmem == true
      tags:
      - role::sap-hana-preconfigure-local
      - role::sap-hana-preconfigure-local::pmem-config

  ```
