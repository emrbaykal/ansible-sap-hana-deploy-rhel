Install & Configure SAP Hana
=====================

This project automate install and configure a Redhat Enterprise Linux 8.x system according to the SAP notes. by using ansible.

Using the ansible roles of SAP Hana Systems, it can be installed on HPE Proliant Gen 10 servers, VMware Vsphere
and simplivity environment.

After the variable csv files are filled according to the infrastructure to be installed, the following streams are
called.

- If SAP Hana systems will be configured on local disks on HPE Proliant Gen 10 servers:

  - ansible-playbook site-local-storage.yml yaml file is being executed.
    Details of the relevant yaml file are explained in the **README/site-local-storage-README.md** file.

    When this role is run, the following steps will be applied briefly.

      - Create host variable files according to the data read from the csv file.
      - Configure following Proliant Server hardware components:
          - Apply best bios settings for sap hana application.
          - Configure Raid Configurations for Operating systems disk and sap hana disks.
          - Apply bios settings for pmem if pmem order is given.
          - Mount operating system installation media from ilo interface.
      - Necessary operating system settings are made in order to install SAP Hana:
          - Configure Operating system hostname.
          - Configure ssh login banner.
          - Configure operating system network time protocol (NTP).
          - Apply brtfs snapshot Parameters.
          - Register operating system to the Redhat customer center & Satellite Server.
          - Apply latest operating system upgrates.
          - Confige Hana disks and mount points.
          - Operating system settings required for SAP Hanna are made (tuneadm and kernel parameters).
          - Necessary operating system and host settings are made to activate pmem.
      - Apply operating system security hardening settings.
      - Installing Sap Hana Application.
      - Build Sap Hana Database system replication.
      - Proliant servers are registered on the oneview application.

- If SAP Hana systems will be configured on SAN Storage on HPE Proliant Gen 10 servers:

  - ansible-playbook site-shared-storage.yml yaml file is being executed.
    Details of the relevant yaml file are explained in the **README/site-shared-storage-README.md** file.

    When this role is run, the following steps will be applied briefly.

      - Create host variable files according to the data read from the csv file.
      - Configure following Proliant Server hardware components:
          - Apply best bios settings for sap hana application.
          - Configure Raid Configurations for Operating systems disk and sap hana disks.
          - Apply bios settings for pmem if pmem order is given.
          - Mount operating system installation media from ilo interface.
      - Necessary operating system settings are made in order to install SAP Hana:
          - Configure Operating system hostname.
          - Configure ssh login banner.
          - Configure operating system network time protocol (NTP).
          - Apply brtfs snapshot Parameters.
          - Register operating system to the Redhat customer center & Satellite Server.
          - Apply latest operating system upgrates.
          - Confige Hana disks and mount points.
          - Operating system settings required for SAP Hanna are made (tuneadm and kernel parameters).
          - Necessary operating system and host settings are made to activate pmem.
      - Apply operating system security hardening settings.
      - Installing Sap Hana Application.
      - Build Sap Hana Database system replication.
      - Proliant servers are registered on the oneview application.

- If SAP Hana systems will be configured on VMware Vsphere or Simplivity Hyper Converged
  Environment:

  - ansible-playbook site-vmware.yml yaml file is being executed.
    Details of the relevant yaml file are explained in the **README/site-vmware-README.md** file.

    When this role is run, the following steps will be applied briefly.

      - Create host variable files according to the data read from the csv file.
      - Configure and Deploy Vmware Virtual Guests :
          - The operating system instalation iso file copy on to vmware datastore.
          - Virtual guests are created on the vmware virtualization environment according to the SAP notes
          - Virtual disks where the hana database is located are defined in the virtual guests.
          - Virtual guests are powered on.
      - Necessary operating system settings are made in order to install SAP Hana:
          - Configure Operating system hostname.
          - Configure ssh login banner.
          - Configure operating system network time protocol (NTP).
          - Apply brtfs snapshot Parameters.
          - Register operating system to the Redhat customer center & Satellite Server.
          - Apply latest operating system upgrates.
          - Confige Hana disks and mount points.
          - Operating system settings required for SAP Hanna are made (tuneadm and kernel parameters).
          - Necessary operating system and host settings are made to activate pmem.
      - Apply operating system security hardening settings.
      - Installing Sap Hana Application.
      - Build Sap Hana Database system replication.
      - Proliant servers are registered on the oneview application.


Requirements
------------

- The sapdeploy.ova SAP Deployment virtual appliance should be downloaded our FTP site and installed on a vmware or
  oracle virtual box environment.

   - sapdeploy.ova configured on Ubuntu Server 18.04 LTS operating system.
   - The following components are installed on Ubuntu Server 18.04 LTS operating system.
      - Ansible Version = 2.9.20
      - Python Version = 2.7.17
      - The Apache2 Web Server to use serve operating system installation media.

- Following TCP ports should be accessible to the SAP Deployment Appliance to HPE ILO Interface and sap hana servers.

    - SAP Deployment Appliance to HPE ILO Interface:
       - TCP 22 , TCP 80 , TCP 443
    - HPE ILO Interface to SAP Deployment Appliance:
       - TCP 80
    - SAP Deployment Appliance to SAP Hana Server:
       - TCP 22

- Custom installation environment for Redhat Enterprise Linux 8.X must be download from our FTP site and then
  upload to the "/home/hpe/ansible/ansible-sap-hana-deploy/setup/html/media" directory in to the SAP Deployment Appliance.

   - Redhat Enterprise Linux 8.X Custom CD is an installation media customized using RHEL auto installation processes.
   - You can see the kiskstart.ks file containing the installation steps RHEL directory.  

- Following SAP HANA packages should be download SAP web page and then should be uploeded to the
  "/home/hpe/ansible/ansible-sap-hana-deploy/setup/html/media" directory in the SAP Deployment Appliance.  

    - Required SAP Hana packages:
       -  Server: IMDB_SERVER20_xxxx.SAR
       -  client: IMDB_CLIENT20_xxxxx.SAR
       -  sapcar: SAPCAR_xxxx.EXE
       -  hostagent: saphostagentrpm_xxxx.rpm
