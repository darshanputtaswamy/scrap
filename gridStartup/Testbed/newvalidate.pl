#!/usr/bin/perl -w
use Switch;
use Term::ANSIColor;

sub validate(){

$OS=`/bin/uname | tr -d '\n' |tr -d '\r'`;



###########################################################################################
#  Get inventory and oratab location from the system 
#
###########################################################################################


#
#
#


if ( $OS eq 'Linux' ){



                                        $ORATAB="/etc/oratab" ;
                                        $ORAINV=` cat /etc/oraInst.loc | grep oraInventory | cut -d= -f2 | tr -d '\n' | tr -d '\r'`;
                                                unless (open(MYFILE,$ORATAB)) {
                                                        if (-e $ORATAB) {
                                                        print "File $ORATAB  exists, but cannot be opened.\n";;
                                                        } else {
                                                        print "File $ORATAB  does not exists  ";
                                                        }
                                                } else {
                             print "\nReading GI Home From  $ORATAB ";
                                                        }

                                                unless (open(MYFILE,$ORAINV)) {
                                                        if (-e $ORAINV) {
                                                        print "$ORAINV File orainventory exists, but cannot be opened.\n"; ;
                                                        } else {
                                                        print "$ORAINV File orainventory does not exists  "; ;
                                                        }
                                                } else {
                             print "\n File $ORAINV exit and can be opened";
                                                        }




                }
elsif ($OS eq  'SunOS'  ){

                                        $ORATAB="/var/opt/oracle/oratab" ;
                                        $ORAINV=` cat /var/opt/oracle/oraInst.loc | grep oraInventory | cut -d= -f2 | tr -d '\n' | tr -d '\r'`;
                                                unless (open(MYFILE,$ORATAB)) {
                                                        if (-e $ORATAB) {
                                                        print "File $ORATAB exists, but cannot be opened.\n";
                                                        }       else {
                                                        print "File $ORATAB  does not exists  ";
                                                        }

                                                } else {
                              print "\nReading GI Home From  $ORATAB ";
                                                        }


                                                unless (open(MYFILE,$ORAINV)) {
                                                        if (-e $ORAINV) {
                                                        print "$ORAINV File orainventory exists, but cannot be opened.\n";
                                                        } else {
                                                        print "$ORAINV File orainventory does not exists  ";
                                                        }
                                                } else {
                             print "\n File $ORAINV exit and can be opened";
                                                        }




                                }
elsif ( $OS eq 'HP-UX' )  {
                                        $ORATAB="/etc/oratab" ;
                                        $ORAINV=` cat /etc/oraInst.loc | grep oraInventory | cut -d= -f2 | tr -d '\n' | tr -d '\r'`;

                                        unless (open(MYFILE,$ORATAB)){
                                                        if (-e $ORATAB) {
                                                        print "File oratab exists, but cannot be opened.\n";
                                                        } else {
                                                        print "File $ORATAB  does not exists  ";
                                                        }
                                                } else {
                              print "\nReading GI Home From  $ORATAB ";
                                                }

                                                unless (open(MYFILE,$ORAINV)) {

                                                        if (-e $ORAINV) {
                                                        print "$ORAINV File orainventory exists, but cannot be opened.\n";
                                                        } else {
                                                        print "$ORAINV File orainventory does not exists  ";
                                                        }
                                                } else {
                             print "\n File $ORAINV exit and can be opened";
                                                        }


                                }
elsif ($OS eq  'AIX')  {

                                        $ORATAB="/etc/oratab" ;
                                        $ORAINV=` cat /etc/oraInst.loc | grep oraInventory | cut -d= -f2 | tr -d '\n' | tr -d '\r'`;

                                                unless (open(MYFILE,$ORATAB)) {
                                                        if (-e $ORATAB) {
                                                        print "File $ORATAB exists, but cannot be opened.\n";
                                                        } else {
                                                        print "File $ORATAB  does not exists  ";
                                                        }
                                                } else {
                              print "\nReading GI Home From  $ORATAB ";
                                                }



                                                unless (open(MYFILE,$ORAINV)) {
                                                        if (-e $ORAINV) {
                                                        print "$ORAINV File orainventory exists, but cannot be opened.\n"; exit (1);
                                                        } else {
                                                        print "$ORAINV File orainventory does not exists  "; exit (1);
                                                        }
                                                } else {
                             print "\n File $ORAINV exit and can be opened";
                                                        }



                                }
else  { print "$OS ERROR: Unknown Operating System"; exit (1);

                                }


    $ORA_HOME_TMP = `cat  $ORATAB |grep  "+ASM"|grep -v "^#"|cut -d: -f2 | tr -d '\n' | tr -d '\r'`;

	
    $ORA_CENINV_TMP = $ORAINV."/ContentsXML/inventory.xml";


    print "\n\n\nGrid Infrastructure seems to installed .. \n ";
#        print "\nPlease set the GI Home [ $ORA_HOME_TMP  ]: ";

 #       chomp ($ORA_HOME_SET = <STDIN>);
 #       if  ( $ORA_HOME_SET eq '')      {
               $ORA_HOME_SET=$ORA_HOME_TMP;
 #                 }



 # print "\nPlease set the Central inventory location [  $ORA_CENINV_TMP ]: " ;
 #  chomp ( $ORA_CENINV_SET = <STDIN>);
 #       if  (  $ORA_CENINV_SET eq '')   {
                $ORA_CENINV_SET= $ORA_CENINV_TMP;
 #                 }




        if (-f $ORA_CENINV_SET ) {
        print "\nCentral Inventory  is set to $ORA_CENINV_SET \n ";
        }       else{
        print "\n Central Inventory does not exists in $ORA_CENINV_SET .. exiting ";
        }

        if (-d $ORA_HOME_SET ) {
        print "\nGrid Infrastructure home is set to $ORA_HOME_SET \n ";
        print "\nGI home directory exists ..." ;
        }else{
        print "\nGI home directory does not exists .. exiting ";
        }



    $GICONFIGPARAMSFILE=$ORA_HOME_SET."/crs/install/crsconfig_params";


        if ( -e $GICONFIGPARAMSFILE ){
#       print "\n $GICONFIGPARAMSFILE config params exists ..." ;
        } else {
        print "\n $GICONFIGPARAMSFILE config params does not exists or is not accessible  "; 
        }

        print "\n\n using $GICONFIGPARAMSFILE ...";



$PARAMSBASE=`cat $GICONFIGPARAMSFILE  | grep -o  'ORACLE_BASE=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;

print "\n\nOracle Base :  $PARAMSBASE ";
`stat $PARAMSBASE`;
if ($? == 0){
`echo "V|ORACLE_BASE|$PARAMSBASE" >> $MASTERFIL `;
} else
{
`echo "I|ORACLE_BASE|$PARAMSBASE" >> $MASTERFIL`;
}



$PARAMSHOME=`cat $GICONFIGPARAMSFILE | grep -o  'ORACLE_HOME=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\nOracle Home :   $PARAMSHOME ";
`stat $PARAMSHOME`;
if ($? == 0)
{
`echo "V|ORACLE_HOME|$PARAMSHOME" >> $MASTERFIL `;
} else
{
`echo "I|ORACLE_HOME|$PARAMSHOME" >> $MASTERFIL `
}


$PARAMVERSION=`cat $PARAMSHOME/inventory/ContentsXML/comps.xml | grep 'COMP NAME="oracle.crs"' | awk '{print $3}' | cut -d= -f2`
print "\Clusterware version :   $PARAMVERSION ";
`echo "V|ORACLE_VERSION|$PARAMVERSION" >> $MASTERFIL `;



#===================================================================================================================
$ORACLEOWNER=`cat $GICONFIGPARAMSFILE  | grep -o  'ORACLE_OWNER=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;

print "\n\nOracle Software Owner \t:$ORACLEOWNER ";

`id $ORACLEOWNER`;
if ($? == 0 ){
print color("green"),"\t\t Exists !!!",color("reset");
`echo "V|ORACLEOWNER|$ORACLEOWNER" >> $MASTERFIL `;
} else {
print color("red"),"\t\t Does not Exists !!!",color("reset");
`echo "I|ORACLEOWNER|$ORACLEOWNER" >> $MASTERFIL `;
}


#===================================================================================================================

$DBAGROUP=`cat $GICONFIGPARAMSFILE  | grep -o  'ORA_DBA_GROUP=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\n\nOracle DBA Group     \t:$DBAGROUP ";

`cat /etc/group | grep $DBAGROUP`;
if ($? == 0 ){
print color("green"),"\t\t Exists !!!",color("reset");
`echo "V|DBAGROUP|$DBAGROUP" >> $MASTERFIL `;

} else {
print color("red"),"\t\t Does not Exists !!!",color("reset");
`echo "I|DBAGROUP|$DBAGROUP" >> $MASTERFIL `;

}



#===================================================================================================================

$ASMGROUP=`cat $GICONFIGPARAMSFILE  | grep -o  'ORA_ASM_GROUP=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\n\nOracle ASM Group     \t:$ASMGROUP ";


`cat /etc/group| grep $ASMGROUP`;
if ($? == 0 ){
print color("green"),"\t\t Exists !!!",color("reset");
`echo "V|ASMGROUP|$ASMGROUP" >> $MASTERFIL `;

} else {
print color("red"),"\t\t Does not Exists !!!",color("reset");
`echo "I|ASMGROUP|$ASMGROUP" >> $MASTERFIL `;

}


#===================================================================================================================
$NODELIST= `cat $GICONFIGPARAMSFILE | grep -o  'NODELIST=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\n\nList Of Nodes in Cluster :  $NODELIST \n\n";


$empty=1;
$i=1;
`rm -f .nodelist `;
while ( $i == 1 || $empty == 1){
 $NODE=`cat $GICONFIGPARAMSFILE  |grep -o  'NODELIST=.*' | cut -f2- -d '=' | cut -d',' -f$i | tr -d '\n' | tr -d '\r'` ;
if (  $NODE eq '' ){  $empty=0; }
else    {  `echo $NODE >> .nodelist`;$i=$i + 1;}
}



$exresult = `cat $ORA_CENINV_SET | grep "NODE NAME" | sort | uniq | sed 's/[\"\<\/\>]//g'  | cut -d= -f2 > .invnode.txt`;

#if ($? ==0)    {
#print "no issues ";
#} else {
#print "wrong in previous expression";
#}

$diffresult = `diff .nodelist .invnode.txt`;


        if ( $? == 0 && $diffresult eq '' )

        { print "Clusternodes in Inventory matches crsconfig_params \n\n" ;

        } else {

         print color("red"), "\nClusternodes in Inventory DO NOT matches crsconfig_params ",color("reset");
         print "\n Node List in Central Inventory" ;
         print "\n================================\n";

         open(DATA, "<.invnode.txt") or die "Couldn't open file file.txt, $!";
         while(<DATA>){
           print "$_";
          }

        print "\n Node List in crsconfig_params" ;
         print "\n================================\n";

         open(DATA, "<.nodelist") or die "Couldn't open file file.txt, $!";
         while(<DATA>){
           print "$_";
          }

      }

#===================================================================================================================
}

($HOSTLIST,$MASTERFIL) = @ARGV;
print  $HOSTLIST."\n";
print $MASTERFIL."\n";


print "\n-------------------------------------\n";
print "\nValidating the server environmnet  \n ";

validate();
