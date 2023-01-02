Role Name: sap-preconfigure
=========

```
This role  :
      - Configure hostname
      - Configure Login Messages
      - Configure time synchronization Parameters
      - Configure OS Disk Snapshot Policies
      - Register servers to the Suse Enterprise Customer Center
      - Upgrade operating system, apply latest security and bugfix patches
      - Prepare required mountpoints
      - Configure sap hana tuning parameters
```

Example Playbook
----------------

```yaml
---
  - name: Gathering facts
    setup:

  - import_tasks: 01-configure-hostname.yml
    tags:
      - role::sap-hana-preconfigure
      - role::sap-hana-preconfigure::hostname

  - import_tasks: 02-configure-issue.yml
    tags:
      - role::sap-hana-preconfigure
      - role::sap-hana-preconfigure::issue

  - import_tasks: 03-configure-network-time-and-date.yml
    tags:
    - role::sap-hana-preconfigure
    - role::sap-hana-preconfigure::date-time

  -  import_tasks: 04-tune-snapshot-parameters.yml
     tags:
     - role::sap-hana-preconfigure
     - role::sap-hana-preconfigure::snapshot

  - import_tasks: 05-register-suse.yml
    tags:
    - role::sap-hana-preconfigure
    - role::sap-hana-preconfigure::register-suse

  - import_tasks: 06-update-operating-system.yml
    tags:
    - role::sap-hana-preconfigure
    - role::sap-hana-preconfigure:update-os

  - import_tasks: 07-sap-hana-filesystem.yml
    tags:
    - role::sap-hana-preconfigure
    - role::sap-hana-preconfigure::filesystem

  - import_tasks: 08-configuring-system-parameters.yml
    tags:
    - role::sap-hana-preconfigure
    - role::sap-hana-preconfigure::system-parameters

```
