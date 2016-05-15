XML::Simple module:
#!/usr/bin/perl

# use module
use XML::Simple;
use Data::Dumper;

# create object
$xml = new XML::Simple;

# read XML file
$data = $xml->XMLin("sample2.xml");

# print output
print Dumper($data);
