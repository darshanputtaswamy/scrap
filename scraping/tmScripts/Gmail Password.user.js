// ==UserScript==
// @name         Gmail Password
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://accounts.google.com/ServiceLoginAuth#password
// @grant        none
// ==/UserScript==

document.getElementById('Passwd').value = 'M@trix@123R';

document.getElementById('signIn').click();