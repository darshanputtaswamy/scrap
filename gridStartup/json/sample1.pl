#!/usr/bin/perl
use strict;
use JSON;
use Data::Dumper;

sub checklogs(){
print @_;
print "\n";
}

sub main(){
open (han1, "sample2.js") or die "can not read this file: $!\n";
my $json_string = join '', <han1>;
my $json_data = decode_json $json_string;

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


print $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{FAILEDPROCESS}[0]->{ERROR}[0]->          {RECOMMENDATION};
print "\n";



#my $arrayref = $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{Failedprocess};

#foreach my $hashref (@$arrayref) {
#    print $hashref->{-name}, "\n";
#}

 $version = $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{-version};
my $platform = $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{-platform};
my $failedprocess = $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{FAILEDPROCESS}[0]->{-name};


checklogs($version , $platform , $failedprocess);


my $caseref =  $json_data->{WELLKNOWNISSUE}->{CASES};

foreach my $hashcaseref (@$caseref) {

  if ($hashcaseref->{-version} -eq $failedprocess and $hashcaseref->{-platform} -eq $platform)
   {
      print "1";
   
   
   }
}

main();