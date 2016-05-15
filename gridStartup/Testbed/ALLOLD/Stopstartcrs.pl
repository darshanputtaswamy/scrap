#!/usr/bin/perl -w
use Fcntl;
use Tie::File;

unless ( $logBase = $ENV{'ORACLE_HOME'} ){
        die  ("Please set the oracle home and base .\n");
}
unless ( $logBase =~ /grid/ ){
        die ("Oracle home is not grid home");
}

$logBase = $logBase."/log/".$ENV{'HOSTNAME'} ;

####
####   STOP CRS STACK AND KILL ALL THE CLUSTER DEAMONS IF STILL RUNNINNG
####
####

print "\n------------------STOPING CLUSTER SERVICES----------------------\n";

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


print "\n-------------------------------------------------------------------\n";

####
####ONCE THE CLUSTER DEAMONS ARE STOPED , GET THE LAST LINE TIMESATMP FROM EACH DEAMONS LOG
####CREATE A TEMP DIRECTORY TO EXTRACT THE START LOG 
####


print "\n\n---------------CREATE TEMP DIRECTORY ----------------------------\n";




print "\n \tlogBase =  $logBase\n";

$dir = "/tmp/.startup";
# This creates .startup directory in /tmp directory.
 mkdir( $dir ) or chdir ($dir) or die "Couldn't create $dir directory, $!";


print "\n-----------------------------------------------------------------\n";


print "\n\n-------------EXTRACT LAST TIMESTAMP FROM LOGS------------------\n";



#########  OCSSD LOG 
#########  Stop Time Stamp
$ocssdLogFile = $logBase. "/cssd/ocssd.log";
tie  @fileRow, 'Tie::File', $ocssdLogFile, mode => O_RDONLY or die "$ocssdLogFile error: $!\n";
$ocssdLastRow =  $fileRow[-1];
untie @fileRow;


 ($Y,$M,$D,$h,$m,$s) = ($ocssdLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
$ocssdTimeStamp = "$Y-$M-$D $h:$m:$s";


print "\n-----ocssd extracted timestamp $ocssdTimeStamp ---------------\n";

#########  OHASD LOG
#########  Stop Time Stamp
$ohasdLogFile = $logBase. "/ohasd/ohasd.log";

tie @fileRow, 'Tie::File', $ohasdLogFile, mode => O_RDONLY or die "$ohasdLogFile error: $!\n";
$ohasdLastRow =  $fileRow[-1];
untie @fileRow;


 ($Y,$M,$D,$h,$m,$s) = ($ohasdLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
$ohasdTimeStamp = "$Y-$M-$D $h:$m:$s";


print "\n-----ohasd extracted timestamp $ohasdTimeStamp ---------------\n";

#########  Alert LOG
#########  Stop Time Stamp
$alertLogFile = $logBase. "/alert".$ENV{'HOSTNAME'}.".log";
tie  @fileRow, 'Tie::File', $alertLogFile, mode => O_RDONLY or die "$alertLogFile error: $!\n";

$i =-1; 
do {
   $alertLastRow =  $fileRow[$i];
#   print "$alertLastRow\n";
   ($Y,$M,$D,$h,$m,$s) = ($alertLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
   $i= $i-1;
  } until ($Y);

$alertTimeStamp = "$Y-$M-$D $h:$m:$s";



untie @fileRow;


 ($Y,$M,$D,$h,$m,$s) = ($alertLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
$alertTimeStamp = "$Y-$M-$D $h:$m:$s";


print "\n-----alert extracted timestamp $alertTimeStamp----------------\n";


#########  crsd LOG
#########  Stop Time Stamp
$crsdLogFile = $logBase. "/crsd/crsd.log";
tie  @fileRow, 'Tie::File', $crsdLogFile, mode => O_RDONLY or die "$crsdLogFile error: $!\n";
$crsdLastRow =  $fileRow[-1];
untie @fileRow;


 ($Y,$M,$D,$h,$m,$s) = ($crsdLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
$crsdTimeStamp = "$Y-$M-$D $h:$m:$s";


print "\n-----crsd  extracted timestamp $crsdTimeStamp -----------------\n";


#########  GIPCD LOG
#########  Stop Time Stamp
$gipcdLogFile = $logBase. "/gipcd/gipcd.log";
tie  @fileRow, 'Tie::File', $gipcdLogFile, mode => O_RDONLY or die "$gipcdLogFile error: $!\n";
$gipcdLastRow =  $fileRow[-1];
untie @fileRow;


 ($Y,$M,$D,$h,$m,$s) = ($gipcdLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
$gipcdTimeStamp = "$Y-$M-$D $h:$m:$s";


print "\n-----gipcd extracted timestamp $gipcdTimeStamp----------------\n";


#########  GPNPD LOG
#########  Stop Time Stamp
$gpnpdLogFile = $logBase. "/gpnpd/gpnpd.log";
tie @fileRow, 'Tie::File', $gpnpdLogFile, mode => O_RDONLY or die "error: $!\n";
$gpnpdLastRow =  $fileRow[-1];
untie @fileRow;


 ($Y,$M,$D,$h,$m,$s) = ($gpnpdLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
$gpnpdTimeStamp = "$Y-$M-$D $h:$m:$s";

print "\n-----gpnpd extracted timestamp $gipcdTimeStamp----------------\n";


print "\n-----------------------------------------------------------------\n";


####
####
####
####

print "\n-------------------START CLUSTER SERVICES------------------------\n";


print "\n----SLEEP FOR A MIN,LET THE LOGS GENERATE------------------------\n";
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


print "\n----EXTRACT LOGS FROM EACH OF THE LOGS FILE----------------------\n";


$cmd =  `sed '1,/$ocssdTimeStamp/d' $ocssdLogFile > /tmp/.startup/ocssdtmp.log`;
if ($?){
    die  (" debug mode : $!\n");
}



$cmd =  `sed '1,/$ohasdTimeStamp/d' $ohasdLogFile > /tmp/.startup/ohasdtmp.log`;
if ($?){
    die  (" debug mode : $!\n");
}


$cmd =  `sed '1,/$alertTimeStamp/d' $alertLogFile > /tmp/.startup/alerttmp.log`;
if ($?){
    die  (" debug mode : $!\n");
}


$cmd =  `sed '1,/$crsdTimeStamp/d' $crsdLogFile > /tmp/.startup/crsdtmp.log`;
if ($?){
    die  (" debug mode : $!\n");
}


$cmd =  `sed '1,/$gipcdTimeStamp/d' $gipcdLogFile > /tmp/.startup/gipcdtmp.log`;
if ($?){
    die  (" debug mode : $!\n");
}


$cmd =  `sed '1,/$gpnpdTimeStamp/d' $gpnpdLogFile > /tmp/.startup/gpnpdtmp.log`;
if ($?){
    die  (" debug mode : $!\n");
}


print "\n-----------------------------------------------------------------\n";


