// ==UserScript==
// @name         Oracle_SR_Automation_Script_2
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://login.oracle.com/mysso/signon.jsp
// @grant        none
// ==/UserScript==

var userName = 'darshan.px@oracle.com';
var password = 'ldo1ifcmQ';

document.getElementById('sso_username').value = userName;
document.getElementById('ssopassword').value = password;

document.getElementsByName('LoginForm')[0].submit();