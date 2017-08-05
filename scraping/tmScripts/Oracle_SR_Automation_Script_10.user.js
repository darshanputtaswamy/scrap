// ==UserScript==
// @name         Oracle_SR_Automation_Script_10
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        https://mail.google.com/mail/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//document.getElementById(':pa').click();

$(window).bind("load", function() 
{
    setTimeout(function()
    { 
        var buttons = document.getElementsByTagName('div');
        for(var i = 0 ; i < buttons.length ; i++)
        {
    
            if(buttons[i].innerHTML === 'Send')
            {
                //alert(buttons[i].innerHTML);
                buttons[i].click();
            }
        }           
    }, 10000);    
});