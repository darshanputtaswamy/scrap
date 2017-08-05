#!/bin/sh

/u01/app/12.1.0.2/grid/bin/srvctl add filesystem -d /dev/asm/datafsvol-316 -m /odadatafs -autostart ALWAYS
if [ $? = "0" -o $? = "2" ]; then
   /u01/app/12.1.0.2/grid/bin/srvctl start filesystem -d /dev/asm/datafsvol-316
   if [ $? = "0" ]; then
      chmod 775 /odadatafs
      /u01/app/12.1.0.2/grid/bin/srvctl status filesystem -d /dev/asm/datafsvol-316
      exit 0
   fi
   /u01/app/12.1.0.2/grid/bin/srvctl status filesystem -d /dev/asm/datafsvol-316
fi




