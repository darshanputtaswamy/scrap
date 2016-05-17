#!/bin/bash

CYAN="\033[1;36;40m"
NORM="\033[0m"
BOLD="\033[1m"
GREEN="\033[1;32;40m"
ORANGE="\033[33;40m"
RED="\033[1;31;40m"
BLUE="\033[1;34;40m"

SCRIPT_NUM="7ca444a1f147034b602efebd86c53f14"
SCRIPT_NAME="CRS AUTOCONFIG"
SCRIPT_TYPE="CONFIG"
SCRIPT_MESSAGE=""
SCRIPT_LOG=$1
SCRIPT_HTML=$2
SCRIPT_TEMP=$3
SCRIPT_INPUT=$4


###############################################################################################################


Softwareowner=$(cat $SCRIPT_INPUT/raccheck_env.out | grep "ORACLEOWNER"| cut -d\| -f3)
Hostname=$(hostname | tr "[A-Z]" "[a-z]" |cut -d. -f1|tr -d '\r')

echo "\n CRS AUTOCONFIG \t"
	
	if [[ -f "/etc/oracle/scls_scr/$Hostname/root/ohasdstr" ]]; then
	
			`grep enable /etc/oracle/scls_scr/$Hostname/root/ohasdstr`
						
					if [[ $? == 0 ]] ; then
					
						  echo -e "${GREEN}.ENABLED.${NORM}\n" 
						  RESULT="ENABLED"
						  RESULT_TYPE="PASSED"
					else
					      echo -e "${GREEN}.DISABLED.${NORM}\n"
						  RESULT="DISABLED"
						  RESULT_TYPE="WARNING"
					fi
					
	elif [[ -f "/etc/oracle/scls_scr/$Hostname/$Softwareowner/ohasdstr"  ]] ; then
	 
	      `grep enable /etc/oracle/scls_scr/$Hostname/$Softwareowner/ohasdstr`
						
        			if [[ $? == 0 ]] ; then
					
						   echo -e "${GREEN}.ENABLED.${NORM}\n"
					       RESULT="ENABLED"
						   RESULT_TYPE="PASSED"
					else
						   echo -e "${GREEN}.DISABLED.${NORM}\n"
					       RESULT="DISABLED"
						   RESULT_TYPE="WARNING"
					fi

	else
		
	      echo -e "${RED}.FILE DOES NOT EXITS !!!.${NORM}\n"
	      RESULT="FILE DOES NOT EXITS !!!"
	      RESULT_TYPE="FAIL"
	fi		
	

	
################################################################################################################
#SUMMARY HTML
#if [[ $RESULT_TYPE == "FAIL"]] ; then
#<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:red>$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="\#SCRIPT_NUM_details">View</a></td></tr>
#elif [[$RESULT_TYPE == "WARNING" ]] ; then
##<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:blue >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="\#SCRIPT_NUM_details">View</a></td></tr>
#else
###<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:green >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#SCRIPT_NUM_details">View</a></td></tr>


#fi
SCRIPT_NAME="CRS AUTOCONFIG"
SCRIPT_TYPE="CONFIG"

if [[ $RESULT_TYPE == "FAIL" ]] ; then

echo "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:red>$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="\#SCRIPT_NUM_details">View</a></td></tr>"
   >>  $SCRIPT_TEMP
elif [[$RESULT_TYPE == "WARNING" ]] ; then
echo "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:blue >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="\#SCRIPT_NUM_details">View</a></td></tr>"
   >>  $SCRIPT_TEMP
else
echo  "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:green >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="\#SCRIPT_NUM_details">View</a></td></tr>"
   >>  $SCRIPT_TEMP
fi


################################################################################################################
#DETAIL HTML

cat > $SCRIPT_HTML/$SCRIPT_NUM.part.html << _EOF_

<br>
<table>
<tr>
<a name="SCRIPT_NUM_details"></a>
<a href="#ASSESSMENT_Summary" class="a_bgw">Top</a><br>
<h3>$SCRIPT_NAME</h3>

<td scope="row">Requirement</td><td scope="row"><pre> $MESSAGE_ ELOBARATION THE REQUIREMENT </pre></td></tr>


<tr ><td>$SCRIPT_NAME</td><td class="check-name">$EXPECTED</td><tr>
<tr><td>$HOSTNAME</td><td>$FOUND</td> <td style=background-color:red>$RESULT_TYPE</td></tr>


</table>
<br>

_EOF_















