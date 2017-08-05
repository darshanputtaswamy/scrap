// ==UserScript==
// @name         Oracle_SR_Automation_Script_1
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://support.us.oracle.com/oip/faces/index.jspx
// @grant        none
// ==/UserScript==

var TargetLink = document.getElementById('login');

if(TargetLink)
window.location.href = TargetLink;
