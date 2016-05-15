#!/usr/bin/perl -w
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

	print "\n\nCASUE 2: CHECK FOR SPAWNED init.ohasd  \n";

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


 print "\n\nCAUSE : 3  CHECK FOR  inittab entries\n";
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


	print "\n\nCASUE : 4  runlevel 3|5 has mot reached due to suck rc* scripts \n";

	$result_grep = `ps -ef | grep /etc/rc | grep -v grep`;

			if ( $? == 0 )
			{
			 print " runlevel 3|5 has not reached due to suck rc* scripts ............\n";
  		     print "ps -ef | grep /etc/rc | grep -v grep \n $result_grep"

			}
			else 
			{
			  print " runlevel 3|5 is reached  \n";
			  
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

configurationCheck();