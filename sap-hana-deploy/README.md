Role Name: saphana-deploy
=========

```
This role  :
      - Prepare required mountpoints and create logical volumes
      - SAP Hana Installation
      - Maintain Sap Host Agent
```

Tasks
----------------

```yaml
---
  - name: Gathering facts
    setup:

  - import_tasks: 01-preparing-installation.yml
    tags:
      - role::sap-hana-deploy
      - role::sap-hana-deploy::preparing

  - import_tasks: 02-hana-installation.yml
    tags:
      - role::sap-hana-deploy
      - role::sap-hana-deploy::installation

  - import_tasks: 03-host-agent-installation.yml
    tags:
      - role::sap-hana-deploy
      - role::sap-hana-deploy::host-agent

```
