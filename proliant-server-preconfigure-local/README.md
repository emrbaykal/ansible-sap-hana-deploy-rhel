Role Name: physical-server-preconfigure-local
=========

**Hardware settings are made in accordance with the SAP Hana application.**

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

  Main Playbook
  ----------------

  ```yaml
  ---
    - import_tasks: 01-power-state.yml
      tags:
        - role::physical-server-preconfigure-local
        - role::physical-server-preconfigure-local::power-state

    - import_tasks: 02-logical-drives.yml
      tags:
        - role::physical-server-preconfigure-local
        - role::physical-server-preconfigure-local::logical-drives

    - import_tasks: 03-bios-settings.yml
      tags:
        - role::physical-server-preconfigure-local
        - role::physical-server-preconfigure-local::bios-settings

    - import_tasks: 04-pmem-bios-settings.yml
      when:  pmem == true
      tags:
        - role::physical-server-preconfigure-local
        - role::physical-server-preconfigure-local::pmem-bios-settings

    - import_tasks: 05-automate-server-install.yml
      when:  automate_install == true
      tags:
        - role::physical-server-preconfigure-local
        - role::physical-server-preconfigure-local::automate-server-install

  ```
