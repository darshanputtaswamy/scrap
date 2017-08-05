// ==UserScript==
// @name         Oracle_SR_Automation_Script_5
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       Mandar Joshi
// @match        https://support.us.oracle.com/oip/faces/secure/srm/sr/SRQueue.jspx*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
var currentTime = new Date(2015,8,2,22,0,0,0);

/*
var shift1Start = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate(),6,0,0,0);
var shift1End = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate(),13,30,0,0);

var shift2Start = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate(),13,30,0,0);
var shift2End = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate(),22,0,0,0);

var shift3Start = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate(),17,30,0,0);
var shift3End = new Date(currentTime.getFullYear(),currentTime.getMonth(),currentTime.getDate()+1,2,0,0,0);
*/
var win = window.open('https://mail.google.com', '_blank');

//alert("Shift 1 from - " + shift1Start + "to" + shift1End + "\n" + "Shift 2 from - " + shift2Start + "to" + shift2End + "\n" + "Shift 3 from - " + shift3Start + "to" + shift3End + "\n" );

if(currentTime.getHours() >= 15 &&  currentTime.getHours() <= 17)
{
    $(window).bind("load", function() {
   setTimeout(function(){ 
document.getElementsByClassName('dijitAccordionTitle')[0].click();
   }, 5000);    
});

$(window).bind("load", function() {
   setTimeout(function(){ 
       //$(window).scrollTop($('8554-9625').offset().top);
       
       var srRawData = $('#dojox_GridView_0').html();
       var srDetailsRawData = $('#dojox_GridView_1').html();
       
       console.log(srRawData);
       console.log(srDetailsRawData);
       
       var count = (srRawData.match(/<table class=/g) || []).length;
       var srList = [];     
       var nameList = [];
       var timeList = [];
       var severityList = [];
       var substatusList = [];
       var data = "";
       
       //console.log($('#dojox_GridView_0').html());
       //console.log("------------------------------------------------------------------------------------------------");
       //console.log($('#dojox_GridView_1').html());
       
       var filter = srRawData.replace(new RegExp( 'return false;">', "gi" ),'*Scylla*');
       var detailsFilter = srDetailsRawData.replace(new RegExp('idx="2" style="color:blue;width:20em;">',"gi"), '*Scylla*');
       var timeStampFilter = srDetailsRawData.replace(new RegExp('idx="7" style="color:blue;width:167px;">',"gi"), '*Scylla*');
       var severityFilter = srDetailsRawData.replace(new RegExp('idx="5" style="color:blue;width:6em;">',"gi"), '*Scylla*');
       var substatusFilter = srDetailsRawData.replace(new RegExp('idx="6" style="color:blue;width:6em;">',"gi"), '*Scylla*');
       
       var uncleanData = filter.split("*Scylla*");
       var uncleanDetailsData = detailsFilter.split("*Scylla*");
       var uncleanTimeStamp = timeStampFilter.split("*Scylla*");
       var uncleanSeverity = severityFilter.split("*Scylla*");
       var uncleanSubStatus = substatusFilter.split("*Scylla*");
       
       for(var i=1 ; i < uncleanData.length ; i++)
       {
           var pos = uncleanData[i].indexOf('</a>');
           srList[i-1] = uncleanData[i].slice(0,pos);
       }
       
       for(var i=1 ; i < uncleanDetailsData.length ; i++)
       {
           var pos = uncleanDetailsData[i].indexOf('</td><td tabindex="-1"');
           nameList[i-1] = uncleanDetailsData[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanTimeStamp.length ; i++)
       {
           var pos = uncleanTimeStamp[i].indexOf('</td><td tabindex="-1"');
           timeList[i-1] = uncleanTimeStamp[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanSeverity.length ; i++)
       {
           var pos = uncleanSeverity[i].indexOf('</td><td tabindex="-1"');
           severityList[i-1] = uncleanSeverity[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanSubStatus.length ; i++)
       {
           var pos = uncleanSubStatus[i].indexOf('</td><td tabindex="-1"');
           substatusList[i-1] = uncleanSubStatus[i].slice(0,pos);
       }
       
       for(var i=0 ; i< timeList.length ; i++)
       {
           data = data.concat("\n" + (i+1) + ".\t\t\t" + srList[i] + "\t\t\t" + severityList[i] + "\t\t\t" + substatusList[i] + "\t\t\t" + nameList[i] + "\t\t\t" + timeList[i] + "\n");
       }
       
       //alert(data);
       
       //$('body').prepend('<form action="mailto:mandar.x.joshi@oracle.com" method="post" enctype="text/plain"><input type="visible" name="mailData" id="mailData" value="TestMail" size="50"><input type="submit" id="sendMail" value="Send">')
       //document.getElementById('mailData').value = data;
      
       console.log(data);
       
       data = encodeURIComponent(data);
       
       var emailTo = 'mandar.x.joshi@oracle.com';
       var emailCC = 'mandar.x.joshi@oracle.com';
       var emailSubject = 'Testing';
       var emailBody = data;
       
       var newUrl = "https://mail.google.com/mail?view=cm&tf=0" +
				(emailTo ? ("&to=" + emailTo) : "") +
				(emailCC ? ("&cc=" + emailCC) : "") +
				(emailSubject ? ("&su=" + emailSubject) : "") +
				(emailBody ? ("&body=" + emailBody) : "");
       
       console.log(newUrl);
       
       var win = window.open(newUrl, '_blank');
       win.focus();
       
   }, 20000);    
});
    
}
else if(currentTime.getHours() >= 22 &&  (currentTime.getHours() <= 23 && currentTime.getMinutes() <= 59))
{
    $(window).bind("load", function() {
   setTimeout(function(){ 
document.getElementsByClassName('dijitAccordionTitle')[1].click();
   }, 5000);    
});

$(window).bind("load", function() {
   setTimeout(function(){ 
       //$(window).scrollTop($('8554-9625').offset().top);
       
       var srRawData = $('#dojox_GridView_4').html();
       var srDetailsRawData = $('#dojox_GridView_5').html();
       
       //console.log(srRawData);
       //console.log(srDetailsRawData);
       
       var count = (srRawData.match(/<table class=/g) || []).length;
       alert(count);
       var srList = [];     
       var nameList = [];
       var timeList = [];
       var severityList = [];
       var substatusList = [];
       var data = "";
       
       //console.log($('#dojox_GridView_0').html());
       //console.log("------------------------------------------------------------------------------------------------");
       //console.log($('#dojox_GridView_1').html());
       
       var filter = srRawData.replace(new RegExp( 'return false;">', "gi" ),'*Scylla*');
       var detailsFilter = srDetailsRawData.replace(new RegExp('idx="8" style="color:blue;width:6em;">',"gi"), '*Scylla*');
       var timeStampFilter = srDetailsRawData.replace(new RegExp('idx="7" style="color:blue;width:195px;">',"gi"), '*Scylla*');
       var severityFilter = srDetailsRawData.replace(new RegExp('idx="5" style="color:blue;width:6em;">',"gi"), '*Scylla*');
       var substatusFilter = srDetailsRawData.replace(new RegExp('idx="6" style="color:blue;width:6em;">',"gi"), '*Scylla*');
       
       var uncleanData = filter.split("*Scylla*");
       var uncleanDetailsData = detailsFilter.split("*Scylla*");
       var uncleanTimeStamp = timeStampFilter.split("*Scylla*");
       var uncleanSeverity = severityFilter.split("*Scylla*");
       var uncleanSubStatus = substatusFilter.split("*Scylla*");
       
       for(var i=1 ; i < uncleanData.length ; i++)
       {
           var pos = uncleanData[i].indexOf('</a>');
           srList[i-1] = uncleanData[i].slice(0,pos);
       }
       
       for(var i=1 ; i < uncleanDetailsData.length ; i++)
       {
           var pos = uncleanDetailsData[i].indexOf('</td></tr></tbody></table>');
           nameList[i-1] = uncleanDetailsData[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanTimeStamp.length ; i++)
       {
           var pos = uncleanTimeStamp[i].indexOf('</td><td tabindex="-1"');
           timeList[i-1] = uncleanTimeStamp[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanSeverity.length ; i++)
       {
           var pos = uncleanSeverity[i].indexOf('</td><td tabindex="-1"');
           severityList[i-1] = uncleanSeverity[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanSubStatus.length ; i++)
       {
           var pos = uncleanSubStatus[i].indexOf('</td><td tabindex="-1"');
           substatusList[i-1] = uncleanSubStatus[i].slice(0,pos);
       }
       
       for(var i=0 ; i< timeList.length ; i++)
       {
           data = data.concat("\n" + (i+1) + ".\t\t\t" + srList[i] + "\t\t\t" + severityList[i] + "\t\t\t" + substatusList[i] + "\t\t\t" + nameList[i] + "\t\t\t" + timeList[i] + "\n");
       }
       
       //alert(data);
       
       //$('body').prepend('<form action="mailto:mandar.x.joshi@oracle.com" method="post" enctype="text/plain"><input type="visible" name="mailData" id="mailData" value="TestMail" size="50"><input type="submit" id="sendMail" value="Send">')
       //document.getElementById('mailData').value = data;
      
       console.log(data);
       
       data = encodeURIComponent(data);
       
       var emailTo = 'mandar.x.joshi@oracle.com';
       var emailCC = 'mandar.x.joshi@oracle.com';
       var emailSubject = 'Testing';
       var emailBody = data;
       
       var newUrl = "https://mail.google.com/mail?view=cm&tf=0" +
				(emailTo ? ("&to=" + emailTo) : "") +
				(emailCC ? ("&cc=" + emailCC) : "") +
				(emailSubject ? ("&su=" + emailSubject) : "") +
				(emailBody ? ("&body=" + emailBody) : "");
       
       console.log(newUrl);
       
       var win = window.open(newUrl, '_blank');
       win.focus();
       
   }, 20000);    
});
}
else if(currentTime.getHours() >= 2 &&  currentTime.getHours() <= 4)
{
    $(window).bind("load", function() {
   setTimeout(function(){ 
document.getElementsByClassName('dijitAccordionTitle')[3].click();
   }, 5000);    
});

$(window).bind("load", function() {
   setTimeout(function(){ 
       //$(window).scrollTop($('8554-9625').offset().top);
       
       var srRawData = $('#dojox_GridView_12').html();
       var srDetailsRawData = $('#dojox_GridView_13').html();
       
       //console.log(srRawData);
       //console.log(srDetailsRawData);
       
       var count = (srRawData.match(/<table class=/g) || []).length;
       var srList = [];     
       var nameList = [];
       var timeList = [];
       var severityList = [];
       var substatusList = [];
       var data = "";
       
       //console.log($('#dojox_GridView_0').html());
       //console.log("------------------------------------------------------------------------------------------------");
       //console.log($('#dojox_GridView_1').html());
       
       var filter = srRawData.replace(new RegExp( 'return false;">', "gi" ),'*Scylla*');
       var detailsFilter = srDetailsRawData.replace(new RegExp('idx="2" style="color:blue;width:20em;">',"gi"), '*Scylla*');
       var timeStampFilter = srDetailsRawData.replace(new RegExp('idx="5" style="color:blue;width:193px;">',"gi"), '*Scylla*');
       var severityFilter = srDetailsRawData.replace(new RegExp('idx="7" style="color:blue;width:64px;">',"gi"), '*Scylla*');
       var substatusFilter = srDetailsRawData.replace(new RegExp('idx="8" style="color:blue;width:6em;">',"gi"), '*Scylla*');
       
       var uncleanData = filter.split("*Scylla*");
       var uncleanDetailsData = detailsFilter.split("*Scylla*");
       var uncleanTimeStamp = timeStampFilter.split("*Scylla*");
       var uncleanSeverity = severityFilter.split("*Scylla*");
       var uncleanSubStatus = substatusFilter.split("*Scylla*");
       
       for(var i=1 ; i < uncleanData.length ; i++)
       {
           var pos = uncleanData[i].indexOf('</a>');
           srList[i-1] = uncleanData[i].slice(0,pos);
       }
       
       for(var i=1 ; i < uncleanDetailsData.length ; i++)
       {
           var pos = uncleanDetailsData[i].indexOf('</td><td tabindex="-1"');
           nameList[i-1] = uncleanDetailsData[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanTimeStamp.length ; i++)
       {
           var pos = uncleanTimeStamp[i].indexOf('</td><td tabindex="-1"');
           timeList[i-1] = uncleanTimeStamp[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanSeverity.length ; i++)
       {
           var pos = uncleanSeverity[i].indexOf('</td><td tabindex="-1"');
           severityList[i-1] = uncleanSeverity[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanSubStatus.length ; i++)
       {
           var pos = uncleanSubStatus[i].indexOf('</td></tr></tbody></table>');
           substatusList[i-1] = uncleanSubStatus[i].slice(0,pos);
       }
                   
       for(var i=0,j=0 ; i< timeList.length ; i++)
       {
           data = data.concat("\n" + (i+1) + ".\t\t\t" + srList[i] + "\t\t\t" + severityList[i] + "\t\t\t" + substatusList[i] + "\t\t\t" + nameList[i] + "\t\t\t" + timeList[i] + "\n");

       }
      
       console.log(data);
       
       data = encodeURIComponent(data);
       
       var emailTo = 'mandar.x.joshi@oracle.com';
       var emailCC = 'mandar.x.joshi@oracle.com';
       var emailSubject = 'Testing';
       var emailBody = data;
       
       var newUrl = "https://mail.google.com/mail?view=cm&tf=0" +
				(emailTo ? ("&to=" + emailTo) : "") +
				(emailCC ? ("&cc=" + emailCC) : "") +
				(emailSubject ? ("&su=" + emailSubject) : "") +
				(emailBody ? ("&body=" + emailBody) : "");
       
       console.log(newUrl);
       
       var win = window.open(newUrl, '_blank');
       win.focus();
       
   }, 20000);
});
}
/*
$(window).bind("load", function() {
   setTimeout(function(){ 
document.getElementsByClassName('dijitAccordionTitle')[3].click();
   }, 5000);    
});

$(window).bind("load", function() {
   setTimeout(function(){ 
       //$(window).scrollTop($('8554-9625').offset().top);
       
       var srRawData = $('#dojox_GridView_12').html();
       var srDetailsRawData = $('#dojox_GridView_13').html();
       
       var count = (srRawData.match(/<table class=/g) || []).length;
       var srList = [];     
       var nameList = [];
       var timeList = [];
       var severityList = [];
       var substatusList = [];
       var data = "";
       
       //console.log($('#dojox_GridView_0').html());
       //console.log("------------------------------------------------------------------------------------------------");
       //console.log($('#dojox_GridView_1').html());
       
       var filter = srRawData.replace(new RegExp( 'return false;">', "gi" ),'*Scylla*');
       var detailsFilter = srDetailsRawData.replace(new RegExp('idx="2" style="color:blue;width:20em;">',"gi"), '*Scylla*');
       var timeStampFilter = srDetailsRawData.replace(new RegExp('idx="5" style="color:blue;width:193px;">',"gi"), '*Scylla*');
       var severityFilter = srDetailsRawData.replace(new RegExp('idx="7" style="color:blue;width:64px;">',"gi"), '*Scylla*');
       var substatusFilter = srDetailsRawData.replace(new RegExp('idx="8" style="color:blue;width:6em;">',"gi"), '*Scylla*');
       
       var uncleanData = filter.split("*Scylla*");
       var uncleanDetailsData = detailsFilter.split("*Scylla*");
       var uncleanTimeStamp = timeStampFilter.split("*Scylla*");
       var uncleanSeverity = severityFilter.split("*Scylla*");
       var uncleanSubStatus = substatusFilter.split("*Scylla*");
       
       for(var i=1 ; i < uncleanData.length ; i++)
       {
           var pos = uncleanData[i].indexOf('</a>');
           srList[i-1] = uncleanData[i].slice(0,pos);
       }
       
       for(var i=1 ; i < uncleanDetailsData.length ; i++)
       {
           var pos = uncleanDetailsData[i].indexOf('</td><td tabindex="-1"');
           nameList[i-1] = uncleanDetailsData[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanTimeStamp.length ; i++)
       {
           var pos = uncleanTimeStamp[i].indexOf('</td><td tabindex="-1"');
           timeList[i-1] = uncleanTimeStamp[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanSeverity.length ; i++)
       {
           var pos = uncleanSeverity[i].indexOf('</td><td tabindex="-1"');
           severityList[i-1] = uncleanSeverity[i].slice(0,pos);
       }
       
       for (var i=1 ; i < uncleanSubStatus.length ; i++)
       {
           var pos = uncleanSubStatus[i].indexOf('</td></tr></tbody></table>');
           substatusList[i-1] = uncleanSubStatus[i].slice(0,pos);
       }
       
       for(var i=0 ; i< timeList.length ; i++)
       {
           data = data.concat("\n" + (i+1) + ".\t\t\t" + srList[i] + "\t\t\t" + severityList[i] + "\t\t\t" + substatusList[i] + "\t\t\t" + nameList[i] + "\t\t\t" + timeList[i] + "\n");
       }
       
       //alert(data);
       
       //$('body').prepend('<form action="mailto:mandar.x.joshi@oracle.com" method="post" enctype="text/plain"><input type="visible" name="mailData" id="mailData" value="TestMail" size="50"><input type="submit" id="sendMail" value="Send">')
       //document.getElementById('mailData').value = data;
      
       console.log(data);
       
   }, 15000);    
});
*/