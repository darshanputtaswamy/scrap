#!/usr/bin/perl -w
use Fcntl;
use Tie::File;


unless ( $logBase = $ENV{'ORACLE_HOME'} ){
        die  ("Please set the ORACLE_HOME to and ORACLE_BASE .\n");
}
unless ( $logBase =~ /grid/ ){
        die ("Oracle home is not grid home");
}

$logBase = $logBase."/log/".$ENV{'HOSTNAME'} ;




sub configurationCheck(){

$d =1;

#@CAUSE : 1
#@
#@  CRS AUTOSTART ENABLED CHECK
#@  Checking if the ohasdtr  file exists

    print "CAUSE : 1 \n crs autostart enable check\n";


	
	unless (open(MYFILE, "/etc/oracle/scls_scr/$ENV{'HOSTNAME'}/root/ohasdstr")) {
				
				
				if (-e "/etc/oracle/scls_scr/$ENV{'HOSTNAME'}/root/ohasdstr") {
				 print "File ohasdstr exists, but cannot be opened.\n";
				
				} else {
				
				 print "File ohasdstr does not exist.\n";
				}
	
	   } else {
	
	
			if ($d == 1){
			
			print "grep enable /etc/oracle/scls_scr/$ENV{'HOSTNAME'}/root/ohasdstr\n";
			
			}

			$result_grep =  `grep enable /etc/oracle/scls_scr/$ENV{'HOSTNAME'}/root/ohasdstr`;

					if ( $? == 0 ){
					
					  print " autostart is enabled \n";
					  print "$result_grep \n";
					  print " CRS Autostart enabled  ..........\n";
					  
					}
					else{
						
						  print "$result_grep \n";
						  print " CRS Autostart NOT enabled ............\n";
						  
						}

		}
        


#@CAUSE : 2
#@   
#@   CHECK FOR SPAWNED init.ohasd
#@   

	print "CHECK FOR SPAWNED init.ohasd  .........\n";

	$result_grep = `ps -ef | grep init.ohasd | grep -v grep`;

			if ( $? == 0 )
			{
			  print " init.ohasd is SPAWNED  \n";
			}
			else 
			{
			  print " init.ohasd is not spawned ............\n";

			}


#@CAUSE : 3
#@   
#@   CHECK FOR  inittab entries
#@   



# Checking if the inittab file exists 

	unless (open(MYFILE, "/etc/inittab")) {
				
				
				if (-e "/etc/inittab") {
				 print "File inittab exists, but cannot be opened.\n";
				
				} else {
				 print "File inittab does not exist.\n";
				}
	
	
 	}  else {


				print " Checking contents of inittab file .........\n";
				$result_grep = `grep "h1:35:respawn:/etc/init.d/init.ohasd run >/dev/null 2>&1 </dev/null" /etc/inittab`;

						if ( $? == 0 )
						{
						  print " Inittab file seems to be fine \n";
						}
						else 
						{
						  print " Reporting Problem in inittab file ............\n";
						  print " Add the line h1:35:respawn:/etc/init.d/init.ohasd run >/dev/null 2>&1 </dev/null in to inittab\n";
						  exit;
						}

		}
		


#@CAUSE : 4
#@   
#@   runlevel 3|5 has mot reached due to suck rc* scripts
#@


	print "CHECK FOR SPAWNED init.ohasd  .........\n";

	$result_grep = `ps -ef | grep /etc/rc | grep -v grep`;

			if ( $? == 0 )
			{
			  print " runlevel 3|5 is reached  \n";
			}
			else 
			{
			  print " runlevel 3|5 has not reached due to suck rc* scripts ............\n";
			  print "ps -ef | grep /etc/rc | grep -v grep \n $result_grep"

			}

#@CAUSE : 5
#@   
#@   OS user as changed the group for install / config user like root or oracle or grid
#@



#@CAUSE : 6
#@   
#@   ocr.loc contains mismatch accross nodes
#@



}

sub diskCheck(){



}

sub netCheck(){






}

sub filesystemCheck(){





}

sub otherCheck(){

restartClusterExtractLogs();







}

sub restartClusterExtractLogs(){


####
####   STOP CRS STACK AND KILL ALL THE CLUSTER DEAMONS IF STILL RUNNINNG
####
####

print "\n------------------STOPPING CLUSTER SERVICES----------------------\n";


$result = `crsctl stop crs -f`;


print "\n-----------------------------------------------------------------\n";

        if ($result =~ /4133/){
            print "\nOracle High Availability Services has been stopped.\n";


        } elsif ($result =~ /4563/) {
                 print "\n Insufficient user privileges.\n Run the Script as root user \n";


          } elsif ($result =~ /4000/){
                 print "\n Command Stop failed, or completed with errors.\n Kill Surviving process...\n";
                 $PIDLists = `ps -elf | egrep "PID|ohasd|oraagent|mdnsd|gpnpd|orarootagent|cssdagent|cssdmonitor|crsd|css|gipc|ctssd" | grep -v grep| awk '{ print \$4 }'`;
                   my  @KillPIDs = split /^/, $PIDLists;
                   foreach my $KillPID (@KillPIDs){
                      if ($KillPID =~ /^[0-9]/) {
                          kill 9,$KillPID;
                       }
                   }
            } else {

                    print "what is happening \n";
              }


print "\n-----------------------------------------------------------------\n";

####
####ONCE THE CLUSTER DEAMONS ARE STOPED , GET THE LAST LINE TIMESATMP FROM EACH DEAMONS LOG
####CREATE A TEMP DIRECTORY TO EXTRACT THE START LOG
####


print "\n\n---------------CREATE TEMP DIRECTORY ----------------------------\n";


print "\n \tTemp Directory = /tmp/.startup\n";

print "\n \tlogBase =  $logBase\n";

$dir = "/tmp/.startup";
# This creates .startup directory in /tmp directory.
 mkdir( $dir ) or chdir ($dir) or die "Couldn't create $dir directory, $!";


print "\n-----------------------------------------------------------------\n";


print "\n\n-------------EXTRACT LAST TIMESTAMP FROM LOGS------------------\n";


my @logBaseList = glob( $logBase."/*" );


foreach $TMP (@logBaseList ){

#print "$TMP \n \n";

   @lv = split("/", $TMP);
#print "$lv[-1]\n";

    if ( $lv[-1] eq 'cssd' || $lv[-1] eq 'ctssd' ){
           $logfile{$lv[-1]} = $TMP."/o".$lv[-1].".log";
          # print "$logfile{$lv[-1]} \n ";

       } elsif ( $lv[-1] eq 'ohasd' || $lv[-1] eq 'gipcd' || $lv[-1] eq 'gpnpd' || $lv[-1] eq 'mdnsd' || $lv[-1] eq 'crsd'){
                $logfile{$lv[-1]} = $TMP."/".$lv[-1].".log";
           #     print "$logfile{$lv[-1]} \n";

         } elsif  ($lv[-1] =~ /alert/){
                    $logfile{$lv[-1]} = $TMP;
            #        print "$logfile{$lv[-1]} \n";
           }elsif ($lv[-1] =~ /agent/) {
            #  print " $lv[-1]\n";  ####### FOR AGET LOG YET TO BE WRITTEN
                 $crsrootagent = $TMP."/crsd/orarootagent_root/orarootagent_root.log";
                 $crsoraagent  = $TMP."/crsd/oraagent_oracle/oraagent_oracle.log";
                 $ocssdmoniter = $TMP."/ohasd/oracssdmonitor_root/oracssdmonitor_root.log";
                 $ocssdagent   = $TMP."/ohasd/oracssdagent_root/oracssdagent_root.log";
                 $ohasdrootagent = $TMP. "/ohasd/orarootagent_root/orarootagent_root.log";
                 $ohasdoraagent  = $TMP. "/ohasd/oraagent_oracle/oraagent_oracle.log";

                $logfile{'crsrootagent'}= $crsrootagent;
                $logfile{'crsoraagent'} = $crsoraagent;
                $logfile{'ocssdmoniter'} =$ocssdmoniter;
                $logfile{'ocssdagent'}= $ocssdagent;
                $logfile{'ohasdrootagent'}=$ohasdrootagent;
                $logfile{'ohasdoraagent'}= $ohasdoraagent;

            }

}



foreach $key (keys %logfile){
print "\n\n=====$key  => $logfile{$key}====\n";

        unless ($key =~ /alert/){
                tie my @fileRow, 'Tie::File', $logfile{$key}, mode => O_RDONLY or die "$logfile{$key}error: $!\n";
                $LastRow =  $fileRow[-1];


                my ($Y,$M,$D,$h,$m,$s) = ($LastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
                $timeStamp{$key} = "$Y-$M-$D $h:$m:$s";

               # print "$timeStamp{$key}\n";
                untie @fileRow;

        } else {

                #########  Alert LOG
                #########  Stop Time Stamp
                tie  @fileRow, 'Tie::File', $logfile{$key}, mode => O_RDONLY or die "$logfile{$key} error: $!\n";

                $i =-1;
                do {
                   $alertLastRow =  $fileRow[$i];
                   #   print "$alertLastRow\n";
                   ($Y,$M,$D,$h,$m,$s) = ($alertLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
                   $i= $i-1;
                } until ($Y);

                $timeStamp{$key} = "$Y-$M-$D $h:$m:$s";

               # print "$timeStamp{$key}\n";
                untie @fileRow;

        }


print "-----$key -- extracted time -- $timeStamp{$key} -----------------\n";


}


print "\n-----------------------------------------------------------------\n";


####
####
####
####

print "\n-------------------START CLUSTER SERVICES------------------------\n";


print "\n-----------------------SLEEP ------------------------------------\n";
$result = `rm -rf /var/tmp/.oracle/*`;
if ($?){
  die ("\n $result debug mode : $!\n");
}

$result = `crsctl start crs`;
if ($?){
   die ("\n $result debug mode :$!\n");
}


print "\n-----------------------------------------------------------------\n";

sleep (120);


print "\n------EXTRACT LOGS FROM EACH OF THE LOGS FILE----------------------\n";


foreach $key (keys %logfile){

unless ($key =~ /alert/){ $loc = "/tmp/.startup/".$key.".log";} else {$loc = "/tmp/.startup/".$key ;}
print "-------\n$key  => $loc--------\n";
 `sed '1,/$timeStamp{$key}/d' $logfile{$key} > $loc`;
if ($?){
    die  (" debug mode : $!\n");
}


$temp = $logfile{'ohasd'};
$logfile{'ohasd'} =~ s/\.log$/OUT.log/;
$logOUT = $logfile{'ohasd'};
$logfile{'ohasd'} = $temp;

($Y,$M,$D,$h,$m,$s) = ($timeStamp{'ohasd'} =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
$outtime = "$Y-$M-$D $h";
$loc = "/tmp/.startup/ohasdOUT.log";
`sed '1,/$outtime/d' $logOUT > $loc`;

print "\n-----------------------------------------------------------------\n";

}






}

sub gridStartup(){

configurationCheck();
diskCheck();
netCheck();
filesystemCheck();
otherCheck();

}


gridStartup();
