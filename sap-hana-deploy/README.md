Role Name: saphana-deploy
=========

**Installing Sap Hana Application.**


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

  Main Playbook
  ----------------

  ```yaml
  ---
    - name: Gathering facts
      setup:
      tags:
        - role::sap-hana-deploy
        - role::sap-hana-deploy::setup

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

    - import_tasks: 04-hana-pmem-config.yml
      when:  pmem == true
      tags:
        - role::sap-hana-deploy
        - role::sap-hana-deploy::hana-pmem-config

    - import_tasks: 05-hana-service-user.yml
      tags:
        - role::sap-hana-deploy
        - role::sap-hana-deploy::hana-service-user

  ```
