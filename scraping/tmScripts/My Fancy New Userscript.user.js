// ==UserScript==
// @name         My Fancy New Userscript
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://support.us.oracle.com/oip/faces/secure/srm/srview/SRTechnical.jspx*
// @grant        none
// ==/UserScript==

var buttons = document.getElementsByTagName('center');

for(var i = 0 ; i < buttons.length ; i++)
{
    
    if(buttons[i].innerHTML === 'All')
    {
        alert(buttons[i].innerHTML);
        buttons[i].click();
    }
    
}