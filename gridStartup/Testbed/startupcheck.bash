

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


WRKDIR=$(cd -P -- "$(dirname -- "$0")" && printf '%s\n' "$(pwd -P)")


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

check_wrkdir;