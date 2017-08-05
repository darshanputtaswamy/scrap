#!/bin/bash

CYAN="\033[1;36;40m"
NORM="\033[0m"
BOLD="\033[1m"
GREEN="\033[1;32;40m"
ORANGE="\033[33;40m"
RED="\033[1;31;40m"
BLUE="\033[1;34;40m"

SCRIPT_NUM="7ca444a1f147034b602efebd86c53f14"
SCRIPT_NAME="CRS Autoconifg Check"
SCRIPT_TYPE="Configuration"
SCRIPT_MESSAGE=""

SCRIPT_LOG=$1                   ###SCRIPT_LOG Directory location .
SCRIPT_HTML=$2                  ###SCRIPT_HTML Directory Location .
SCRIPT_TEMP=$3                  ###SCRIPT_Summary File
SCRIPT_INPUT=$4                 ###SCRIPT_INPUT Directory Location


###############################################################################################################


Softwareowner=$(cat $SCRIPT_INPUT/raccheck_env.out | grep "ORACLEOWNER"| cut -d\| -f3)
Hostname=$(hostname | tr "[A-Z]" "[a-z]" |cut -d. -f1|tr -d '\r')

echo -e "CRS Autoconfig check "
echo ""  | tee $SCRIPT_LOG/tempcommandline

EXPECTED="enable"
        if [[ -f "/etc/oracle/scls_scr/$Hostname/root/ohasdstr" ]]; then

                        echo "cat /etc/oracle/scls_scr/$Hostname/root/ohastr" >> $SCRIPT_LOG/tempcommandline
                        TMP=`cat /etc/oracle/scls_scr/$Hostname/root/ohasdstr`
                        echo "$TMP" >> $SCRIPT_LOG/tempcommandline

                                        if [[ $TMP == "enable" ]] ; then

                                                  echo -e "\t\t${GREEN}ENABLED${NORM}\n"
                                                  RESULT="ENABLED"
                                                  RESULT_TYPE="PASS"
                                        else
                                              echo -e "\t\t${BLUE}DISABLED${NORM}\n"
                                                  RESULT="DISABLED"
                                                  RESULT_TYPE="WARNING"
                                        fi

        elif [[ -f "/etc/oracle/scls_scr/$Hostname/$Softwareowner/ohasdstr"  ]] ; then

                        echo "cat /etc/oracle/scls_scr/$Hostname/$Softwareowner/ohasdstr" >>  $SCRIPT_LOG/tempcommandline
                        TMP=`cat /etc/oracle/scls_scr/$Hostname/$Softwareowner/ohasdstr`
                         echo "$TMP" >> $SCRIPT_LOG/tempcommandline

                                if [[ $TMP == "enable" ]] ; then

                                                   echo -e "\t\t${GREEN}ENABLED${NORM}\n"
                                               RESULT="ENABLED"
                                                   RESULT_TYPE="PASS"
                                        else
                                                   echo -e "\t\t${BLUE}DISABLED${NORM}\n"
                                               RESULT="DISABLED"
                                                   RESULT_TYPE="WARNING"
                                        fi

        else
              echo " neither file /etc/oracle/scls_scr/$Hostname/root/ohastr nor /etc/oracle/scls_scr/$Hostname/$Softwareowner/ohasdstr  exist" >> $SCRIPT_LOG/tempcommandline
              echo -e "\t\t${RED}.FILE DOES NOT EXIST !!!.${NORM}\n"
              RESULT="FILE DOES NOT EXIST !!!"
              RESULT_TYPE="FAIL"
        fi

COMMANDLINE=$(< .$SCRIPT_LOG/tempcommandline)

################################################################################################################
#SUMMARY HTML
#if [[ $RESULT_TYPE == "FAIL"]] ; then
#<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:red>$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="\#SCRIPT_NUM_details">View</a></td></tr>
#elif [[$RESULT_TYPE == "WARNING" ]] ; then
##<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:blue >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="\#SCRIPT_NUM_details">View</a></td></tr>
#else
###<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:green >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#SCRIPT_NUM_details">View</a></td></tr>


#fi

if [[ $RESULT_TYPE == "FAIL" ]] ; then

echo "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:red>$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#7ca444a1f147034b602efebd86c53f14_details">View</a></td></tr>"  >>  $SCRIPT_TEMP
elif [[ $RESULT_TYPE == "WARNING" ]] ; then
echo "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:blue >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#7ca444a1f147034b602efebd86c53f14_details">View</a></td></tr>" >>  $SCRIPT_TEMP
else
echo  "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:green >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#7ca444a1f147034b602efebd86c53f14_details">View</a></td></tr>" >>  $SCRIPT_TEMP
fi


################################################################################################################
#DETAIL HTML

#cat > $SCRIPT_HTML/$SCRIPT_NUM.part.html << _EOF_
#<br>
#<a name="$SCRIPT_NUM_details""></a>
#<a href="#ASSESSMENT_Summary" class="a_bgw">Top</a>
#<br>
#<h3>$HEADDING</h3>
#<table>
#<tbody>
#<tr><td style="background-color:red">$RESULT_TYPE</td><td>$SCRIPT_TYPE</td></tr>
#<tr><td>Requirement</td><td>
#<pre>$SCRIPT_MESSAGE  </pre></td></tr>
#<tr><td>Expected</td><td class="check-name">$EXPECTED</td></tr><tr>
#</tr><tr><td>$HOSTNAME</td><td>$RESULT</td> </tr>
#</tbody></table>
#<br>
#<br><br><table><tbody>
#<tr><td style="border: 2px solid red;border-radius: 5px;"><pre>
#$COMMANDLINE 
#</pre>
#</td></tr>
#</tbody></table>
#<br>
#_EOF_


cat > $SCRIPT_HTML/$SCRIPT_NUM.part.html << _EOF_
<br>
<br>
<br>
<a name="7ca444a1f147034b602efebd86c53f14_details"></a>
<a href="#ASSESSMENT_Summary" class="a_bgw">Top</a>
<br>
<h3>$SCRIPT_NAME</h3>
<table>
<tbody><tr><td>$RESULT_TYPE</td><td>$SCRIPT_TYPE</td></tr>
<tr><td>Requirement</td><td>
<pre>

CRS Autoconifg must be enabled for the clusterstack

to start automatically  the below file should have "enabled"

"/etc/oracle/scls_scr/host01/oracle/ohasdstr" for

ClusterStack woud not start automatically  </pre></td></tr>
<tr><td>Expected</td><td class="check-name">$EXPECTED</td></tr><tr>
</tr><tr><td>$HOSTNAME</td><td>$RESULT</td> </tr>
</tbody></table>
<br><br><br><table><tbody>
<tr><td style="border: 2px solid red;border-radius: 5px;"><pre>
$COMMANDLINE 
</pre>
</td></tr>
</tbody></table>
<br>
_EOF_


