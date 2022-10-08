Role Name: saphana-replication
=========

**Build Sap Hana Database system replication**

This role import following yaml files:

- Import 01-preparing-master-server.yml
  - Making necessary settings on the master server to install hana system replication.
- Import 02-preparing-slave-server.yml
  - Making necessary settings on the slave server to install hana system replication..
- Import 03-perform-system-replication.yml
  - Perform Hana System Replication.
- Import 04-system-replication-status.yml
  - Reporting the health of hana system replication.

  Main Playbook
  ----------------

  ```yaml
  ---
    - name: Gathering facts
      setup:
      tags:
        - role::sap-hana-replication
        - role::sap-hana-replication::setup

    - import_tasks: 01-preparing-master-server.yml
      when:
        - primary_server['hostname'] == ansible_hostname
      tags:
        - role::sap-hana-replication
        - role::sap-hana-replication::preparing-master

    - import_tasks: 02-preparing-slave-server.yml
      when:
        - secondary_server['hostname'] == ansible_hostname
      tags:
        - role::sap-hana-replication
        - role::sap-hana-replication::preparing-slave-server

    - import_tasks: 03-perform-system-replication.yml
      when:
        - secondary_server['hostname'] == ansible_hostname
      tags:
        - role::sap-hana-replication
        - role::sap-hana-replication::perform-system-replication

    - import_tasks: 04-system-replication-status.yml
      when:
        - primary_server['hostname'] == ansible_hostname
      tags:
        - role::sap-hana-replication
        - role::sap-hana-replication::system-replication-status

  ```
