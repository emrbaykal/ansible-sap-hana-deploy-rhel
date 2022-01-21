Role Name: host-variable-shared
=========

**When this role is called, create host variable files according to the data read from the csv file.**



 This role import following yaml files:

 - Import 01-host-var.yml
    - It creates host variable files according to the data read from the csv file for each host to be deployed.
 - Import 02-hosts.yml
    - It's implementing ansible hosts files according to the data read from the csv file for each host to be deployed.


    Main Playbook
    ----------------

    ```yaml
    # tasks file for host-variable-local

      - import_tasks: 01-host-var.yml
        tags:
          - role::host-variable-shared
          - role::host-variable-shared::host-var

      - import_tasks: 02-hosts.yml
        tags:
          - role::host-variable-shared
          - role::host-variable-shared::hosts

    ```
