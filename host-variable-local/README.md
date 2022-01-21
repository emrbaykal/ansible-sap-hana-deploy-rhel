Role Name: host-variable-local
=========

**Create host variable files according to the data read from the csv file.**

This role import following yaml files:

- Import 01-host-var.yml
   - It creates host variable files according to the data read from the csv file for each host to be deployed.
- Import 02-hosts.yml
   - It's implementing ansible hosts files according to the data read from the csv file for each host to be deployed.

   Main Playbook
   ----------------

   ```yaml
   ---
     - import_tasks: 01-host-var.yml
       tags:
         - role::host-variable-local
         - role::host-variable-local::host-var

     - import_tasks: 02-hosts.yml
       tags:
         - role::host-variable-local
         - role::host-variable-local::hosts

   ```
