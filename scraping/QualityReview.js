

// click on the tab and reload the page for first time 

$(window).bind("load", function() {
   setTimeout(function(){ 
document.getElementsByClassName('dijitAccordionTitle')[1].click();
location.reload();
}, 20000);    
});



-----------------------

Chnage engineer Name 

document.getElementsByClassName('dijitReset dijitInline dijitButtonText')[7].click(); /// click on menu to change query 
document.getElementsByClassName('dijitReset dijitMenuItemLabel')[3].click();          // click on edit view 

var old_query= $('textarea[name="advancedQuery"]').val()  //save old value 


var new_query = "( owner ='" + USERNAME + "' AND status='Open' AND (sub-Status='New' OR sub-Status='Work In Progress' OR sub-Status='Review Update' OR sub-Status='Review Defect' OR sub-Status='Reveiw Task')) OR (status='Open' AND nextResponseDue <= %%SERVER_TIME(36)%% and owner ='" + USERNAME + "' )";

var new_query = "component in ('Clusterware' ,'Real Application  Cluster', 'Storage Management', 'STORAGE') and status = 'Open' and  SRLanguage='English'  andproductVersion2 like '12.2%' and created >= '01-MAR-2017'"
//( owner =%%USERNAME%% AND status='Open' AND (sub-Status='New' OR sub-Status='Work In Progress' OR sub-Status='Review Update' OR sub-Status='Review Defect' OR sub-Status='Reveiw Task')) OR (status='Open' AND nextResponseDue <= %%SERVER_TIME(36)%% and owner =%%USERNAME%% )


status = 'Open' and ( sub-Status = 'New' or sub-Status = 'Work In Progress'  or sub-Status = 'Review Update' or sub-Status = 'Review Defect' ) and ( (severity = '1-Critical' and requestFullSupportFlg = 'true' ) or ( severity = '2-Significant' and requestFullSupportFlg = 'true' ))  and ( (ownerGroup = 'DB: RAC' or ownerGroup = 'DB: Scalability 600-7445' or ownerGroup = 'DB: RAC Install' or ownerGroup = 'DB: RAC Windows'  or ownerGroup = 'DB: Storage' or ownerGroup = 'DB: Storage 600-7445' ) )


$('textarea[name="advancedQuery"]').val(new_query);



var buttons = $('center[class="dijitReset dijitButtonText"]');

for(var i = 0 ; i < buttons.length ; i++)
{
    if(buttons[i].innerHTML === 'Apply and Save')
    {
        buttons[i].click();
    }
    
}


location.reload();


--------------




if not first time 


$('table.dojoxGrid-row-table tr a').each(function(index){

 var VAL = $(this).text();

        var SR = new RegExp('3-([0-9]*.[0-9]+|[0-9]+)');

        if (SR.test(VAL)) {
            //console.log("SR Number :",VAL);
        }
		
});




login to SRs 

https://mosemp.us.oracle.com/epmos/mos/sp/viewSr?srNumber=3-13938771761





