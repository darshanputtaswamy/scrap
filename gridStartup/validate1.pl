#!/usr/bin/perl -w
use Switch;
use Term::ANSIColor;

sub test_node_reachability ()
{
  #Calling Format: test_node_reachability ["hostname"]  
  $nodenames=@_;
  
  $el_node_ping=0;
  $platform=`uname -s`;
  $tnr_note="";

  $PING_W_FLAG="";
  if ( $platform eq "Linux" ){
    $PING="/bin/ping";
    $PING_W_FLAG="-w 5";
  } else{
    $PING="/usr/sbin/ping";
  }

 #First Validation: Pingable or not
 #-------------------------------------------------------
 
 
 foreach $node (@nodenames){
  $el_node_ping=0;
  if ( $platform eq "SunOS" ){
      `$PING -s $node 5 5 >/dev/null 2>&1`;
  } else if ( $platform eq "HP-UX" {
      `$PING $node -n 5 -m 5 >/dev/null 2>&1`;
  }else{
      `$PING -c 1 $PING_W_FLAG $node >/dev/null 2>&1`;
  }
  
  if ( $? -eq "0" ){
    $el_node_ping=1; 
	
  }else{
    $tnr_log=`$PING -c 1 $PING_W_FLAG $node 2>&1 | tr -d '\r'`;
    $tnr_log=`echo -e "$tnr_log \n $host_type $node is not reachable so its being skipped from checking best practicing."`;
    $tnr_note="Node is not reachable";
	
	if ( -e $PINGLOGFIL ) `echo "$tnr_log" >> $PINGLOGFIL` ; 
	print "$tnr_log";
	
	}
	
	
	
	
}

}

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



$PARAMSHOME=$ORA_HOME_SET;

print "\nOracle Home :   $PARAMSHOME ";
`stat $PARAMSHOME`;
if ($? == 0){
`echo "V|ORACLE_HOME|$PARAMSHOME" >> $MASTERFIL `;
$PARAMVERSION=`cat $PARAMSHOME/inventory/ContentsXML/comps.xml | grep 'COMP NAME="oracle.crs"' | cut -d' ' -f3 | cut -d= -f2|tr -d '\n' | tr -d '\r'`;
print "\nClusterware version :   $PARAMVERSION ";
`echo "V|ORACLE_VERSION|$PARAMVERSION" >> $MASTERFIL `;
} else{
`echo "I|ORACLE_HOME|$PARAMSHOME" >> $MASTERFIL `
}



$GICONFIGPARAMSFILE=$ORA_HOME_SET."/crs/install/crsconfig_params";


if ( -e $GICONFIGPARAMSFILE ){
#       print "\n $GICONFIGPARAMSFILE config params exists ..." ;
`echo "V|ORACLE_CRSCONFIGPARAMS|$GICONFIGPARAMSFILE" >> $MASTERFIL `;
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
`rm -f $INPUTDIR/confignodelist `;
while ( $i == 1 || $empty == 1){
 $NODE=`cat $GICONFIGPARAMSFILE  |grep -o  'NODELIST=.*' | cut -f2- -d '=' | cut -d',' -f$i | tr -d '\n' | tr -d '\r'` ;
if (  $NODE eq '' ){  $empty=0; }
else    {  `echo $NODE >> $INPUTDIR/confignodelist`;$i=$i + 1;}
}



$exresult = `cat $ORA_CENINV_SET | grep "NODE NAME" | sort | uniq | sed 's/[\"\<\/\>]//g'  | cut -d= -f2 > $INPUTDIR/invnodelist`;

#if ($? ==0)    {
#print "no issues ";
#} else {
#print "wrong in previous expression";
#}

$diffresult = `diff $INPUTDIR/confignodelist $INPUTDIR/invnodelist`;


  if ( $? == 0 && $diffresult eq '' ) {
		print "Clusternodes in Inventory matches crsconfig_params \n\n" ;

        } 
		
  else {
         print color("red"), "\nClusternodes in Inventory DO NOT matches crsconfig_params ",color("reset");
         print "\n Node List in Central Inventory" ;
         print "\n================================\n";
         open(DATA, "<$INPUTDIR/.invnode.txt") or die "Couldn't open file file.txt, $!";
			 while(<DATA>){
			   print "$_";
			}

        print "\n Node List in crsconfig_params" ;
        print "\n================================\n"
        open(DATA, "<$INPUTDIR/.nodelist") or die "Couldn't open file file.txt, $!";
			 while(<DATA>){
			   print "$_";
			 }		  
   }
   
     $localhost=`hostname|cut -d"." -f1`  ; 

    open (FILE1, "<$INPUTDIR/.invnode.txt") || die $!;
    my @nodes = (<FILE1>);  #each line of the file into an array
    close FILE1 || die $!;
   
    test_node_reachability (@nodes);
     
	 `cat .invnode.txt | grep -v $localhost >> $HOSTLIST`;
	    print "Using node from central inventory ";
		
		
		
		
			  
#===================================================================================================================
}

($OUTPUTDIR $INPUTDIR) = @ARGV;
$MASTERFIL=$INPUTDIR."/raccheck_env.out";
$HOSTLIST=$INPUTDIR."/o_host_list.out";
$PINGLOGFIL=$OUTPUTDIR."/log/pingtest.log"

print $HOSTLIST."\n";
print $MASTERFIL."\n";


print "\n-------------------------------------\n";
print "\nValidating the server environmnet  \n ";

validate();

