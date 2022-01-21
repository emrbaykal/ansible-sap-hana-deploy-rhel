Role Name: physical-server-preconfigure-shared
=========

**When this role is called, hardware settings are made in accordance with the SAP Hana application.**


 **_# ansible-palybook site-shared-storage.yml --tags role::physical-server-preconfigure-shared_**

 This role import following yaml files:

 - Import 01-power-state.yml
   - Powered on Proliant Server via using ilo interface.
 - Import 02-logical-drives.yml
   - Configure Raid Configurations for Operating systems disk.
 - Import 03-bios-settings.yml
   - Apply best bios settings for sap hana application.
 - Import 04-pmem-bios-settings.yml
   - Apply bios settings for pmem if pmem order is given.
 - Import 05-automate-server-install.yml
   - Mount operating system installation media from ilo interface.

   Main Playbook
   ----------------

```yaml
---
  # tasks file for physical-server-preconfigure

  - import_tasks: 01-power-state.yml
    tags:
      - role::physical-server-preconfigure-shared
      - role::physical-server-preconfigure-shared::power-state

  - import_tasks: 02-logical-drives.yml
    tags:
      - role::physical-server-preconfigure-shared
      - role::physical-server-preconfigure-shared::logical-drives

  - import_tasks: 03-bios-settings.yml
    tags:
      - role::physical-server-preconfigure-shared
      - role::physical-server-preconfigure-shared::bios-settings

  - import_tasks: 04-pmem-bios-settings.yml
    when:  pmem == true
    tags:
      - role::physical-server-preconfigure-shared
      - role::physical-server-preconfigure-shared::pmem-bios-settings

  - import_tasks: 05-automate-server-install.yml
    when:  automate_install == true
    tags:
      - role::physical-server-preconfigure-shared
      - role::physical-server-preconfigure-shared::automate-server-install
```
