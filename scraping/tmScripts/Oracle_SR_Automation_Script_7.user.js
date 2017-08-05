// ==UserScript==
// @name         Oracle_SR_Automation_Script_7
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://support.us.oracle.com/oip/faces/secure/reauthenticate.jspx*
// @grant        none
// ==/UserScript==


var buttons = document.getElementsByTagName('button');

for(var i = 0 ; i < buttons.length ; i++)
{
    if(buttons[i].innerHTML === 'Close Window')
    {
        buttons[i].click();
    }
}