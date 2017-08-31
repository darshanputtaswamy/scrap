
# Project Title

startupchk

## Getting Started

startupchk is now hosted in  iscgrid10.idc.oracle.com.

  Directory : /home/oracle/Testbed/startupchk
  Username : oracle   Password : oracle
 
download the file startupchk.zip  and unzip this file (an unzipped folder already exist here)


 The directory structure of this framework

    .
    |-- README.md
    |-- src                                                <(= All the source file will be inside this directory
    |   |-- config                                         <(=   Folder Containing Configuration check script
    |   |   |-- 010f256633c8bcf7f4212d516b517391.sh
    |   |   |-- 7ca444a1f147034b602efebd86c53f14.sh
    |   |   `-- b1e0ac093941296e780f9c09fd5f175f.sh
    |   |-- disk                                           <(=   Folder Containing disk check  script
    |   |-- fs                                             <(=   Folder Containing Filesystem check  script
    |   |-- html                                           <(=   HTML Folder contains standard html head content
    |   |   |-- head.html
    |   |   `-- head.part.html
    |   |-- knownbugs                                      <(=   Folder Containing Known Bug Check  script
    |   |-- net                                            <(=   Folder Containing Network Related Check  script
    |   |   `-- 3eca033abdd1a2426fa0f636de8911f5.sh  
    |   |-- profile.dat                                    <(=   profile.dat  contains an index of all checks
    |   |-- test_node_reachability.sh                      <(=   any other scripts  used by plug-in
    |   `-- validate.pl                                    <(=   Validation perl script
    `-- startupchk                                         <(=   Mian Executable




### Prerequisites

  * bash 3.4 and above
  * Oracle Clusterware Stack


### Installing



1] cd startupchk
    chmod +x startupchk

2]   $ ./startupchk -help

    usage: startupchk options

    This script checks and validates various subsystem underlining you cluster environment.

    OPTIONS:
       -help                Show this message
       -debug                       Run startupchk in debug mode. Debug log will be generated.
       -config                      Run startupchk to check for posible startup failure due to cluster configuration.
       -disk                        Run startupchk to check for posible startup failure due to cluster Storage setup.          <<<< does not work
       -net                         Run startupchk to check for posible startup failure due to cluster Network setup.           <<<< does not work
       -knownbug                    Run startupchk to check for posible startup failure due to known Startup bugs.           <<<< does not work
       -fs                          Run startupchk to check for posible startup failure due to cluster filesystem setup.            <<<< does not work 
	   




## Running the startupcheck


    Without any argument its would run all existing plugin sub scripts , currently we have only 3 from config check

    $./startupchk                  

    -------------------------------------
    Validating the server environmnet

    Reading GI Home From  /etc/oratab
     File /u01/app/oraInventory exit and can be opened

    Grid Infrastructure seems to installed ..

    Central Inventory  is set to /u01/app/oraInventory/ContentsXML/inventory.xml

    Grid Infrastructure home is set to /u01/app/12.1.0/grid
    GI home directory exists ...

    Oracle Home :   /u01/app/12.1.0/grid
    Clusterware version :   "12.1.0.1.0"

     using /u01/app/12.1.0/grid/crs/install/crsconfig_params ...

    Oracle Base :  /u01/app/oracle
    Oracle Software Owner   :oracle                  Exists !!!
    Oracle DBA Group        :oinstall                Exists !!!
    Oracle ASM Group        :dba             Exists !!!

    List Of Nodes in Cluster :  host01,host02

    Clusternodes in Inventory matches crsconfig_params

    Using node from central inventory
    host01                   Reachable and Pinging !!!

    host02                   Reachable and Pinging !!!
    Clusterware Node Validation Passed !!!

    Performing Configuration Checks

    check CRS Autoconfig check                DISABLED
    check  if init  process as spawned  init.ohasd .               init.ohasd is Running.
    check Check OS runlevel .               REACHED .

    Output File is Written to {pwd}/startupchk_xxx_xxx.html

    Download  file {{pwd}}/startupchk_xxxx_xxxx.html to your local machine to check this report .


### And coding style tests


## Deployment

## Built With

* perl

## Contributing


## Versioning


## Authors


## License


## Acknowledgments



