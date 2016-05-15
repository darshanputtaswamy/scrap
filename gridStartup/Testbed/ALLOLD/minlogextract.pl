#!/usr/bin/perl -w
use Fcntl;
use Tie::File;

$logBase = $ENV{'ORACLE_HOME'};
$logBase = $logBase."/log/".$ENV{'HOSTNAME'} ;
#$logBase = $logBase.$ENV{'HOSTNAME'};
print "logBase =  $logBase\n";

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
print "=============\n\n$key  => $logfile{$key}\n";
	
	unless ($key =~ /alert/){
		tie my @fileRow, 'Tie::File', $logfile{$key}, mode => O_RDONLY or die "error: $!\n";
		$LastRow =  $fileRow[-1];
		

		my ($Y,$M,$D,$h,$m,$s) = ($LastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
		$timeStamp{$key} = "$Y-$M-$D $h:$m:$s";

		print "$timeStamp{$key}\n";
                untie @fileRow;

	} else {

		#########  Alert LOG
		#########  Stop Time Stamp
		tie  @fileRow, 'Tie::File', $logfile{$key}, mode => O_RDONLY or die "$alertLogFile error: $!\n";

		$i =-1;
		do {
		   $alertLastRow =  $fileRow[$i];
		   #   print "$alertLastRow\n";
		   ($Y,$M,$D,$h,$m,$s) = ($alertLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
		   $i= $i-1;
	        } until ($Y);

		$timeStamp{$key} = "$Y-$M-$D $h:$m:$s";

                print "$timeStamp{$key}\n";
		untie @fileRow;

	}



}


print "\n\n\n\n\n\n";
foreach $key (keys %logfile){

unless ($key =~ /alert/){ $loc = "/tmp/.startup/".$key.".log";} else {$loc = "/tmp/.startup/".$key ;}
print "$key  => $loc\n";
$cmd  =  `sed '1,/$timeStamp{$key}/d' $logfile{$key} > $loc`;
if ($?){
    die  (" debug mode : $!\n");
}


}


$temp = $logfile{'ohasd'};
$logfile{'ohasd'} =~ s/\.log$/OUT.log/;
$logOUT = $logfile{'ohasd'};
$logfile{'ohasd'} = $temp;

($Y,$M,$D,$h,$m,$s) = ($timeStamp{'ohasd'} =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
$outtime = "$Y-$M-$D $h:$m:";
$loc = "/tmp/.startup/ohasdOUT.log"
`sed '1,/$outime/d' $logOUT > $loc`;




=p

#$ocssdLastRow =~ m/[/;
#print "$timeStamp \n ";

#print " $'\n";
#$cmd =  "sed \'1,/$timeStamp/d\' $ocssdLogFile";
#print "$cmd\n \n \n ";
#$result   = system ("$cmd");

#@print "$result";

$dir = "/tmp/.startup";
# This creates perl directory in /tmp directory.
mkdir( $dir ) or die "Couldn't create $dir directory, $!";


$cmd  =  `sed '1,/$timeStamp/d' $ocssdLogFile > /tmp/.startup/ocssdtmp.log`;
if ($?){
    die  (" debug mode : $!\n");
}

