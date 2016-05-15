#!/usr/bin/perl
use strict;
use JSON;
use Data::Dumper;

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


print $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{FAILEDPROCESS}[0]->{ERROR}[0]->{RECOMMENDATION};
print "\n";



#my $arrayref = $json_data->{WELLKNOWNISSUE}->{CASES}[0]->{Failedprocess};

#foreach my $hashref (@$arrayref) {
#    print $hashref->{-name}, "\n";
#}



