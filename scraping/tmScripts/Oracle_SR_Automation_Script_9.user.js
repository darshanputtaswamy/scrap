// ==UserScript==
// @name         Oracle_SR_Automation_Script_9
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://accounts.google.com/ServiceLogin*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==


//window.location.href = 'https://accounts.google.com/ServiceLoginAuth#password';
document.getElementById('Passwd').value = 'M@trix@123R';

document.getElementById('signIn').click();