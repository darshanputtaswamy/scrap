
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
   -config              Run ${program_name} to check only cluster configuration.
   -disk                Run ${program_name} to check only cluster Storage setup.
   -net                 Run ${program_name} to check only cluster Network setup.
   -knownbug            Run ${program_name} to check only known Startup bugs.
   -fs                  Run ${program_name} to check only cluster filesystem setup.
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
  SOURCE=$SCRIPTPATH/src

  INPUTDIR=${WRKDIR}/.input_${timestamp}
  OUTPUTDIR_VAR=$program_name
  OUTPUTDIR=$WRKDIR/${OUTPUTDIR_VAR}_${timestamp}

  WATCHDOG=$INPUTDIR/watchdog.sh
  HOSTLIST=$INPUTDIR/o_host_list.out
  MASTERFIL=$INPUTDIR/raccheck_env.out


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
