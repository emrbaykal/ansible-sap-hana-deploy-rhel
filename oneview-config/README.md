Role Name: oneview-config
=========

**Proliant servers are registered on the oneview application.**

This role import following yaml files:

- Import 01-authenticate-oneview.yml
  - Made authentication to OneView Software.
- Import 02-time-config.yml
  - Time settings of the OneView software are being made..
- Import 03-create-scope.yml
  - Server scope definition is made on the oneview software where sap hana servers will be located..
- Import 04-add-server-hardware.yml
  - Reporting the health of hana system replication.
- Import 05-get-server-hardware.yml
  - Proliant Servers made registration to oneview software.
- Import 06-email-notification.yml
  - Making the necessary mail settings to be transmitted over onview software  in case of hardware malfunctions.

  Main Playbook
  ----------------

  ```yaml
  ---
    - import_tasks: 01-authenticate-oneview.yml
      run_once: True
      tags:
        - role::oneview-config
        - role::oneview-config::authenticate

    - import_tasks: 02-time-config.yml
      run_once: True
      tags:
        - role::oneview-config
        - role::oneview-config::time-config

    - import_tasks: 03-create-scope.yml
      run_once: True
      tags:
        - role::oneview-config
        - role::oneview-config::create-scope

    - import_tasks: 04-add-server-hardware.yml
      tags:
        - role::oneview-config
        - role::oneview-config::add-server-hardware

    - import_tasks: 05-get-server-hardware.yml
      run_once: True
      tags:
        - role::oneview-config
        - role::oneview-config::get-server-hardware

    - import_tasks: 06-email-notification.yml
      run_once: True
      tags:
        - role::oneview-config
        - role::oneview-config::email-notification

  ```
