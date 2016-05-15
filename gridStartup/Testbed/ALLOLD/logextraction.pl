#!/usr/bin/perl -w
use Fcntl;
use Tie::File;

$logBase = $ENV{'ORACLE_HOME'};
$logBase = $logBase."/log/".$ENV{'HOSTNAME'} ;
#$logBase = $logBase.$ENV{'HOSTNAME'};
print "logBase =  $logBase\n";
chdir("$logBase");
#print "\n$?";
$listFolder = `ls`;

#print "\n$listFolder";

$ocssdLogFile = $logBase. "/cssd/ocssd.log";
tie my @fileRow, 'Tie::File', $ocssdLogFile, mode => O_RDONLY or die "error: $!\n";
$ocssdLastRow =  $fileRow[-1];
untie @fileRow;

#$ohasdLogFile = $logBase. "/ohasd/ohasd.log";
#tie my @fileRow, 'Tie::File', $ohasdLogFile, mode => O_RDONLY or die "error: $!\n";
#$ohasdLastRow =  $fileRow[-1];
#untie @fileRow;

#$crsdLogFile = $logBase. "/crsd/crsd.log";
#tie my @fileRow, 'Tie::File', $crsdLogFile, mode => O_RDONLY or die "error: $!\n";
#$crsdLastRow =  $fileRow[-1];
#untie @fileRow;

#print "$ocssdLastRow\n\n\n";
#print "$ohasdLastRow\n\n\n";
#print "$crsdLastRow\n\n\n";

my ($Y,$M,$D,$h,$m,$s) = ($ocssdLastRow =~ m/(\d+)\-(\d+)-(\d+)\ (\d+):(\d+):(\d+)/);
$timeStamp = "$Y-$M-$D $h:$m:$s";

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

