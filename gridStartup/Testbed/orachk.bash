
#!/bin/env bash


GREEN="\033[1;32;40m"
#ORANGE="\033[33;40m"
ORANGE="\033[33;44m"
#RED="\033[1;31;40m"
RED="\033[1;37;41m"
#BLUE="\033[1;34;40m"
BLUE="\033[1;30;46m"
CYAN="\033[1;36;40m"
NORM="\033[0m"
BOLD="\033[1m"
#BLINK="\033[5m"
GREEN="\033[1;32;40m"
ORANGE="\033[33;40m"
RED="\033[1;31;40m"
BLUE="\033[1;34;40m"


usage()
{
cat << EOF
usage: ${program_name} options

This script checks and validates various subsystem underlining you cluster environment.


OPTIONS:
   -help                Show this message
   -debug               Run ${program_name} in debug mode. Debug log will be generated.
   -config              Run ${program_name} to check for posible startup failure due to cluster configuration.
   -disk                Run ${program_name} to check for posible startup failure due to cluster Storage setup.
   -net                 Run ${program_name} to check for posible startup failure due to cluster Network setup.
   -knownbug            Run ${program_name} to check for posible startup failure due to known Startup bugs.
   -fs                  Run ${program_name} to check for posible startup failure due to cluster filesystem setup.
EOF

}

function check_wrkdir ()
{
  touch ${WRKDIR}/$$.touched >/dev/null 2>&1
  if [ $? -ne "0" ] ; then
    # $WRKDIR is not writable
    echo;
    echo -e "${RED}${WRKDIR} is not writable. Please set the STARTUPCHECK_OUTPUT and run again.";
    echo -e "${NORM}"
    echo "ex: export STARTUPCHECK_OUTPUT=<writable directory> "
    echo;
    echo;
    exit 1;
  fi
  rm -f ${WRKDIR}/$$.touched >/dev/null 2>&1
}

initialize ()
{

  export SCRIPT_DEBUG="$STARTUPCHK_DEBUG"

  if [[ ! -z $SCRIPT_DEBUG ]]
  then
    SCRIPT_DEBUG_FLG="set -x";
    set -x
    PS4='$(date "+ $LINENO: + ")'
         debugFileName=$(echo ${program_name}_debug_${timestamp}.log)

          if [[ -n $STARTUPCHECK_OUTPUT ]]; then
                debugFileName=${STARTUPCHECK_OUTPUT}/${debugFileName}
      fi

  fi

        bash_found=$(which bash >/dev/null 2>&1;echo $?)

  if [ $bash_found -ne 0 ]
  then
    echo -e "\n${RED}${program_name} requires the BASH shell. Please install bash and try again.${NORM}\n"
    exit 1;
  fi

  V_PWD=$(cd -P -- "$(dirname -- "$0")" && printf '%s\n' "$(pwd -P)")
  SCRIPTPATH=$V_PWD
  WRKDIR=$SCRIPTPATH


  #following check is to have output directory created at some diffrent local other than where we run check from.
  if [ -z $STARTUPCHECK_OUTPUT ]; then WRKDIR=$WRKDIR; else WRKDIR=$STARTUPCHECK_OUTPUT; fi;

  check_wrkdir

  PROFILE=$SCRIPTPATH/profile.dat
  SOURCE==$SCRIPTPATH/src

  INPUTDIR=${WRKDIR}/.input_${timestamp}
  OUTPUTDIR_VAR=$program_name
  OUTPUTDIR=$WRKDIR/${OUTPUTDIR_VAR}_${timestamp}

  WATCHDOG=$INPUTDIR/watchdog.sh
  HOSTLIST=$INPUTDIR/o_host_list.out
  MASTERFIL=$INPUTDIR/raccheck_env.out
  RTEMPDIR=$INPUTDIR

  SREPFIL=$OUTPUTDIR/${program_name}_summary.rep
  WATCHLOG=$OUTPUTDIR/watchdog.log


}


timestamp=$(date '+%Y%m%d_%H%M%S')
program_name=$(echo $(basename $0)|sed 's/[\.\/]//g')


STARTUPCHK_CONFIG=0
STARTUPCHK_DISK=0
STARTUPCHK_NET=0
STARTUPCHK_KNOWNBUG=0
STARTUPCHK_FS=0

all_check=1


for arg in "$@"
do
  remove_arg=0

  case $arg in
  "-config")
    STARTUPCHK_CONFIG=1
#    echo "using config option"
    read_p2r="$arg"
    all_check=0;
    ;;
  "-debug")
    STARTUPCHK_DEBUG=1
#    echo "using debug option"
    read_p2r="$arg"
    ;;
  "-disk")
    STARTUPCHK_DISK=1
#    echo "using disk option"
        all_check=0;
    read_p2r="$arg"
    ;;
  "-net")
    STARTUPCHK_NET=1
#    echo "using net option"
        all_check=0;
    read_p2r="$arg"
    ;;
  "-knownbug")
    STARTUPCHK_KNOWNBUG=1
#    echo "using net option"
        all_check=0;
    read_p2r="$arg"
    ;;
  "-help"|"-h")
    usage
        exit 1
    ;;
   "-fs")
   STARTUPCHK_FS=1
   all_check=0;
   read_p2r="$arg"
    ;;
  "")
    read_p2r="none"
    ;;
  *)
    usage
    exit 1
    ;;
  esac
done


if [[  $all_check -eq 1 ]]
then
                STARTUPCHK_CONFIG=1
                STARTUPCHK_DISK=1
                STARTUPCHK_NET=1
                STARTUPCHK_KNOWNBUG=1
                STARTUPCHK_FS=1
fi

if [[ $STARTUPCHK_DEBUG -eq 1 ]]
then
echo "CONIFG $STARTUPCHK_CONFIG"
echo "DISK $STARTUPCHK_DISK"
echo "NET $STARTUPCHK_NET"
echo "KNOWNBUGS $STARTUPCHK_KNOWNBUG"
echo "FS $STARTUPCHK_FS"
fi


initialize


  RAT_TIMEOUT=1000
  watchdog_wakeup=60
  wakeup_count=1
 

  echo -e "RAT_TIMEOUT=$RAT_TIMEOUT watchdog_wakeup=$watchdog_wakeup ">>$WATCHLOG
  
  echo "#!/bin/env bash" > $WATCHDOG
  echo "watchdog_wakeup=$watchdog_wakeup">>$WATCHDOG
  echo "wakeup_count=1">>$WATCHDOG
  echo "ppid=$$">>$WATCHDOG
  echo "mypid=\$\$">>$WATCHDOG

  echo "function killtree() {" >> $WATCHDOG #http://stackoverflow.com/questions/392022/best-way-to-kill-all-child-processes
  echo "  local _pid=\$1" >> $WATCHDOG
  echo "  local _sig=\${6-TERM}" >> $WATCHDOG
  echo "  kill -stop \${_pid}" >> $WATCHDOG
  echo "  for _child in \$(ps -ef |awk '\$3 == '\${_pid}' {print \$2}'); do " >> $WATCHDOG
  echo "    killtree \${_child} \${_sig}" >> $WATCHDOG
  echo "  done" >>$WATCHDOG
  echo "  kill -\${_sig} \${_pid}" >> $WATCHDOG
  echo "}" >> $WATCHDOG


  echo "echo \"\`date '+%a %b %d %H:%M:%S %Y'\` started watcher\" >$WATCHLOG">>$WATCHDOG

  echo "while [ 1 ]">>$WATCHDOG
  echo "do">>$WATCHDOG

  ps -o pid >/dev/null 2>&1

  ps_o_ret=$?

  if [[ -n "$ps_o_ret" && $ps_o_ret -eq 0 ]] ; then
    echo "  lpid=\$(ps -o pid -p \$ppid|grep -v PID)">>$WATCHDOG
  else
    echo "  lpid=\$(ps -f -p  \$ppid|grep -v PID | awk '{print \$2}')">>$WATCHDOG
  fi
  echo "  if [ -z \$lpid ]">>$WATCHDOG
  echo "  then">>$WATCHDOG


  echo "      for inputrmfile in \$(ls $INPUTDIR/* >/dev/null 2>&1|grep -v watchdog.sh)">>$WATCHDOG
  echo "      do">>$WATCHDOG
  echo "        rm -f \$inputrmfile >/dev/null 2>&1">>$WATCHDOG
  echo "      done">>$WATCHDOG
  echo "      exit 0">>$WATCHDOG
  echo "  else">>$WATCHDOG

  echo "     if [ -n \"\$opid\" ]">>$WATCHDOG
  echo "     then">>$WATCHDOG

  echo "     if [ \`echo \$opid|wc -w\` -gt 1 ];then opid=\$(echo \$opid|awk '{print \$1}');fi">>$WATCHDOG


  if [[ -n "$ps_o_ret" && $ps_o_ret -eq 0 ]] ; then
    echo "         spid=\$(ps -o pid -p \$opid|grep -v PID |sed 's/^ *\(.*\) *$/\1/')">>$WATCHDOG
  else
    echo "         spid=\$(ps -f -p \$opid|grep -v PID |  awk '{print \$2}' | sed 's/^ *\(.*\) *$/\1/')">>$WATCHDOG
  fi
  echo "         if [[ -n \"\$spid\" && \"\$spid\" -eq \"\$opid\" && \`grep -wc \"\$spid\" $RTEMPDIR/nowatch.pid 2>/dev/null\` -eq 0 ]] && [[ -n \"\$spid\" && \"\$spid\" -eq \"\$opid\" && \`grep -wc \"\$spid\" $TMPDIR/.initdaemon.pid 2>/dev/null\` -eq 0 ]] ">>$WATCHDOG
  echo "         then">>$WATCHDOG

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

   echo "  opid_long=\"\";opid=\"\";for oop in \$(ps -ef|grep -v \${mypid}|grep -v sleep |grep -v compute| awk '\$3 == '\${ppid}' { print \$2 }'); do if [[ \`grep -wc \"\$oop\" $RTEMPDIR/nowatch.pid 2>/dev/null\` -eq "0" ]] && [[ \`grep -wc \"\$oop\" $TMPDIR/.initdaemon.pid 2>/dev/null\` -eq "0" ]]; then opid=\"\$opid \$oop\"; if [ -z \"\$opid_long\" ] ; then opid_long=\$oop; fi; fi; done">>$WATCHDOG
  echo "                  if [ \"$(/bin/uname -s)\" = \"Linux\" ]">>$WATCHDOG
  echo "                  then">>$WATCHDOG
  echo "  if [ -n \"\$opid\" ]; then ocomm_name=\$( ps -p \$opid_long -o command 2>/dev/null|grep -vi command|awk -F/ '{print \$NF}');fi">>$WATCHDOG
  echo "                  else">>$WATCHDOG
  echo "  if [ -n \"\$opid\" ]; then ocomm_name=\$( ps -ef |awk '\$2 == '\${opid_long}' {print \$0}');fi">>$WATCHDOG
  echo "                  fi">>$WATCHDOG

  echo "  if [ -e $WATCHLOG ]; then echo \"\`date '+%a %b %d %H:%M:%S %Y'\` candidate child pid for killing is \$opid - \$ocomm_name \" >>$WATCHLOG;fi">>$WATCHDOG

  echo " if [ -e $WATCHLOG ]; then echo \"\`date '+%a %b %d %H:%M:%S %Y'\` watcher sleeping for \$watchdog_wakeup seconds \" >>$WATCHLOG;fi">>$WATCHDOG
  echo "      sleep \$watchdog_wakeup">>$WATCHDOG
  echo "done">>$WATCHDOG

$WATCHDOG &

watchdog_pid=$!

./sample.sh 

echo "sample 1 is running"

./sample.sh 

echo "sample 2 is running"
./sample.sh 

echo "sample 3 is running"


kill -9 $watchdog_pid
