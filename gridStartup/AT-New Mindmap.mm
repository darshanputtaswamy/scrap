<map version="0.9.0">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node BACKGROUND_COLOR="#ccffff" CREATED="1436864954854" ID="ID_791826808" MODIFIED="1456379769192" TEXT="CRS-startup-AT">
<node BACKGROUND_COLOR="#ff9966" CREATED="1436865123319" HGAP="94" ID="ID_1214370703" MODIFIED="1456380992752" POSITION="right" TEXT="Disk-check()" VSHIFT="49">
<node BACKGROUND_COLOR="#0000ff" CREATED="1436865827535" FOLDED="true" ID="ID_936453511" MODIFIED="1456379719441" TEXT="possible causes">
<node CREATED="1436886842794" ID="ID_332138813" MODIFIED="1456376554224" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      causes: Use below docs to make a causes check-list for disk issues
    </p>
    <p>
      
    </p>
    <p>
      a) do specific check with cluvfy comp ssa -n &lt;node_list&gt; -s &lt;storageID_list&gt;
    </p>
    <p>
      &#160;&#160;&#160;here -s options must come from our cluster_discovery_metadata
    </p>
    <p>
      
    </p>
    <p>
      b) follow docs to prepare xls list of checks relevant to customer setup:
    </p>
    <p>
      
    </p>
    <p>
      (Doc ID 1535996.1) ORA-15063 / ORA-15042 - TROUBLESHOOTING STEPS BEFORE OPENING a SR to Oracle Support
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
</node>
<node BACKGROUND_COLOR="#ff9966" CREATED="1436865131805" HGAP="-7" ID="ID_1234900265" MODIFIED="1456380956832" POSITION="left" TEXT="Net-check()" VSHIFT="185">
<node BACKGROUND_COLOR="#0000ff" CREATED="1436865310187" FOLDED="true" HGAP="89" ID="ID_370186829" MODIFIED="1456380964552" TEXT="possible causes" VSHIFT="-89">
<node CREATED="1436886842794" ID="ID_881078760" MODIFIED="1456376206975" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      causes: Use below docs to make a causes check-list for network issues
    </p>
    <p>
      
    </p>
    <p>
      a) do specific check with cluvfy comp nodecon [-n &lt;node_list&gt;] [-networks &lt;network_list&gt;] [-verbose]
    </p>
    <p>
      &#160;&#160;&#160;&#160;here -networks options must come from our cluster_discovery_metadata
    </p>
    <p>
      
    </p>
    <p>
      b) follow docs to prepate xls list of checks relevant to customer setup:
    </p>
    <p>
      
    </p>
    <p>
      (Doc ID 1445075.1)Node reboot or eviction: How to check if your private interconnect CRS can transmit network heartbeats
    </p>
    <p>
      (Doc ID 1054902.1)How to Validate Network and Name Resolution Setup for the Clusterware and RAC
    </p>
    <p>
      (Doc ID 1507482.1)Oracle Clusterware Cannot Start on all Nodes: Network communication with node &lt;NAME&gt; missing for 90% of timeout interval
    </p>
    <p>
      (Doc ID 341788.1)Recommendation for the Real Application Cluster Interconnect and Jumbo Frames
    </p>
    <p>
      (Doc ID 1386709.1)The Basics of IPv4 Subnet and Oracle Clusterware
    </p>
    <p>
      (Doc ID 1212703.1)Grid Infrastructure Startup During Patching, Install or Upgrade May Fail Due to Multicasting Requirement
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
</node>
<node BACKGROUND_COLOR="#ff9966" CREATED="1436865192773" HGAP="115" ID="ID_847335396" MODIFIED="1456379713622" POSITION="right" TEXT="Config-check()" VSHIFT="35">
<node BACKGROUND_COLOR="#0000ff" CREATED="1436865347683" FOLDED="true" HGAP="-29" ID="ID_1967075066" MODIFIED="1456380981225" TEXT="possible causes" VSHIFT="29">
<node CREATED="1436886842794" ID="ID_1265618665" MODIFIED="1436937674009" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      cause1: CRS autostart is disabled
    </p>
    <p>
      
    </p>
    <p>
      Below file must have value &quot;enable&quot;
    </p>
    <p>
      /etc/oracle/scls_scr/`hostname`/root/ohasdstr
    </p>
  </body>
</html></richcontent>
</node>
<node CREATED="1436886941363" ID="ID_1195012443" MODIFIED="1436937685752" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      cause2: init process did not spawn init.ohasd
    </p>
    <p>
      
    </p>
    <p>
      Below command must return o/p showing &quot;init.ohasd&quot;
    </p>
    <p>
      ps -ef|grep init.ohasd |grep -v grep
    </p>
  </body>
</html></richcontent>
</node>
<node CREATED="1436886946113" ID="ID_261957036" MODIFIED="1436937693658" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      cause3: runlevel 3|5 has not reached due to stuck rc* script
    </p>
    <p>
      
    </p>
    <p>
      Below command must return nothing
    </p>
    <p>
      ps -ef|grep /etc/rc |grep -v grep
    </p>
  </body>
</html></richcontent>
</node>
<node CREATED="1436886950286" ID="ID_1884226725" MODIFIED="1436939203532" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      cause4: OS user has changed the group for install/config user like root or oracle or grid
    </p>
    <p>
      
    </p>
    <p>
      Below command will get us the GROUP_NAME for each USER_NAME stored in OLR
    </p>
    <p>
      ocrdump -local -stdout | grep -A3 SYSTEM.css |grep GROUP
    </p>
  </body>
</html></richcontent>
</node>
<node CREATED="1436886959139" ID="ID_696411017" MODIFIED="1436939841415" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      cause5: ocr.loc contents mismatch across the nodes
    </p>
    <p>
      
    </p>
    <p>
      Below can help us see if there is a difference in content of this file on local node and across any remote node
    </p>
    <p>
      diff /etc/oracle/ocr.loc &lt;(ssh host02 'cat /etc/oracle/ocr.loc')
    </p>
  </body>
</html></richcontent>
</node>
<node CREATED="1456373664736" ID="ID_893299145" MODIFIED="1456373888541" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      cause6:&#160;kajfkjk;sjadjasdjsadk
    </p>
    <p>
      
    </p>
    <p>
      kjkasjdkjsajka
    </p>
  </body>
</html>
</richcontent>
</node>
<node CREATED="1456373685076" ID="ID_1843853799" MODIFIED="1456373903666" STYLE="bubble" TEXT="cause7:"/>
<node CREATED="1456373690294" ID="ID_1449461650" MODIFIED="1456373922439" STYLE="bubble" TEXT="cause8:"/>
<node CREATED="1456373695060" ID="ID_1363786916" MODIFIED="1456373915101" STYLE="bubble" TEXT="cause9:"/>
<node CREATED="1456373700200" ID="ID_678932173" MODIFIED="1456373928649" STYLE="bubble" TEXT="cause10:"/>
</node>
</node>
<node BACKGROUND_COLOR="#ff9966" CREATED="1436865392235" HGAP="238" ID="ID_1420432098" MODIFIED="1456380960447" POSITION="left" TEXT="Other-check()" VSHIFT="-74">
<node BACKGROUND_COLOR="#0000ff" CREATED="1436865819488" FOLDED="true" HGAP="106" ID="ID_1524871668" MODIFIED="1456380967920" STYLE="fork" TEXT="possible causes" VSHIFT="-49">
<edge COLOR="#808080" STYLE="bezier" WIDTH="thin"/>
<node CREATED="1436886842794" ID="ID_1221883271" MODIFIED="1456379584485" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      causes like known bugs using the text pattern matching from log messages to per performed here. if log messages are not matching our rediscovery repository then create a knowledge file
    </p>
    <p>
      The process pid file present can help get the starting point for cutting logs
    </p>
    <p>
      
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
</node>
<node BACKGROUND_COLOR="#ff9966" CREATED="1436886714353" HGAP="-85" ID="ID_1199702503" MODIFIED="1456376583361" POSITION="right" TEXT="FS-check()" VSHIFT="-113">
<node BACKGROUND_COLOR="#0000ff" CREATED="1436886738159" FOLDED="true" HGAP="26" ID="ID_1416226865" MODIFIED="1456379705449" TEXT="possible causes" VSHIFT="16">
<node CREATED="1436886842794" ID="ID_1861256416" MODIFIED="1456379668550" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      causes: Use below list to make a causes check-list for FS issues
    </p>
    <p>
      
    </p>
    <p>
      a) do specific check with cluvfy comp software -n &lt;node_list&gt; -d &lt;oracle_home&gt;
    </p>
    <p>
      &#160;&#160;&#160;here -d options make parameterised incase we need to use this check for DB home as well at later point in time
    </p>
    <p>
      
    </p>
    <p>
      b) use comparison with&#160;&lt;gi_home&gt;/crs/sbs/crsconfig_fileperms.sbs &amp; crsconfig_dirs.sbs
    </p>
    <p>
      
    </p>
    <p>
      c) check running few bin / executable with -v to know they are executing fine from there path location
    </p>
    <p>
      
    </p>
    <p>
      d)&#160;&#160;touch file in log dir to know if it allows wriitng as crs user
    </p>
    <p>
      
    </p>
    <p>
      e) use opatch meta files to get patch list for comparing across nodes
    </p>
    <p>
      
    </p>
    <p>
      f) check free space available in crs_home
    </p>
    <p>
      
    </p>
    <p>
      g) get latest modified files across nodes to know if any restore/patching of bin was performed recently
    </p>
    <p>
      
    </p>
    <p>
      h) perform orccheck both -local and -config, gpnptool get, gpnptool find -h=&lt;remote_node&gt;, ocrconfig -showbackup to validate health in comparison to remote nodes
    </p>
    <p>
      
    </p>
    <p>
      i) check grep '#define' &lt;grid_home&gt;/rdbms/lib/config.c across nodes
    </p>
    <p>
      
    </p>
    <p>
      j) check ls -ltr&#160;&#160;&lt;gi_home&gt;/bin/oracle* to know previous relink date-time, size for oracleO
    </p>
    <p>
      
    </p>
    <p>
      k) check health of /etc/oracle/scls_scr dir and contents
    </p>
    <p>
      
    </p>
    <p>
      l) check health of dir and socket files under /var/tmp/.oracle /tmp/.oracle
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
</node>
<node COLOR="#ff3333" CREATED="1456379778506" FOLDED="true" HGAP="15" ID="ID_246341545" MODIFIED="1456380976737" POSITION="left" STYLE="bubble" VSHIFT="-206">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      cluster_discovery_metadata()
    </p>
  </body>
</html>
</richcontent>
<node CREATED="1456380825003" ID="ID_332042290" MODIFIED="1456380898660" STYLE="bubble">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      It has two parts a &amp; b:
    </p>
    <p>
      
    </p>
    <p>
      a) Discovery part :
    </p>
    <p>
      
    </p>
    <p>
      - discover/learn about the broken node using crsconfig_params
    </p>
    <p>
      - perform quick parity check to validate correctness of&#160;&#160;content from crsconfig_params with the OS and gpnp profile
    </p>
    <p>
      &#160;&#160;eg. check if&#160;&#160;hostname, files path/location, devices, networks interface and ip are still valid or not
    </p>
    <p>
      
    </p>
    <p>
      - dscover the peer nodes
    </p>
    <p>
      - discover health of peer nodes
    </p>
    <p>
      
    </p>
    <p>
      b) Metadata part :
    </p>
    <p>
      
    </p>
    <p>
      - post discovery and succssful validation write a metadata file for use by our diferent check() modules (disk,net,fs,config,others)
    </p>
    <p>
      
    </p>
  </body>
</html>
</richcontent>
</node>
</node>
</node>
</map>
