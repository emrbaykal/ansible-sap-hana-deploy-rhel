Role Name: saphana-replication
=========

```
This role  :
      - Configuring  primary server to following required configuration parameters
      - Configuring  slave server to following required configuration parameters
      - Perform system replication
      - Check replication status
```

Example Playbook
----------------

```yaml
---
  - include_tasks: 01-preparing-master-server.yml
    when: primary_server['hostname'] == ansible_hostname
    tags:
      - 'role::sap-hana-installation'

  - include_tasks: 02-preparing-slave-server.yml
    when: secondary_server['hostname'] == ansible_hostname
    tags:
      - 'role::sap-hana-installation'

  - include_tasks: 03-perform-system-replication.yml
    when: secondary_server['hostname'] == ansible_hostname
    tags:
      - 'role::sap-hana-installation'

  - include_tasks: 04-system-replication-status.yml
    when: primary_server['hostname'] == ansible_hostname
    tags:
      - 'role::sap-hana-installation'
```
