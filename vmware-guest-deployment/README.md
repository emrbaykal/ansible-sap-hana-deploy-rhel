Role Name: vmware-guest-Deployment
=========

**When this role is called, Vmware Guest settings are made in accordance with the SAP Hana application.**


 This role import following yaml files:

 - Import 01-Copy-SUSE-ISO.yml
   - Copying operating system installation file to the vmware datastore.
 - Import 02-guest-deployment.yml
   - Virtual server deployment is being performed.
 - Improt 03-add-disk-to-virtual-guest.yml
   - Hana database disks are assigned to the deployed virtual server.
 - Import 04-poweron-virtual-guest.yml
   - Virtual guests are powered on.

   Main Playbook
   ----------------

```yaml
  ---
  # tasks file for vmware-guest-deployment

   - import_tasks: 01-Copy-SUSE-ISO.yml
     tags:
        - role::vmware-guest-deployment
        - role::mware-guest-deployment::Copy-SUSE-ISO

   - import_tasks: 02-guest-deployment.yml
     tags:
        - role::vmware-guest-deployment
        - role::mware-guest-deployment::guest-deploy

   - import_tasks: 03-add-disk-to-virtual-guest.yml
     tags:
        - role::vmware-guest-deployment
        - role::mware-guest-deployment::add-disk

   - import_tasks: 04-poweron-virtual-guest.yml
     tags:
        - role::vmware-guest-deployment
        - role::mware-guest-deployment::poweron-virtual-guest
```
