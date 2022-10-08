Role Name: sap-hana-security-hardening
=========

**Apply operating system security hardening settings.**

This role import following yaml files:

- Import 01-os-security-hardening.yml
  - Security hardening approved by SAP is applied to the operating system.
  - You can see the security hardening settings in the security-hardening excel file under the read-me directory.

  Main Playbook
  ----------------

  ```yaml
  ---
    - name: Gathering facts
      setup:
      tags:
        - role::sap-hana-security-hardening
        - role::sap-hana-security-hardening::setup

    - import_tasks: 01-os-security-hardening.yml
      tags:
        - role::sap-hana-security-hardening
        - role::sap-hana-security-hardening::os-security-hardening

  ```
