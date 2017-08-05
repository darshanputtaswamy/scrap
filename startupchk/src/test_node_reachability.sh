#!/bin/bash

  #Calling Format: test_node_reachability ["hostname"]  
  nodename=$1;
  tempfile=$2;
  logfile=$3
  el_node_ping=0
  platform=`uname -s`
  tnr_note=""

  localhost=$(hostname|cut -d"." -f1)
  if [[ "$nodename" != "$localhost" ]]; then
    nodetype="REMOTEHOST"
  else
    nodetype="LOCALHOST"
  fi


  PING_W_FLAG=""
  if [ $platform = "Linux" ]
  then
    PING="/bin/ping"
    PING_W_FLAG="-w 5"
  else
    PING="/usr/sbin/ping"
  fi

 #First Validation: Pingable or not
 #-------------------------------------------------------
  if [ $platform = "SunOS" ]; then
      $PING -s $nodename 5 5 >/dev/null 2>&1
  elif [ $platform = "HP-UX" ]; then
      $PING $nodename -n 5 -m 5 >/dev/null 2>&1
  else
      $PING -c 1 $PING_W_FLAG $nodename >/dev/null 2>&1
  fi
  #ping -c 1 $nodename >/dev/null 2>&1
  if [ $? -eq "0" ]; then 
    el_node_ping=1;
    echo "V|REACHED|HOSTNAME|$nodetype|$nodename" >> $tempfile

  else
  
    tnr_log=`$PING -c 1 $PING_W_FLAG $nodename 2>&1 | tr -d '\r'`
    tnr_log=`echo -e "$tnr_log \n ${host_type} ${nodename} is not reachable so its being skipped from checking best practicing."`
    tnr_note="Node is not reachable"
     echo "I|SKIPPED|HOSTNAME|$nodetype|$nodename" >> $tempfile
  fi


  if [[ -n $nodename_ip && $el_node_ping -eq "0" ]]; then 
    nodename="$nodename_ip"
    test_node_reachability  "$nodename" "$tuser" "" "$host_type"
    if [[ "$host_type" = 'Infiniband switch'  && $el_node_ping -eq "1" ]]; then switchname=$nodename; fi
  else
    if [ -e $LOGFIL ]; then echo "$tnr_log" >> $logfile ; fi
  fi
  
