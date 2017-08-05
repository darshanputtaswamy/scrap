#!/bin/bash

CYAN="\033[1;36;40m"
NORM="\033[0m"
BOLD="\033[1m"
GREEN="\033[1;32;40m"
ORANGE="\033[33;40m"
RED="\033[1;31;40m"
BLUE="\033[1;34;40m"

################################################################################################################
#PLUGINSCRIPT_NUM="XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
#PLUGINSCRIPT_NAME="NAME OF THE TEST /CHECK PLUGINSCRIPT IS DOING"
#PLUGINSCRIPT_TYPE="TYPE oF THE CHECK ; CONFIG/NET/FS/DISK"
#PLUGINSCRIPT_MESSAGE=""


PLUGINSCRIPT_NUM="XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
PLUGINSCRIPT_NAME="runlevel rc 3 or 5 as reached"
PLUGINSCRIPT_TYPE="Configuration"
PLUGINSCRIPT_MESSAGE=""


##############################################################################################################
#PLUGINSCRIPT_LOG= output log file                    ###PLUGINSCRIPT_LOG Directory location . 
#PLUGINSCRIPT_HTML=output html file                   ###PLUGINSCRIPT_HTML Directory Location .
#PLUGINSCRIPT_TEMP=output                             ###PLUGINSCRIPT_Summary File
#PLUGINSCRIPT_INPUT=input file Directory after validation      ###PLUGINSCRIPT_INPUT Directory Location
##############################################################################################
# For now you can create raccheck_env.out in current directory  and the set PLUGINSCRIPT_INPUT="."
# Still need to add console output to the report , 

PLUGINSCRIPT_LOG=$1                   ###PLUGINSCRIPT_LOG Directory location . 
PLUGINSCRIPT_HTML=$2                  ###PLUGINSCRIPT_HTML Directory Location .
PLUGINSCRIPT_TEMP=$3                  ###PLUGINSCRIPT_Summary File
PLUGINSCRIPT_INPUT=$4                 ###PLUGINSCRIPT_INPUT Directory Location





###############################################################################################################
#EXPECTED:   <what is expected>
#RESULT_TYPE: PASS/FAIL
#RESULT:  <what you got >
#OUTPUT : <console output>
#COMMAND :<COMMAND RUN>



EXPECTED="REACHED"
Softwareowner=$(cat $PLUGINSCRIPT_INPUT/raccheck_env.out | grep "ORACLEOWNER"| cut -d\| -f3)
Hostname=$(hostname | tr "[A-Z]" "[a-z]" |cut -d. -f1|tr -d '\r')

echo -e  "runlevel rc 3 or 5 as reached"

        `ps -ef | grep /etc/rc | grep -v grep` 

                        if [[ $? -eq  1 ]] ; then
                          echo -e ${GREEN}."\t\tREACHED ".${NORM}
                          RESULT_TYPE="PASS"
                          RESULT="REACHED"
                        else
                          echo -e ${RED}."\t\trunlevel 3|5 has not reached due to suck rc* scripts".${NORM}
                          RESULT_TYPE="FAIL"
                          RESULT="NOT REACHED"
                        fi
						
        OUTPUT$(cat ./tmp) 
		
################################################################################################################
#SUMMARY HTML
#if [[ $RESULT_TYPE == "FAIL"]] ; then
#<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$PLUGINSCRIPT_NUM</td><td class="check-result" style=background-color:red>$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $PLUGINSCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="\#PLUGINSCRIPT_NUM_details">View</a></td></tr>
#elif [[$RESULT_TYPE == "WARNING" ]] ; then
##<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$PLUGINSCRIPT_NUM</td><td class="check-result" style=background-color:blue >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $PLUGINSCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="\#PLUGINSCRIPT_NUM_details">View</a></td></tr>
#else
###<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY: none'>$PLUGINSCRIPT_NUM</td><td class="check-result" style=background-color:green >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $PLUGINSCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#PLUGINSCRIPT_NUM_details">View</a></td></tr>


#fi

if [[ $RESULT_TYPE == "FAIL" ]] ; then

echo "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY:none'>$PLUGINSCRIPT_NUM</td><td class="check-result" style=background-color:red>$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $PLUGINSCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#b1e0ac093941296e780f9c09fd5f175f_details">View</a></td></tr>"  >>  $PLUGINSCRIPT_TEMP
elif [[ $RESULT_TYPE == "WARNING" ]] ; then
echo "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY:none'>$PLUGINSCRIPT_NUM</td><td class="check-result" style=background-color:blue >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $PLUGINSCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#b1e0ac093941296e780f9c09fd5f175f_details">View</a></td></tr>" >>  $PLUGINSCRIPT_TEMP
else
echo  "<tr class="check-result"><td class="check-id" name='checkid' style='DISPLAY:none'>$PLUGINSCRIPT_NUM</td><td class="check-result" style=background-color:green >$RESULT_TYPE</td><td class="check-name">CONFIG</td><td class="check-message" scope="row"> $PLUGINSCRIPT_NAME </td><td class="check-status-on">$HOSTNAME</td><td class="check-view-link"><a href="#b1e0ac093941296e780f9c09fd5f175f_details">View</a></td></tr>" >>  $PLUGINSCRIPT_TEMP
fi


################################################################################################################
#DETAIL HTML

#cat > $PLUGINSCRIPT_HTML/$PLUGINSCRIPT_NUM.part.html << _EOF_
#<br>
#<a name="$PLUGINSCRIPT_NUM_details""></a>
#<a href="#ASSESSMENT_Summary" class="a_bgw">Top</a>
#<br>
#<h3>$HEADDING</h3>
#<table>
#<tbody><tr><td style="background-color:red">$RESULT_TYPE</td><td>$PLUGINSCRIPT_TYPE</td></tr>
#<tr><td>Requirement
#<pre>$PLUGINSCRIPT_MESSAGE  </pre></td></tr>
#<tr><td>Expected</td><td class="check-name">$EXPECTED</td></tr><tr>
#</tr><tr><td>$HOSTNAME</td><td>$RESULT</td> </tr>
#</tbody></table>
#<br>

#_EOF_




cat > $PLUGINSCRIPT_HTML/$PLUGINSCRIPT_NUM.part.html << _EOF_
<br>
<br>
<br>
<a name="b1e0ac093941296e780f9c09fd5f175f_details"></a>
<a href="#ASSESSMENT_Summary" class="a_bgw">Top</a>
<br>
<h3>runlevel rc 3 or 5 as reached</h3>
<table>
<tbody><tr> <td style="background-color:red">$RESULT_TYPE</td><td>$PLUGINSCRIPT_TYPE</td></tr>
<tr><td scope="row">Requirement</td><td>
<pre>

No rc scripts should be running for a clusterware to come up,

ensure run level 3 or 5 is reached before starting the clusterstack
</pre></td></tr>
<tr><td class="check-name">Expected</td><td>$EXPECTED</td></tr><tr>
</tr><tr><td>$HOSTNAME</td><td>$RESULT</td> </tr>
</tbody></table>
<br>
_EOF_