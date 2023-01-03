Configure SAP Hana
=====================

This role configures a Redhat Enterprise Linux System according to the SAP notes.


Usage
------------

We can configure SAP Hana systems on three different platforms.

 - If SAP Hana Systems will be located in a Vmware Environment;

    - The common variables of the systems to be installed are entered in the site-vmware.yml file. 
    - After the global variables are defined in the site-vmware.yml file, the variables of the hosts to be installed are filled in the vms-vmware.csv file under the host-vms-csv directory.
    - You can start the installation and configuration process of the servers using the following command and tags.
        - Ansible command is called with the following tag to read the host variables from the csv file and create the hosts files required for ansible to use. 

           ```yaml
            # ansible-playbook site-vmware.yml --tags role::host-variable-vmware
            ```
        - Ansible command is called with the following tag to  virtual machine is created with suitable for sap hana prerequests in vmware vsphere environment and operating system installation is made.

           ```yaml
            # ansible-playbook site-vmware.yml --tags role::vmware-guest-deployment
            ``` 

        - Ansible command is called with the following tag to make the operating system settings of Sap Hana installation on Redhat Enterprise Linux Operating System.

           ```yaml
            # ansible-playbook site-vmware.yml --tags role::sap-hana-preconfigure-vmware
            ```  

        - Ansible command is called with the following  to make the operating system security hardening on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-vmware.yml --tags role::sap-hana-security-hardening
            ```  
        
        - Ansible command is called with the following  to install SAP HANA DB  on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-vmware.yml --tags role::sap-hana-deploy
            ```  
        - Ansible command is called with the following to define SAP HANA DB Replication  on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-vmware.yml --tags role::sap-hana-replication
            ```
        - Ansible command is called with the following  to make integration  SAP HANA DB backint HPE Storeonce  on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-vmware.yml --tags role::sap-hana-storeonce-backup
            ``` 
        - Ansible command is called with the following  to MFA (Multifunction Authentication) is activated for logins with ssh protocol in Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-vmware.yml --tags role::sap-hana-mfa
            ``` 
 - If SAP hana systems will be located on local disks to the HPE Proliant Server;

    - The common variables of the systems to be installed are entered in the site-local-storage.yml file. 
    - After the global variables are defined in the site-local-storage.yml file, the variables of the hosts to be installed are filled in the vms-local-storage.csv file under the host-vms-csv directory.
    - You can start the installation and configuration process of the servers using the following command and tags.
        - Ansible command is called with the following tag to read the host variables from the csv file and create the hosts files required for ansible to use. 

           ```yaml
            # ansible-playbook site-local-storage.yml --tags role::host-variable-local
            ```
        - Ansible command is called with the following tag ,to configure the bios and raid cart required settings for HPE Proliant Servers. 

           ```yaml
            # ansible-playbook site-local-storage.yml --tags role::physical-server-preconfigure-local
            ``` 

        - Ansible command is called with the following to make the operating system settings of Sap Hana installation on Redhat Enterprise Linux Operating System.

           ```yaml
            # ansible-playbook site-local-storage.yml --tags role::sap-hana-preconfigure-local
            ```  

        - Ansible command is called with the following  to make the operating system security hardening on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-local-storage.yml --tags role::sap-hana-security-hardening
            ```  
        
        - Ansible command is called with the following to install SAP HANA DB  on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-local-storage.yml --tags role::sap-hana-deploy
            ```  
        - Ansible command is called with the following to define SAP HANA DB Replication  on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-local-storage.yml --tags role::sap-hana-replication
            ```
        - Ansible command is called with the following to make integration  SAP HANA DB backint HPE Storeonce  on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-local-storage.yml --tags role::sap-hana-storeonce-backup
            ``` 
        - Ansible command is called with the following to MFA (Multifunction Authentication) is activated for logins with ssh protocol in Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-local-storage.yml --tags role::sap-hana-mfa
            ``` 

        - Ansible command is called with the following to register HPE Proliant Server to the Oneview Server

           ```yaml
            # ansible-playbook site-local-storage.yml --tags role::oneview-config
            ``` 
 - If SAP hana systems will be located san connected storage to the HPE Proliant Server;

    - The common variables of the systems to be installed are entered in the site-local-storage.yml file. 
    - After the global variables are defined in the site-shared-storage.yml file, the variables of the hosts to be installed are filled in the vms-shared-storage.csv file under the host-vms-csv directory.
    - You can start the installation and configuration process of the servers using the following command and tags.
        - Ansible command is called with the following tag to read the host variables from the csv file and create the hosts files required for ansible to use. 

           ```yaml
            # ansible-playbook site-shared-storage.yml --tags role::host-variable-local
            ```
        - Ansible command is called with the following tag ,to configure the bios and raid cart required settings for HPE Proliant Servers. 

           ```yaml
            # ansible-playbook site-shared-storage.yml --tags role::physical-server-preconfigure-local
            ``` 

        - Ansible command is called with the following to make the operating system settings of Sap Hana installation on Redhat Enterprise Linux Operating System.

           ```yaml
            # ansible-playbook site-shared-storage.yml --tags role::sap-hana-preconfigure-local
            ```  

        - Ansible command is called with the following  to make the operating system security hardening on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-shared-storage.yml --tags role::sap-hana-security-hardening
            ```  
        
        - Ansible command is called with the following to install SAP HANA DB  on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-shared-storage.yml --tags role::sap-hana-deploy
            ```  
        - Ansible command is called with the following to define SAP HANA DB Replication  on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-shared-storage.yml --tags role::sap-hana-replication
            ```
        - Ansible command is called with the following to make integration  SAP HANA DB backint HPE Storeonce  on Redhat Enterprise Linux operating system.

           ```yaml
            # ansible-playbook site-shared-storage.yml --tags role::sap-hana-storeonce-backup
            ``` 
        - Ansible command is called with the following to MFA (Multifunction Authentication) is activated for logins with ssh protocol in Redhat Enterprise Linux Operating System.

           ```yaml
            # ansible-playbook site-shared-storage.yml --tags role::sap-hana-mfa
            ``` 

        - Ansible command is called with the following to register HPE Proliant Server to the Oneview Server

           ```yaml
            # ansible-playbook site-shared-storage.yml --tags role::oneview-config
            ```
### Deployment Roles

Role Tasks used for reading host variables from csv file and creating host files for virtual servers {{ role: host-variable-vmware  }}
```yaml
- Read variables from csv & host varibales 
  - 01-host-var.yml
- Create host Files
  - 02-hosts.yml
```
Role Tasks used for reading host variables from csv file and creating host files for  HPE Proliant Server {{ role: host-variable-local  }}
```yaml
- Read variables from csv & host varibales 
  - 01-host-var.yml
- Create host Files
  - 02-hosts.yml
```

Role Tasks used for reading host variables from csv file and creating host files for  HPE Proliant Server {{ role: host-variable-shared  }}
```yaml
- Read variables from csv & host varibales 
  - 01-host-var.yml
- Create host Files
  - 02-hosts.yml
```

Role Tasks used for virtual machine create with suitable for sap hana prerequests in vmware vsphere environment {{ role: vmware-guest-deployment }}
```yaml
- Copying operating system installation media to vmware environment 
  - 01-Copy-RHEL-ISO.yml
- Checking  the server to be installed is vmware environment
  - 02-query-virtual-guest.yml
- Creating a virtual server to the vmware environment
  - 03-guest-deployment.yml
- Configure virtual disks to the desired server
  - 04-add-disk-to-virtual-guest.yml
- Power On Virtual Server
  - 05-poweron-virtual-guest.yml
```

Role Tasks used for  configure HPE Proliant Server configured on local disks  {{ role: proliant-server-preconfigure-local  }}
```yaml
- Check Proliant Server power state, powered on server if needed
  - 01-power-state.yml
- Configure Raid Controller
  - 02-logical-drives.yml
- Configure Bios Settings
  - 03-bios-settings.yml
- Configure Persistent Memory 
  - 04-pmem-bios-settings.yml
- Mount & Boot Installation Media
  - 05-automate-server-install.yml
```

Role Tasks used for  configure HPE Proliant Server configured on shared disks {{ role: proliant-server-preconfigure-shared }}
```yaml
- Check Proliant Server power state, powered on server if needed
  - 01-power-state.yml
- Configure Raid Controller
  - 02-logical-drives.yml
- Configure Bios Settings
  - 03-bios-settings.yml
- Configure Persistent Memory 
  - 04-pmem-bios-settings.yml
- Mount & Boot Installation Media
  - 05-automate-server-install.yml
```

Role Tasks used for configure Operating System parameters to  virtual sap hana systems { role: sap-hana-preconfigure-vmware }}
```yaml
- Gethering host facts
  - setup
- Configure Hostname
  - 01-configure-hostname.yml
- Configure Login Messages
  - 02-configure-issue.yml
- Configure Network Time Protocol
  - 03-configure-network-time-and-date.yml
- Disable Firewalld & SELINUX
  - 04-disable-firewalld-and-selinux.yml
- Register Operating System to the access.redhat.com
  - 05-register-rhel.yml
- Install Required Packages
  - 06-required-packages.yml
- Update Operating System
  - 07-update-operating-system.yml
- Configure Logical Volumes and Mount Points
  - 08-sap-hana-filesystem.yml
- Apply Sap Hana Tuning Parameters
  - 09-configuring-system-parameters.yml
- Configure Persistent Memory Volumes and Mount Points
  - 10-pmem-config.yml
```

Role Tasks used for configure Operating System parameters to HPE Proliant Server configured on local disks { role: sap-hana-preconfigure-local }}
```yaml
- Gethering host facts
  - setup
- Configure Hostname
  - 01-configure-hostname.yml
- Configure Login Messages
  - 02-configure-issue.yml
- Configure Network Time Protocol
  - 03-configure-network-time-and-date.yml
- Disable Firewalld & SELINUX
  - 04-disable-firewalld-and-selinux.yml
- Register Operating System to the access.redhat.com
  - 05-register-rhel.yml
- Install Required Packages
  - 06-required-packages.yml
- Update Operating System
  - 07-update-operating-system.yml
- Configure Logical Volumes and Mount Points
  - 08-sap-hana-filesystem.yml
- Apply Sap Hana Tuning Parameters
  - 09-configuring-system-parameters.yml
- Configure Persistent Memory Volumes and Mount Points
  - 10-pmem-config.yml
```

Role Tasks used for configure Operating System parameters to HPE Proliant Server configured on shared disks { role: sap-hana-preconfigure-shared }}
```yaml
- Gethering host facts
  - setup
- Configure Hostname
  - 01-configure-hostname.yml
- Configure Login Messages
  - 02-configure-issue.yml
- Configure Network Time Protocol
  - 03-configure-network-time-and-date.yml
- Disable Firewalld & SELINUX
  - 04-disable-firewalld-and-selinux.yml
- Register Operating System to the access.redhat.com
  - 05-register-rhel.yml
- Install Required Packages
  - 06-required-packages.yml
- Update Operating System
  - 07-update-operating-system.yml
- Configure Logical Volumes and Mount Points
  - 08-sap-hana-filesystem.yml
- Apply Sap Hana Tuning Parameters
  - 09-configuring-system-parameters.yml
- Configure Persistent Memory Volumes and Mount Points
  - 10-pmem-config.yml
```

Role Tasks used for make security hardening Redhat Enterprise Linux Operating System { role: sap-hana-security-hardening }}
```yaml
- Gethering host facts
  - setup
- Install & Configure AIDE 
  - 01-install-configure-aide.yml
- Disable Automount
  - 02-disable-automount.yml
- Disable USB Mass Storage
  - 03-disable-usb-mass-storage.yml
- OpenSSH Client Security Settings 
  - 04-ssh-client-security.yml
- Configure mail forwarding for root user
  - 05-postfix-config.yml
- Disable Ctrl-Alt-Del
  - 06-disable-ctrl-alt-delete.yml
- Adjust Cronjob
  - 07-cronjobs-hardening.yml
- Restrict sudo for normal users
  - 08-restrict-sudo.yml
- OpenSSH Client Security Settings 
  - 09-login-definitions.yml
- Create Operator User
  - 10-create-operator-user.yml
- Setup password strengthening for User accounts according to corporate policies
  - 11-password-strength.yml
- Adjust sysctl variables to improve network security
  - 12-improve-network-security.yml
- Defining auditd.rules File to the client
  - 13-configure-audit-log.yml
- Forwarding Syslog Files to a Central Syslog Server
  - 14-rsyslog-config.yml
```

Role Tasks used for deploy Sap Hana Services { role: sap-hana-deploy }
```yaml
- Pre installation Process
  - 01-preparing-installation.yml
- SAP Hana Installation & Configuration
  - 02-hana-installation.yml
- Sap Hana Host Agent Installation
  - 03-host-agent-installation.yml
- Sap Hana PMEM Configuration
  - 04-hana-pmem-config.yml
- Sap Hana Service User Configuration
  - 05-hana-service-user.yml
```
Role Tasks used for Maintain Sap Hana System Replication { role: sap-hana-replication }
```yaml
- Prepare Master Server
  - 01-preparing-master-server.yml
- Prepare Slave Server
  - 02-preparing-slave-server.yml
- Perform System Replication
  - 03-perform-system-replication.yml
- Check System Replication Status
  - 04-system-replication-status.yml
```

Role Tasks used for Sap Hana Backint HPE StoreOnce Entegration { role: sap-hana-storeonce-backup }
```yaml
- Prepare & Configure HPE StoreOnce 
  - 01-catalyststore-config.yml
- Configure SAP Hana Backint  
  - 02-hana-backint-config.yml
```

Role Tasks used for  MFA (Multifunction Authentication) activation to  ssh protocol { role: sap-hana-mfa }
```yaml
- Configure MFA
  -  01-mfa.yml
```

Role Tasks used for register HPE Proliant Servers to the Oneview Server { role: oneview-config }
```yaml
- Authenticate HPE Oneview Server
  - 01-authenticate-oneview.yml
- Configure Network Time Protocol  
  - 02-time-config.yml
- Create Scope  
  - 03-create-scope.yml
- Add Server Hardware to the HPE Oneview Server 
  - 04-add-server-hardware.yml
- Check Registration Status  
  - 05-get-server-hardware.yml
- Configure email Notifications   
  - 06-email-notification.yml
```
