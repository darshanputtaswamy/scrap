// ==UserScript==
// @name         Oracle_SR_Automation_Script_8
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://accounts.google.com/ServiceLogin?service=mail*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var username = 'joshi.mandar90';
var password = 'M@trix@123R';
/*
document.getElementById('Email').value = username;
document.getElementById('next').click();


document.getElementById('Passwd').value = password;


*/

var inputs = document.getElementsByTagName('input'); 
for(var k=0;k<inputs.length;k++) { 
    var input = inputs[k] ;
    var type = input.getAttribute('type');
    if(type == 'email')
        input.value = "joshi.mandar90@gmail.com";
    if(type == 'password')
    input.value = "M@trix@123R";
} 

var forms=document.getElementsByTagName('form'); 
forms[0].submit();
