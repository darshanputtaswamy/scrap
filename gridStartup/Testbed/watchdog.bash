

  
 #following code is to generate watcher script

 if [ ! -d RTEMPDIR ] then mkdir ./.watchdog/; RTEMPDIR=./.watchdog/ fi
 
  WATCHDOG=$RTEMPDIR/watchdog.sh
  LOGFIL=$RTEMPDIR/watchdog.log
  
	watchdog_wakeup=450
	wakeup_count=1
		
  
  
  echo -e "watchdog_wakeup=$watchdog_wakeup ">>$LOGFIL
  #watchlogdate=$(date '+%a %b %d %H:%M:%S %Y')
  touch $RTEMPDIR/nowatch.pid

  echo "#!$bash_scr" > $WATCHDOG  
  echo "watchdog_wakeup=$watchdog_wakeup">>$WATCHDOG
  echo "wakeup_count=1">>$WATCHDOG
  echo "watchdog_long_wakeup=1">>$WATCHDOG
  echo "ppid=$$">>$WATCHDOG
  echo "mypid=\$\$">>$WATCHDOG
  echo "function killtree() {" >> $WATCHDOG #http://stackoverflow.com/questions/392022/best-way-to-kill-all-child-processes
  echo "  local _pid=\$1" >> $WATCHDOG
  echo "  local _sig=\${2-TERM}" >> $WATCHDOG
  echo "  kill -stop \${_pid}" >> $WATCHDOG
  #echo "  for _child in \$(ps -o pid --no-headers --ppid \${_pid}); do " >> $WATCHDOG
  echo "  for _child in \$(ps -ef |awk '\$3 == '\${_pid}' {print \$2}'); do " >> $WATCHDOG
  echo "    killtree \${_child} \${_sig}" >> $WATCHDOG
  echo "  done" >>$WATCHDOG
  echo "  kill -\${_sig} \${_pid}" >> $WATCHDOG
  echo "}" >> $WATCHDOG
  echo "echo \"\`date '+%a %b %d %H:%M:%S %Y'\` started watcher\" >$WATCHLOG">>$WATCHDOG
  #echo "echo \" mypid=\$mypid\"">>$WATCHDOG
  #echo "echo \"Process id of gracrx is \$ppid and log file is $WATCHLOG\"">>$WATCHDOG     
  echo "while [ 1 ]">>$WATCHDOG
  echo "do">>$WATCHDOG
  
  #echo "  lpid=\$(ps -p \$ppid|grep -v PID|awk '{print \$1}')">>$WATCHDOG
  ps -o pid >/dev/null 2>&1
  ps_o_ret=$?
  if [[ -n "$ps_o_ret" && $ps_o_ret -eq 0 ]] ; then
    echo "  lpid=\$(ps -o pid -p \$ppid|grep -v PID)">>$WATCHDOG
  else
    echo "  lpid=\$(ps -f -p  \$ppid|grep -v PID | awk '{print \$2}')">>$WATCHDOG
  fi
  echo "  if [ -z \$lpid ]">>$WATCHDOG
  echo "  then">>$WATCHDOG
  #echo "      echo -e \"Darwin is not running\\nexiting...\">>$WATCHLOG">>$WATCHDOG 
  
  echo "      for inputrmfile in \$(ls $INPUTDIR/* >/dev/null 2>&1|grep -v watchdog.sh)">>$WATCHDOG 
  echo "      do">>$WATCHDOG 
  
  echo "        rm -f \$inputrmfile >/dev/null 2>&1">>$WATCHDOG 
  echo "      done">>$WATCHDOG 
  echo "      exit 0">>$WATCHDOG
  
  echo "  else">>$WATCHDOG
  #echo "     if [[ -n \"\$opid\"  && \$opid -gt 1 ]]">>$WATCHDOG
  
  echo "     if [ -n \"\$opid\" ]">>$WATCHDOG
  echo "     then">>$WATCHDOG
  
  echo "     if [ \`echo \$opid|wc -w\` -gt 1 ];then opid=\$(echo \$opid|awk '{print \$1}');fi">>$WATCHDOG
  
  #echo "         spid=\$(ps -o pid -p \$opid >>$WATCHLOG 2>/dev/null|grep -v PID|sed 's/^ *\(.*\) *$/\1/')">>$WATCHDOG
  
  if [[ -n "$ps_o_ret" && $ps_o_ret -eq 0 ]] ; then
  
  echo "         spid=\$(ps -o pid -p \$opid|grep -v PID |sed 's/^ *\(.*\) *$/\1/')">>$WATCHDOG

  else

  echo "         spid=\$(ps -f -p \$opid|grep -v PID |  awk '{print \$2}' | sed 's/^ *\(.*\) *$/\1/')">>$WATCHDOG
  fi
  echo "         if [[ -n \"\$spid\" && \"\$spid\" -eq \"\$opid\" && \`grep -wc \"\$spid\" $RTEMPDIR/nowatch.pid 2>/dev/null\` -eq 0 ]] && [[ -n \"\$spid\" && \"\$spid\" -eq \"\$opid\" && \`grep -wc \"\$spid\" $TMPDIR/.initdaemon.pid 2>/dev/null\` -eq 0 ]] ">>$WATCHDOG
  echo "         then">>$WATCHDOG
  #echo "             scmd=\$(ps -ef|grep \$opid|grep -v grep|awk ' { print \$8 }')">>$WATCHDOG
  echo "             echo \"\`date '+%a %b %d %H:%M:%S %Y'\` candidate pid opid=\$opid still found as spid=\$spid\">>$WATCHLOG">>$WATCHDOG
  echo "             for cpid in \$(ps -ef |awk '\$3 == '\${spid}' {print \$2}') ">>$WATCHDOG        
  echo "             do">>$WATCHDOG
  echo "               if [[ \`grep -wc \"\$cpid\" $RTEMPDIR/nowatch.pid 2>/dev/null\` -eq 0 ]] && [[ \`grep -wc \"\$cpid\" $TMPDIR/.initdaemon.pid 2>/dev/null\` -eq 0 ]]">>$WATCHDOG
  echo "               then">>$WATCHDOG
  echo "                  if [ \"$(/bin/uname -s)\" = \"Linux\" ]">>$WATCHDOG
  echo "                  then">>$WATCHDOG
  echo "                      scmd=\$(ps -o command -p \$opid |grep -v COMMAND)">>$WATCHDOG
  echo "                      ccmd=\$(ps -o command -p \$cpid |grep -v COMMAND)">>$WATCHDOG
  echo "                  fi">>$WATCHDOG
  echo "                  echo \"\`date '+%a %b %d %H:%M:%S %Y'\` Stuck child pid \$cpid  of parent \$spid\">>$WATCHLOG">>$WATCHDOG
  echo "                  echo \"\`date '+%a %b %d %H:%M:%S %Y'\` Stuck child command is \$ccmd\">>$WATCHLOG">>$WATCHDOG
  echo "                  killtree \$cpid 9 >>$WATCHLOG 2>&1">>$WATCHDOG
  echo "               fi">>$WATCHDOG
  echo "             done">>$WATCHDOG
  echo "             echo \"\`date '+%a %b %d %H:%M:%S %Y'\` killing stuck command \$scmd . Operating system process ID \$opid \">>$WATCHLOG">>$WATCHDOG
  echo "             kill -9 \$spid >>$WATCHLOG 2>&1">>$WATCHDOG
  echo "         fi">>$WATCHDOG
  echo "     fi">>$WATCHDOG
  echo "  fi">>$WATCHDOG
  echo "  if [ -e $WATCHLOG ];then  echo \"\`date '+%a %b %d %H:%M:%S %Y'\` running watcher \$wakeup_count \" >>$WATCHLOG;fi">>$WATCHDOG
  echo "  wakeup_count=\`expr \$wakeup_count + 1\`">>$WATCHDOG  
  #echo "  for opid in \`ps -ef|grep -v \"watchdog.sh\"| awk '\$3 == '\${ppid}' { print \$2 }'\`">>$WATCHDOG
  #echo "  opid=\$(ps -ef|grep -v \${mypid}|grep -v sleep |grep -v compute| awk '\$3 == '\${ppid}' { print \$2 }')">>$WATCHDOG
   echo "  opid_long=\"\";opid=\"\";for oop in \$(ps -ef|grep -v \${mypid}|grep -v sleep |grep -v compute| awk '\$3 == '\${ppid}' { print \$2 }'); do if [[ \`grep -wc \"\$oop\" $RTEMPDIR/nowatch.pid 2>/dev/null\` -eq "0" ]] && [[ \`grep -wc \"\$oop\" $TMPDIR/.initdaemon.pid 2>/dev/null\` -eq "0" ]]; then opid=\"\$opid \$oop\"; if [ -z \"\$opid_long\" ] ; then opid_long=\$oop; fi; fi; done">>$WATCHDOG
  #echo "  opid_long=\$(ps -ef|grep -v \${mypid}|grep -v sleep |grep -v compute | awk '\$3 == '\${ppid}' { print \$2 }'|head -1)">>$WATCHDOG
  echo "                  if [ \"$(/bin/uname -s)\" = \"Linux\" ]">>$WATCHDOG
  echo "                  then">>$WATCHDOG
  echo "  if [ -n \"\$opid\" ]; then ocomm_name=\$( ps -p \$opid_long -o command 2>/dev/null|grep -vi command|awk -F/ '{print \$NF}');fi">>$WATCHDOG
  echo "                  else">>$WATCHDOG
  echo "  if [ -n \"\$opid\" ]; then ocomm_name=\$( ps -ef |awk '\$2 == '\${opid_long}' {print \$0}');fi">>$WATCHDOG
  echo "                  fi">>$WATCHDOG
  #echo "  echo ocomm_name=\$ocomm_name">>$WATCHDOG
  echo "  if [ -e $WATCHLOG ]; then echo \"\`date '+%a %b %d %H:%M:%S %Y'\` candidate child pid for killing is \$opid - \$ocomm_name \" >>$WATCHLOG;fi">>$WATCHDOG
  #echo "  do">>$WATCHDOG 
  #echo "     opid=\$opid">>$WATCHDOG
  #echo "  done">>$WATCHDOG
  
  echo "  found_raccheck_sql=\$(echo \$ocomm_name|grep -c \"exec_raccheck_sqls\")">>$WATCHDOG
  
  echo "  found_raccheck_root=\$(echo \$ocomm_name|grep -c \"root_${program_name}\")">>$WATCHDOG
  
  echo "  found_raccheck_cells=\$(echo \$ocomm_name|grep -c \"${program_name}_cells\")">>$WATCHDOG
  
  echo "  found_raccheck_root_samepassword=\$(echo \$ocomm_name|grep -c \"expect -f\")">>$WATCHDOG
  
  echo "  if [ -e \"$ROOT_LCKFIL\" ]; then found_raccheck_root=1;fi">>$WATCHDOG
  
  echo "  if [[ -n \"\$found_raccheck_sql\" && \$found_raccheck_sql -ge 1 && \$watchdog_long_wakeup -eq 1 ]]">>$WATCHDOG
  echo "  then">>$WATCHDOG
  #echo "      watchdog_long_wakeup=0">>$WATCHDOG
  #echo "      echo \$watchdog_wakeup_sql">>$WATCHDOG
  echo "if [ -e $WATCHLOG ]; then echo \"\`date '+%a %b %d %H:%M:%S %Y'\` watcher sleeping for \$watchdog_wakeup_sql seconds \" >>$WATCHLOG;fi">>$WATCHDOG
  echo "       sleep \$watchdog_wakeup_sql">>$WATCHDOG
  #echo "  elif [[ \$watchdog_long_wakeup -eq 1 && \$watchdog_dbm_root -eq 1 ]] && [[ -n \"\$found_raccheck_root\" && \$found_raccheck_root -ge 1 || -n \"\$found_raccheck_root_samepassword\" && \$found_raccheck_root_samepassword -ge 1 ]]">>$WATCHDOG
  echo "  elif [[ -n \"\$found_raccheck_root\" && \$found_raccheck_root -ge 1 || -n \"\$found_raccheck_root_samepassword\" && \$found_raccheck_root_samepassword -ge 1 || -n \"\$found_raccheck_cells\" && \$found_raccheck_cells -ge 1 ]]">>$WATCHDOG
  
  echo "  then">>$WATCHDOG
  #echo "      watchdog_long_wakeup=0">>$WATCHDOG
  #echo "      echo \$watchdog_wakeup_root">>$WATCHDOG
  echo " if [ -e $WATCHLOG ]; then echo \"\`date '+%a %b %d %H:%M:%S %Y'\` watcher sleeping for \$watchdog_wakeup_root seconds \" >>$WATCHLOG;fi">>$WATCHDOG
  
  echo "      sleep \$watchdog_wakeup_root">>$WATCHDOG
  
  
  echo "  else">>$WATCHDOG
  
  #echo "      echo \$watchdog_wakeup">>$WATCHDOG
  
  echo " if [ -e $WATCHLOG ]; then echo \"\`date '+%a %b %d %H:%M:%S %Y'\` watcher sleeping for \$watchdog_wakeup seconds \" >>$WATCHLOG;fi">>$WATCHDOG
  
  echo "      sleep \$watchdog_wakeup">>$WATCHDOG
  
  echo "  fi">>$WATCHDOG
  echo "done">>$WATCHDOG
  
  $WATCHDOG &
  watchdog_pid=$! 

