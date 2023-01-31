#
# Configuration parameters
#
database=file:/var/lib/aide/aide.db
database_out=file:/var/lib/aide/aide.db.new
verbose=2
report_url=stdout
warn_dead_symlinks=yes

#
# Custom rules
#
Binlib          = p+i+n+u+g+s+b+m+c+sha256+sha512
ConfFiles       = p+i+n+u+g+s+b+m+c+sha256+sha512
Logs            = p+i+n+u+g+S
Devices         = p+i+n+u+g+s+b+c+sha256+sha512
Databases       = p+n+u+g
StaticDir       = p+i+n+u+g
ManPages        = p+i+n+u+g+s+b+m+c+sha256+sha512

#
# Directories and files
#
# Kernel, system map, etc.
/boot                                   Binlib

#Exclude Other SAP Hana Systems Files
!/usr/sap

# SAP Hana Systems Configuration Files
/hana/shared/.*/global/hdb/custom/config/.*.ini$        R+p+i+n+u+g+s+b+m+c+sha256+sha512


# watch config files, but exclude, what changes at boot time, ...
/etc                                    ConfFiles

# Binaries
/bin                                    Binlib
/sbin                                   Binlib

# Libraries
/lib                                    Binlib

# Complete /usr and /opt
/usr                                    Binlib
/opt                                    Binlib

# Log files
/var/log$                               StaticDir
#/var/log/aide/aide.log(.[0-9])?(.gz)?  Databases
#/var/log/aide/error.log(.[0-9])?(.gz)? Databases
#/var/log/setuid.changes(.[0-9])?(.gz)? Databases
#/var/log                               Logs

# Devices
!/dev/pts
/dev                                    Devices

# Other miscellaneous files
/var/run$                               StaticDir
!/var/run
/var/lib                                Databases
!/var/lib/aide


# Test only the directory when dealing with /proc
/proc$                                  StaticDir
!/proc

# manpages can be trojaned, especially depending on *roff implementation
#/usr/man                               ManPages
#/usr/share/man                         ManPages
#/usr/local/man                         ManPages

# check sources for modifications
#/usr/src                               L
#/usr/local/src                         L

# Check headers for same
#/usr/include                           L
#/usr/local/include                     L

