
#!/bin/bash

CYAN="\033[1;36;40m"
NORM="\033[0m"
BOLD="\033[1m"
GREEN="\033[1;32;40m"
ORANGE="\033[33;40m"
RED="\033[1;31;40m"
BLUE="\033[1;34;40m"

SCRIPT_NUM="b1e0ac093941296e780f9c09fd5f175f"
SCRIPT_NAME="Check if runlevel 3 or 5 as reached"
SCRIPT_TYPE="Configuration"
SCRIPT_MESSAGE=""


SCRIPT_LOG=$1                   ###SCRIPT_LOG Directory location .
SCRIPT_HTML=$2                  ###SCRIPT_HTML Directory Location .
SCRIPT_TEMP=$3                  ###SCRIPT_Summary File
SCRIPT_INPUT=$4                 ###SCRIPT_INPUT Directory Location



###############################################################################################################

EXPECTED="REACHED"
Softwareowner=$(cat $SCRIPT_INPUT/raccheck_env.out | grep "ORACLEOWNER"| cut -d\| -f3)
Hostname=$(hostname | tr "[A-Z]" "[a-z]" |cut -d. -f1|tr -d '\r')


echo -e  "Check OS runlevel " | tee $SCRIPT_LOG/tempcommandline

         echo "ps -ef | grep /etc/rc | grep -v grep" >> $SCRIPT_LOG/tempcommandline
         TEMP=`ps -ef | grep /etc/rc | grep -v grep`

                        if [[ $? -eq  1 ]] ; then
                          echo $TEMP >> $SCRIPT_LOG/tempcommandline
                          echo -e ${GREEN}."\t\tREACHED ".${NORM}
                          RESULT_TYPE="PASS"
                          RESULT="REACHED"
                        else
                          echo $TEMP >> $SCRIPT_LOG/tempcommandline
                          echo -e ${RED}."\t\trunlevel 3|5 has not reached due to suck rc* scripts".${NORM}
                          RESULT_TYPE="FAIL"
                          RESULT="NOT REACHED"
                        fi


COMMANDLINE=$(< $SCRIPT_LOG/tempcommandline)

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

echo "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY:none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:red>$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#b1e0ac093941296e780f9c09fd5f175f_details">View</a></td></tr>"  >>  $SCRIPT_TEMP
elif [[ $RESULT_TYPE == "WARNING" ]] ; then
echo "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY:none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:blue >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#b1e0ac093941296e780f9c09fd5f175f_details">View</a></td></tr>" >>  $SCRIPT_TEMP
else
echo  "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY:none'>$SCRIPT_NUM</td><td class="check-result" style=background-color:green >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $SCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#b1e0ac093941296e780f9c09fd5f175f_details">View</a></td></tr>" >>  $SCRIPT_TEMP
fi


################################################################################################################
#DETAIL HTML

#cat > $SCRIPT_HTML/$SCRIPT_NUM.part.html << _EOF_
#<br>
#<a name="$SCRIPT_NUM_details""></a>
#<a href="#ASSESSMENT_Summary" class="a_bgw">Top</a>
#<br>
#<h3>$SCRIPT_NAME</h3>
#<table>
#<tbody><tr><td style="background-color:red">$RESULT_TYPE</td><td>$SCRIPT_TYPE</td></tr>
#<tr><td>Requirement
#<pre>$SCRIPT_MESSAGE  </pre></td></tr>
#<tr><td>Expected</td><td class="check-name">$EXPECTED</td></tr><tr>
#</tr><tr><td>$HOSTNAME</td><td>$RESULT</td> </tr>
#</tbody></table>
#<br><br><br><table><tbody>
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
<a name="b1e0ac093941296e780f9c09fd5f175f_details"></a>
<a href="#ASSESSMENT_Summary" class="a_bgw">Top</a>
<br>
<h3>$SCRIPT_NAME</h3>
<table>
<tbody><tr> <td style="background-color:red">$RESULT_TYPE</td><td>$SCRIPT_TYPE</td></tr>
<tr><td scope="row">Requirement</td><td>
<pre>

No rc scripts should be running for a clusterware to come up,

ensure run level 3 or 5 is reached before starting the clusterstack
</pre></td></tr>
<tr><td class="check-name">Expected</td><td>$EXPECTED</td></tr><tr>
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



