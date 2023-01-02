Role Name: saphana-replication
=========

```
This role  :
      - Check Proliant Server power state, powered on server if needed
      - Configure Raid Controller
      - Configure Bios Settings
```

Example Playbook
----------------

```yaml
---
  - import_tasks: 01-power-state.yml
    tags:
      - role::physical-server-preconfigure
      - role::physical-server-preconfigure::power-state

  - import_tasks: 02-logical-drives.yml
    tags:
      - role::physical-server-preconfigure
      - role::physical-server-preconfigure::logical-drives

  - import_tasks: 03-bios-settings.yml
    tags:
      - role::physical-server-preconfigure
      - role::physical-server-preconfigure::bios-settings
```
