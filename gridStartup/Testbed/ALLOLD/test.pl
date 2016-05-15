#!/usr/bin/perl
print " Checking CRS............\n";


$crs_result = `crsctl check crs 2>&1`;
if ( $? == -1 )
{
  print "command failed: Couldnot Find crsctl $!\n";
  print "Ensure That PATH to crsctl is set correctly  $!\n";
  exit;
}

$crs_result_error = $crs_result =~ /CRS\-4639/;
if ($crs_result_error >0){ 
print " Reporting CRS Error 4639\n"; 
print " Checking inittab file \n"; 

# Checking if the inittab file exists 
	unless (open(MYFILE, "/etc/inittab")) {
 	if (-e "/etc/inittab") {
 	die ("File inittab exists, but cannot be opened.\n");
 	} else {
 	die ("File inittab does not exist.\n");
 	}
 	}

# Showing the contents of inittab 
#        print " Showing the contents of Inittab.\n";
#	$line = <MYFILE>;
#	while ($line ne "") {
#	chop ($line);
#	print ("\U$line\E\n");
#	$line = <MYFILE>;
#	}


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

print " Checking INIT...........\n";
$init_result = `ps -ef | grep init 2>&1`;
if ( $? == -1 )
{
  print "command failed: Couldnot Find ps $!\n";
  print "Ensure That PATH to ps  is set correctly  $!\n";
  exit;
}

$init_result_error = $init_result =~ /init\.ohasd run/;
if ($init_result_error ==0){ 
print " Runlevel 3 has not been reached, some rc3 script is hanging....\n";
print " Kill Any  rc3 script that appear to be hung ....\n";
exit;
}
else {
print " Runlevel 3 has  been reached....\n";
}
###############################################################
print " Checking INIT.BIN..........\n";
$init_d_bin_result = `ps -ef | grep d.bin 2>&1`;
if ( $? == -1 )
{
  print "command failed: Couldnot Find ps $!\n";
  print "Ensure That PATH to ps  is set correctly  $!\n";
  exit;
}

$init_d_bin_result_error = $init_d_bin_result =~ /ohasd\.bin reboot/;
$process_cnt = `ps -ef | grep d.bin|wc -l`;
print "Process Count ",$process_cnt ;
if ($init_result_error ==0){ 
print " The init process  did not spawn the process defined in /etc/inittab....\n";
print " or a bad entry before init.ohasd like xx:wait:<process> blocked the start of init.ohasd ....\n";
print " Remove the bad entry before init.ohasd. Consult with OS vendor if init q does not spawn init.ohasd run process. As a workaround, start the init.ohasd manually, eg: as root user, run /etc/init.d/init.ohasd run >/dev/null 2>&1 </dev/null &....\n";
exit;
}
elsif ($process_cnt < 3) {
print " It appears that ohasd.bin reboot process s running without any other processes ";
print " As a workaround, start the init.ohasd manually, eg: as root user, run /etc/init.d/init.ohasd run >/dev/null 2>&1 </dev/null &....\n";
}
else {
print " This Check Performed Successfully....\n";
}
##########################################################################
##Checking if Gridhome is set ###########

if (defined $ENV{'GRID_HOME'}) { $prefix = $ENV{'GRID_HOME'} }
else {
print "Grid_Home is not Set taking path /u01/app/12.1.0/grid\n";
$prefix = '/u01/app/12.1.0/grid/' }
$path_to_ohasd = $prefix . `hostname -a`;
chomp($path_to_ohasd);
print $path_to_ohasd;
$path_to_ohasd_log = "${path_to_ohasd}/ohasd/ohasd.log";

print $path_to_ohasd_log;
##########Checking ohasd log file #############

# Checking if the ohasd log  file exists 
	unless (open(MYFILE,$path_to_ohasd_log )) {
 	if (-e $path_to_ohasd_log) {
 	die ("File ohasd log  exists, but cannot be opened.\n");
 	} else {
 	die ("File ohasd log  does not exist.\n");
 	}
 	}

print " Checking contents of ohasd log  file .........\n";
$result_ohasd_grep = `grep -i "TIMED OUT WAITING FOR OHASD MONITOR" $path_to_ohasd_log`;

if ( $? == 0 )
{
  print " CRS autostart could be disabled  \n";
  print " Enable CRS autostart: # crsctl enable crs \n";
  print "                       # crsctl start crs \n";
  exit;
 
}
else 
{
  print " CRS autostart is enabled ............\n";
  print " Check Passed successfully............\n";
}

#print ("result1, $result1");
#$result2 = `crsctl stat res -t -init 2>&1`;
#print ("result2, $result2");
#$result3 = `crsctl stat res -t 2>&1`;
#print ("result3, $result3");
#$result4 = `ps -ef | egrep 'init|d.bin' 2>&1`;
#print ("result4, $result4");

