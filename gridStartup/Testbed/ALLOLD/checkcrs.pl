#!/usr/bin/perl
print "-------------- CHECKING CRS STACK-------------------\n";


$checkCrsResult = `crsctl check crs 2>&1`;
if ( $? == -1 )
{
  print "Error executing check crs  $!\n";
  exit;
}

@State = `crsctl stat res -t -init | grep -v "\-" |paste - - | tail -n+2 | awk -v OFS='\t' '{print \$1, \$4}'`;

foreach ( @State){

   @temp = split /\t/,$_;
   
   chop $temp[1];
   
   $State{$temp[0]}= $temp[1];
}

#while (( $key ,$value)= (each  %State)){

#print "$key => $value\n";

#}
$agent = ` ps -elf | egrep "PID|ohasd|oraagent|mdnsd|gpnpd|orarootagent|cssdagent|cssdmonitor|crsd|css|gipc|ctssd" | grep -v "cssd" | grep agent | wc -l`;

if ($checkCrsResult =~ /CRS\-4639/ ){

  print "Reporting CRS Error 4639 \n";
  print "Checking for known issue .........\n";


} 

if ($checkCrsResult =~ /CRS\-4530/){

   print "Reporting CRS Error 4530 \n";
   print "Ckecking for known issue .........\n";


} 

if ($checkCrsResult =~ /CRS\-4535/){

   print "Reporting CRS Error 4535 \n";
   print "ckecking for known issue .........\n";


} 


if ($agent != 4 ||  $State{'ora.gpnpd'} =~ /OFFLINE/ || $State{'ora.gpicd'} =~ /OFFLINE/ || $State{'ora.mdnsd'} =~ /OFFLINE/){
  print "Why is this here \n"


}

if ($State{'ora.asm'} =~ /OFFLINE/)  {

  print "CRS-4638: Oracle High Availability Services is online\n";


} 
