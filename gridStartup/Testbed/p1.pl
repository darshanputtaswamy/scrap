#!/usr/bin/perl -w
$path_to_ohasd_log = "/tmp/.startup/ohasd.log";

print "$path_to_ohasd_log\n";

#checking ohasd log file #############

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



