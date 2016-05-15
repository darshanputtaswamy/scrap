#!/usr/bin/perl -w
use Switch;
use Term::ANSIColor;

sub validate(){

$OS=`/bin/uname | tr -d '\n' |tr -d '\r'`;
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
							}	else {
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
else  { print " $OS ERROR: Unknown Operating System"; exit (1);

				}   
				
				
    $ORA_HOME_TMP = `cat  $ORATAB |grep  "+ASM"|grep -v "^#"|cut -d: -f2 | tr -d '\n' | tr -d '\r'`;
    $ORA_CENINV_TMP = $ORAINV."/ContentsXML/inventory.xml";
	
	
    print "\n\n\nGrid Infrastructure seems to installed .. \n ";
	print "\nPlease set the GI Home [ $ORA_HOME_TMP  ]: ";
	
	chomp ($ORA_HOME_SET = <STDIN>);
	if  ( $ORA_HOME_SET eq '') 	{
	       $ORA_HOME_SET=$ORA_HOME_TMP;		   
		  } 
		   

   
  print "\nPlease set the Central inventory location [  $ORA_CENINV_TMP ]: " ;
   chomp ( $ORA_CENINV_SET = <STDIN>);
	if  (  $ORA_CENINV_SET eq '') 	{
	        $ORA_CENINV_SET= $ORA_CENINV_TMP;		   
		  } 
	
	
	
	
	
	if (-f $ORA_CENINV_SET ) {
	print "\nCentral Inventory  is set to $ORA_CENINV_SET \n "; 
	}	else{
	print "\n Central Inventory does not exists in $ORA_CENINV_SET .. exiting "; exit(1);
	}
   
	if (-d $ORA_HOME_SET ) {
	print "\nGrid Infrastructure home is set to $ORA_HOME_SET \n ";
	print "\nGI home directory exists ..." ; 
	}else{
	print "\nGI home directory does not exists .. exiting "; exit(1);
	}

	
   
    $GICONFIGPARAMSFILE=$ORA_HOME_SET."/crs/install/crsconfig_params";

	
	if ( -e $GICONFIGPARAMSFILE ){	
#	print "\n $GICONFIGPARAMSFILE config params exists ..." ; 
	} else {
	print "\n $GICONFIGPARAMSFILE config params does not exists or is not accessible  "; exit(1);
	}
	
	print "\n\n using $GICONFIGPARAMSFILE ...";


       
$PARAMSBASE=`cat $GICONFIGPARAMSFILE  | grep -o  'ORACLE_BASE=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\n\nOracle Base :  $PARAMSBASE ";

$PARAMSHOME=`cat $GICONFIGPARAMSFILE | grep -o  'ORACLE_HOME=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\nOracle Home :   $PARAMSHOME ";



#===================================================================================================================
$ORACLEOWNER=`cat $GICONFIGPARAMSFILE  | grep -o  'ORACLE_OWNER=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\n\nOracle Software Owner \t:$ORACLEOWNER ";

`id $ORACLEOWNER`;
if ($? == 0 ){
print color("green"),"\t\t Exists !!!",color("reset");
} else {
print color("red"),"\t\t Does not Exists !!!",color("reset");
}


#===================================================================================================================

$DBAGROUP=`cat $GICONFIGPARAMSFILE  | grep -o  'ORA_DBA_GROUP=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\n\nOracle DBA Group     \t:$DBAGROUP ";

`cat /etc/group | grep $DBAGROUP`;
if ($? == 0 ){
print color("green"),"\t\t Exists !!!",color("reset");
} else {
print color("red"),"\t\t Does not Exists !!!",color("reset");
}



#===================================================================================================================

$ASMGROUP=`cat $GICONFIGPARAMSFILE  | grep -o  'ORA_ASM_GROUP=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\n\nOracle ASM Group     \t:$ASMGROUP ";


`cat /etc/group| grep $ASMGROUP`;
if ($? == 0 ){
print color("green"),"\t\t Exists !!!",color("reset");
} else {
print color("red"),"\t\t Does not Exists !!!",color("reset");
}

#===================================================================================================================
$NODELIST= `cat $GICONFIGPARAMSFILE | grep -o  'NODELIST=.*' | cut -f2- -d '='|tr -d '\n' | tr -d '\r'`;
print "\n\nList Of Nodes in Cluster :  $NODELIST \n\n";


$empty=1;
$i=1;
`rm -f .nodelist `;
while ( $i == 1 || $empty == 1){
 $NODE=`cat /u01/app/12.1.0/grid/crs/install/crsconfig_params  |grep -o  'NODELIST=.*' | cut -f2- -d '=' | cut -d',' -f$i | tr -d '\n' | tr -d '\r'` ;
if (  $NODE eq '' ){  $empty=0; }
else    {  `echo $NODE >> .nodelist` }
$i=$i + 1;
}



`cat /u01/app/oraInventory/ContentsXML/inventory.xml | grep "NODE NAME" | sort | uniq | sed s/[\"\<\/\>]//g | cut -d= -f2 > .invnode`;
	
	
$diffresult = `diff .nodelist .invnode.txt`;


        if ( $? == 0 && $diffresult eq '' )
		
        { print "\nClusternodes in Inventory matches crsconfig_params " ;
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

print "\n-------------------------------------\n";
print "\nValidating the server environmnet  \n ";
validate();
