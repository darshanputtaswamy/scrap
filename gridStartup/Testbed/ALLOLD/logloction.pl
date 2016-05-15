#!/usr/bin/perl 

$logBase = $ENV{'ORACLE_HOME'};
$logBase = $logBase."/log/".$ENV{'HOSTNAME'} ;
#$logBase = $logBase.$ENV{'HOSTNAME'};
print "$logBase";
chdir("$logBase");
print "\n$?";
$listFolder = `ls`;

print "\n$listFolder";

