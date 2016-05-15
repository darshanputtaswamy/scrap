#!/usr/bin/perl
use strict;
use JSON;
use Data::Dumper;


sub checklogs( @$ ); # declaration

sub checklogs(@$){
print "\n\n\n";
my $version = pop( @_ );
my $platform = pop(@_);
my $failedprocess = pop (@_);
my $json_data = pop(@_);
#print "Given list is @list\n";
#print " $version ,$platform ,$failedprocess\n";

my $caseref =  $json_data->{WELLKNOWNISSUE}->{CASES};

	foreach my $hashcaseref (@$caseref) {

  
			if (  ( $hashcaseref->{-platform} eq 'LINUX' or $hashcaseref->{-platform} eq 'Independent') and 
					($hashcaseref->{-version} eq '12cR1' or $hashcaseref->{-version} eq 'Independent' ))

			   {  print "\n\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n";
				      print "VERSION : ".$hashcaseref->{-version}."\n";
				      print "PLATFORM : ".$hashcaseref->{-platform}."\t";
				      print "\n";
 
                                              my $failedprocessref = $hashcaseref->{FAILEDPROCESS};
	 
					      foreach my $hashfailedprocessref (@$failedprocessref)
      					      {



           					  if ( ( $hashfailedprocessref->{-name} eq $failedprocess )){


                                                     print "FAILED PROCESS :".$hashfailedprocessref->{-name}."\n";

							my $errorref = $hashfailedprocessref->{ERROR};
	 
								
						          foreach my $hashErrorref (@$errorref){
		  					   print "\n========================================================================================\n";
                                                           print "\n----------------------------------------------------------------------------------------\n";

							   print  "\n ERROR ID : ".$hashErrorref->{-id}."\n\n";	
													    
							   my $contentref = $hashErrorref->{CONTENT};

							     foreach my $hashcontentref (@$contentref){


                                   					 if (  ($hashcontentref->{'-Clause'} eq 'and')){

								   		 print "LOG FILE NAME :  ". $hashcontentref->{'-log'}."\t\t";
										 print " CLAUSE : ".$hashcontentref->{'-Clause'}."\n";
                						                 print "CONTENT : ".$hashcontentref->{'#text'}."\n";
											
									}
									else {
									
										my $subcontentref = $hashcontentref->{SUBCONTENT};

											foreach my $hashsubcontentref (@$subcontentref){

											print "LOG FILE NAME :  ". $hashsubcontentref->{'-log'}."\t\t";
											print " CLAUSE : ".$hashsubcontentref->{'-Clause'}."\n";
											print "SUBCONTENT : ".$hashsubcontentref->{'#text'}."\n";
											
											}
			 				    			}

								   # print "LOG FILE NAME :  ". $hashcontentref->{'-log'}."\t\t";
   								   # print "CLAUSE : ".$hashcontentref->{'-Clause'}."\n";
                                                                   # print "CONTENT : ".$hashcontentref->{'#text'}."\n";
			 					

								}
			 				  print "\n--------------------------------------------------------------------------------------------\n";
                                                          print "RECOMMENDATION :".$hashErrorref->{RECOMMENDATION}."\n" ;

		  					  }

	  					}
     
				   }		
			}


		}

}



sub main(){

open (han1, "sample2.js") or die "can not read this file: $!\n";
my $json_string = join '', <han1>;
my $json_data = decode_json $json_string;


my $cid = 0;
my $pname = 1;
my $version = $json_data->{WELLKNOWNISSUE}->{CASES}[$cid]->{-version};
my $platform = $json_data->{WELLKNOWNISSUE}->{CASES}[$cid]->{-platform};
my $failedprocess = $json_data->{WELLKNOWNISSUE}->{CASES}[$cid]->{FAILEDPROCESS}[$pname]->{-name};

#print "$version , $platform  , $failedprocess\n";
checklogs($json_data,$failedprocess ,$platform ,$version);




=begin someformat

print $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{-version};
print "\n";
print $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{-platform};
#print $json_data->{WELLKNOWNISSUE}->{CASES}->{Failedprocess}->{ERROR -> {-id}}
print "\n";

print $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{FAILEDPROCESS}[0]->{-name};
print "\n";

print $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{FAILEDPROCESS}[0]->{ERROR}[0]->{-id};
print "\n";


print $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{FAILEDPROCESS}[0]->{ERROR}[0]->{CONTENT};
print "\n";

my $arrayref =  $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{FAILEDPROCESS}[0]->{ERROR}[0]->{CONTENT};;

foreach my $hashref (@$arrayref) {
    print $hashref->{'-log'}, "\n";
    print $hashref->{'#text'},"\n";
    print $hashref->{'-Clause'},"\n";

}


print $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{FAILEDPROCESS}[0]->{ERROR}[0]->{RECOMMENDATION};
print "\n";

}

#my $arrayref = $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{Failedprocess};

#foreach my $hashref (@$arrayref) {
#    print $hashref->{-name}, "\n";
#}
=end someformat
=cut


}

main();
