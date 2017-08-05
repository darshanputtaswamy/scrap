var atStatus = "";
var srcloseddate = "";
var sropendate = "";
var srcloseddateval = "";
var sropenddateval = "";
var topacc_val = "";
var irddonedate = "";
var irdrespdate = "";
var irdvalue = "";
var irddonecheckval = "";
var srstatus = "";
var srsubstatus = "";
var srproduct = "";
var current_accnameval = "";
var prioval = "";
var srcomponent = "";
var srsubcomponent= "";
var rootcause = "";
var reasoncode = "";
var knownissue = "";
var cemail = "";
var Val247 = "";

chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
		case "genrep":
		var body = $('body');
		var allElem = $('#showAllBtn_label');
		var srelem = body.find('img[title="SR Header Audit"]');
		var maximize = body.find('img[title="Maximize"]');
		var defects = $("#titleSpanId_Defect");
		srelem.css('background-color','green');
		allElem.css('background-color','green');
		displayOverlay("Please wait while we review this SR....DONOT Tab out / DONOT Do Any SCROLLS on MOUSE ..just stay on this page leaving your mouse idle for accurate results");	
		maximize.trigger('click');
		setTimeout(function(){
			prioval = $('#MaximizedSRHeaderDialog td[title="Severity"]').nextAll().eq(2).find('input').val()
			Val247 =  $('#original24x7').val()
			atStatus = $('#MaximizedSRHeaderDialog td[title="ATLastFlowStatus"]').nextAll().eq(2).find('input').val()
			topacc_val = $('#MaximizedSRHeaderDialog td[title="Primary Classification"]').nextAll().eq(1).find('input').val()
			current_accnameval = $('#MaximizedSRHeaderDialog td[title="Account"]').nextAll().eq(2).find('input').val()
			srcloseddate = $('#MaximizedSRHeaderDialog td[title="Closed Date"]').nextAll().eq(1).find('input').val()
			srcomponent = $('#MaximizedSRHeaderDialog td[title="Component"]').nextAll().eq(2).find('input').val()
			srsubcomponent = $('#MaximizedSRHeaderDialog td[title="Sub Component"]').nextAll().eq(2).find('input').val()
			rootcause = $('#MaximizedSRHeaderDialog #rootCause').val()
			reasoncode = $('#MaximizedSRHeaderDialog #reasonCode').val()
			knownissue = $('#MaximizedSRHeaderDialog #knownIssue').val()
			cemail = $('#MaximizedSRHeaderDialog #contactEmail').val()
			sropendate = $('#MaximizedSRHeaderDialog td[title="Date Created"]').nextAll().eq(2).find('input').val()
			srstatus = $('#MaximizedSRHeaderDialog td[title="Status"]').nextAll().eq(2).find('input').val()
			srsubstatus = $('#MaximizedSRHeaderDialog td[title="Substatus"]').nextAll().eq(2).find('input').val()
			srproduct = $('#MaximizedSRHeaderDialog td[title="Product"]').nextAll().eq(2).find('input').val()
			irddonecheckval = $("#MaximizedSRHeaderDialog #responseDone").val().length;
			if (irddonecheckval !=0)
			{
			irddonedate = calculateDate($("#MaximizedSRHeaderDialog #responseDone").val());
			}
			if (srcloseddate.length !=0)
			{
			srcloseddateval = calculateDate(srcloseddate);
			}
			if (sropendate.length !=0)
			{
			sropenddateval = calculateDate(sropendate);
			}
			
			irdrespdate = calculateDate($("#MaximizedSRHeaderDialog #responseDue").val());
			var close = $('#MaximizedSRHeaderDialog span[title="Cancel"]');
			close.trigger('click');
			allElem.trigger('click');
			srelem.trigger('click');
			defects.trigger('click');
			runTest();
		},2000);
		
		break;
    }
});

var collab_bug_count_content = "";
var collab_km_count_content = "";
var collab_km_count = 0;
var global_grid_count = 0;
var collab_bug_count = 0;
var w = null;
var y = "";
var sr_owner_val = "";
var collab_sr_count_content = "";
var sr_escowner_val = "";
var sr_sevvalc = "";
var sr_sevvalp = "";
var sr_esclvl_val = "";
var sr_cam_val = "";
var current_compnameval = "";
var owner_first_time = 0;
var xfr_count_val = "";
var xfr_counter = 0;
var esclvl_counter = 0;
var prisevval_counter = 0;
var prisevvaldate_counter = 0;
var details = "";
var nrd_set_details = "";
var sevvaldetails = "";
var srcreationdate = "";
var escdate = "";
var escgtob = 0;
var escltob = 0;
var escgtib = 0;
var escltib = 0;
var escgtci = 0;
var escltci = 0;
var nrd_data_count = 0;
var sev_val_details = "";
var nrd_data_details = "";
var srd_data_employee_login = "";
var topacc = "";
var srd_data_new_val = "";
var srd_data_flag = 0;
var upd_cust_count = 0;
var collab_sr_count = 0;
var upd_callin_count= 0;
var upd_callout_count= 0;
var upd_engg_count = 0;
var customer_data_table = "";
var customerworking = 0;
var sr_age = 0;
var ic_age = 0;
var iv_age = 0;
var cd_age = 0;
var cj_age = 0;
var ps_age = 0;
var psj_age = 0;
var odm_qu = 0;
var odm_ans = 0;
var esc_age = "";
var upd_chat_count = 0;
var web_conf_count = 0;
var newstat_first_time = 0;
var wip_first_time = 0;
var air_first_time = 0;
var cw_first_time = 0;
var rvw_first_time = 0;
var dev_first_time = 0;
var sol_first_time = 0;
var acl_first_time = 0;
var creq_first_time = 0;
var cli_first_time = 0;
var substat_first_time  = 0;
var substat3_first_time = 0;
var rvw_def_first_time = 0;
var cust_counter = 0;
var dev_counter = 0;
var owner_counter = 0;
var escowner_counter = 0;
var newstat_counter = 0;
var cust_wip_counter = 0;
var cust_air_counter = 0;
var cust_rvw_counter = 0;
var cust_sol_counter = 0;
var cust_acl_counter = 0;
var cust_cli_counter = 0;
var substat_counter = 0;
var substatval_counter = 0;
var cam_counter = 0;
var	asap_count_val = 0;
var	bccount_val = 0;
var	cricount_val = 0;
var	glcount_val = 0;
var anyupcount_val = 0;
var anyup1count_val = 0;
var cust_close_req_counter = 0;
var rdef_counter = 0;
var newstat_array_tmp = [];
var customer_array = [];
var newstat_array = [];
var wip_array = [];
var soloff_array = [];
var dev_array = [];
var customervals_array = [];
var air_array = [];
var autoclose_array = [];
var closereq_array = [];
var RVW_array = [];
var cli_array = [];
var rdef_array = [];
var owner_array = [];
var xfr_array = [];
var escowner_array = [];
var esclvl_array = [];
var cam_array = [];
var prisevval_array = [];
var prisevval_arraydate = [];
var createdatearray = [];
var calsevdaychanges = [];
var substatdate_array = [];
var substatval_array = [];
var createdatecounter = 0;
var cust_days = 0;
var dev_days = 0;
var soloff_days = 0;
var wip_days = 0;
var air_days = 0;
var auto_closedays = 0;
var closereq_days = 0;
var rvw_days = 0;
var ic_content = "";
var iv_content = "";
var cd_content = "";
var cj_content = "";
var ps_content = "";
var psj_content = "";
var odm_qu_content = "";
var odm_ans_content = "";
var esc_date_val11 = "";
var escdetail = "";
var escdetail_content = "";
var callobtxtdate = "";
var callobdetails = [];
var callob_data_details = "";
var sr_status = "";
var nrd_old_date = [];
var callob_date = [];
var SRAG_creation_date = "";
var SRAG_creation_date_new ="";
var sap_age = "";
var sap_content = "";
var att_content = "";
var att_count = 0;
var nrd_set_data_count = 0;
var nrd_set_data_details = "";
var substat3date_array = [];
var substat3val_array = [];
var substat3_counter = 0;
var substat3val_counter =0;
var nrd_old_date1 = [];
var anyupcount_val_detail = "";
var date_warsig_anyupd_details = [];
var anyupcount_valtest = 0;
var date_warsig_anyupd_date_new = [];
var all_act_count = 0;
var allactdate_array = [];
var date_warsig_asap_details = [];
var date_warsig_asap_date_new = [];
var asapcount_val_detail = "";
var date_warsig_buscri_details = [];
var date_warsig_buscri_date_new = [];
var buscricount_val_detail = "";
var date_warsig_criimp_details = [];
var date_warsig_criimp_date_new = [];
var criimpcount_val_detail = "";
var date_warsig_goliv_details = [];
var date_warsig_goliv_date_new = [];
var golivcount_val_detail = "";
var date_warsig_anyupdcp_details = [];
var date_warsig_anyupdcp_date_new = [];
var anyupdcpcount_val_detail = "";
var anynewscounter = 0;
var anynewscount_val = 0;
var date_warsig_anynews_date_new = [];
var date_warsig_anynews_details = [];
var anynewscount_val_detail = "";
var chatobdetails = [];
var chattxdate = "";
var chatob_date = [];
var dc_odm_count = 0;
					
var possig_raw1_details = [];
var possig_raw1_date_new = [];
var possig1counter = 0;
var possig1counter_val = 0;
var possig1_val_details = "";
	
var possig_raw2_details = [];
var possig_raw2_date_new = [];
var possig2counter = 0;
var possig2counter_val = 0;
var possig2_val_details = "";

var possig_raw3_details = [];
var possig_raw3_date_new = [];
var possig3counter = 0;
var possig3counter_val = 0;
var possig3_val_details = "";

var possig_raw4_details = [];
var possig_raw4_date_new = [];
var possig4counter = 0;
var possig4counter_val = 0;
var possig4_val_details = "";


var count_possig1 = 0;


function runTest(){

		if($('.dojoxGrid-row .dojoxGrid-cell').eq(0).text() != "?")
		{

		var initial = $('.dojoxGrid-scrollbox .dojoxGrid-row').length;
		y = setInterval(function(){
			 if($('.dojoxGrid-scrollbox .dojoxGrid-row').length)
			 {

				getSubStatDates();
				getSubStatRow3Dates();
				getSRData();
				getCustomerWorking();
				checkOwner();
				checkESCOwner();
				checkESCLevel();
				checkCAMeng();
				xfrcount();
				getNRD();
				getDevelopmentWorking();
				getCloseReqDays();
				getAIRWorking();
				getNEWStatDays();
				getWIPWorking();
				getRVWWorking();
				getsoloffDays();
				getAutoClose();
				getCLIClose();
				updateFromCustomer();
				updatesbyEngineer();
				getRDEFWorking();
				getNRDSets();
				checkSRAge();
				checkIC();
				checkIV();
				checkCD();
				checkCJ();
				checkPJ();
				checkPSJ();
				checksap();
				checkODMQ();
				checkODMA();
				checkodmDC();
				CollabSR();
				CheckBugsStat();
				checkOBBesc();
				checkCALLIBesc();
				checkCHATesc();
				CheckAtt();
				CheckKMStat();
				checkSEVCval();
				checkescdays();
				getBUG();
				AllActSupp();
				callinbounds();
				calloutbounds();
				chatcount();
				webconfcount();
				WARSIGcount();
				checkCompName();
				scroll();
			 }
		 },9000);
		}
	//},1000);
}

//function to get severity data
function getSRData(){
	var $data = "";
	var header = $('.dojoxGrid-master-header tbody').html();
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		if($(this).find('td').eq(1).text().toLowerCase().indexOf("severity") > -1)
		{
			var severity = $(this).find('tbody').html();
			var emplogin = $(this).find('td').eq(0).text();
			var newval = $(this).find('td').eq(4).text();
			
			srd_data_employee_login = srd_data_employee_login + emplogin + newval +"<br />"
			srd_data_flag = 1;
		}
	});
}

//function to get NRD data
function getNRD(){
	var header = $('.dojoxGrid-master-header tbody').html();
	var count = 0;
	var nrd_exp_stat = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Next Response Due" ) && (row.eq(3).text() != ''))
		{
			var nrd = $(this).find('tbody').html();
			var NRD_date1 = calculateDate(row.eq(5).text());
			var NRD_date2 = calculateDate(row.eq(3).text());
			if(NRD_date1 > NRD_date2)
			{
				count++;
				var NRD_name = $(this).find('tbody td').eq(0).text();
				var NRD_old_date = calculateDate($(this).find('tbody td').eq(3).text());
				var NRD_new_date = calculateDate($(this).find('tbody td').eq(5).text());
				var ack_nrd_time = ((NRD_new_date - NRD_old_date)/(1000*60*60)).toFixed(2);
				details = details +'<tr><td>'+ NRD_name +'</td><td>'+NRD_old_date+'</td><td>'+NRD_new_date+'</td><td>'+ack_nrd_time+' hours</td></tr>';
				nrd_old_date.push(NRD_old_date);
			}
		}
	});
	
	nrd_data_count = nrd_data_count + count;
	if (nrd_data_count>0)
	{
	nrd_data_details = '<table class="nrd_details" style="display:none"><tr><th>Modified By</th><th>Expired On</th><th>Modified On</th><th>Ack. Time Taken</th><th>Expired During</th><th>Classification</th></tr>'+details+'</table>';
	}
	else
	{
	nrd_data_details = "";
	}

}


//function to get Details of How NRD is set
function getNRDSets(){
	var nrdcount = 0;
	
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Next Response Due" ) && (row.eq(3).text() != '') && (row.eq(2).text() == "Modify" ) )
		{
			var nrdsets = $(this).find('tbody').html();
			var NRD_set_olddate = calculateDate(row.eq(3).text());
			var NRD_set_newdate = calculateDate(row.eq(4).text());
			if (NRD_set_newdate > NRD_set_olddate)
			{
			nrdcount++;
			var NRD_set_name = $(this).find('tbody td').eq(0).text();
			var NRD_set_old_date = calculateDate($(this).find('tbody td').eq(3).text());
			var NRD_set_new_date = calculateDate($(this).find('tbody td').eq(4).text());
			var NRD_SET_MOD_DATE = calculateDate($(this).find('tbody td').eq(5).text());
			var nrd_set_diff = ((NRD_set_new_date - NRD_set_old_date)/(1000*60*60*24)).toFixed(2);
			nrd_set_details = nrd_set_details +'<tr><td>'+ NRD_set_name +'</td><td>'+NRD_set_old_date+'</td><td>'+NRD_set_new_date+'</td><td>'+nrd_set_diff+'</td></tr>';
			nrd_old_date1.push(NRD_SET_MOD_DATE);
			}
			
		}
	});
	
	nrd_set_data_count = nrd_set_data_count + nrdcount;
	if (nrd_set_data_count>0)
	{
	nrd_set_data_details = '<table class="nrd_set_details" style="display:none"><tr><th>Set By</th><th>Old Value</th><th>New Value</th><th>Diff(In Days)</th><th>Set During</th></tr>'+nrd_set_details+'</table>';
	}
	else
	{
	nrd_set_data_details = "";
	}

	console.log("this is the value of nrd_set_data_count------"+nrd_set_data_count);
}



//function to check Escalation after SR creation days
function checkescdays()
{
		$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function()
			{
				var row = $(this).find('td');
				if((row.eq(1).text() == "Escl Status" ) && (row.eq(4).text() == "Escalated" ))
					{
						var ESCD_date1 = calculateDate(row.eq(5).text());
						escdate = ESCD_date1;
					}
			});
	
	var esc_agediff = ((escdate - sropenddateval)/(1000*60*60*24)).toFixed(2);
	esc_age = esc_agediff;
	
}

//Function to check the CallOut outbounds Before escalation
function checkOBBesc(){
var count = 0;
var OB_ESC_date1 = "";
var local_escltob = 0;
var local_escgtob = 0;
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Escl Status" ) && (row.eq(4).text() == "Escalated" ))
		{
			escdate =calculateDate(row.eq(5).text());
		}
	});
	
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('call - outbound ') >= 0)
		{
			var eco_raw = $(this).text().split(' ');
			var date_ob = eco_raw[5]+" "+eco_raw[6]+" "+eco_raw[7];
			OB_ESC_date1 = calculateDate(date_ob);
			if(escdate < OB_ESC_date1){
				local_escltob++;
			}
			else{
				local_escgtob++
			}
		}
	});
		
	escltob = local_escltob;
	escgtob = local_escgtob;
	
	}

//Function to check the CallIn bounds Before escalation
function checkCALLIBesc(){
var count = 0;
var callidd_date1 = "";
var local_escltib = 0;
var local_escgtib = 0;
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Escl Status" ) && (row.eq(4).text() == "Escalated" ))
		{
			escdate =calculateDate(row.eq(5).text());
		}
	});
	
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('call - inbound ') >= 0)
		{
			var ib_raw = $(this).text().split(' ');
			var date_ib = ib_raw[5]+" "+ib_raw[6]+" "+ib_raw[7];
			callidd_date1 = calculateDate(date_ib);
			if(escdate < callidd_date1){
				local_escltib++;
			}
			else{
				local_escgtib++
			}
		}
	});
	
	escltib = local_escltib;
	escgtib = local_escgtib;
	
	}
	
	
//Function to check Chat instances Before escalation
function checkCHATesc(){
var count = 0;
var chatdd_date1 = "";
var local_escltob = 0;
var local_escgtob = 0;
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Escl Status" ) && (row.eq(4).text() == "Escalated" ))
		{
			escdate =calculateDate(row.eq(5).text());
		}
	});
	
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('customer conversation') >= 0)
		{
			var chat_raw = $(this).text().split(' ');
			var date_chat_esc = chat_raw[4]+" "+chat_raw[5]+" "+chat_raw[6];
			chatdd_date1 = calculateDate(date_chat_esc);
			if(escdate < chatdd_date1){
				local_escltob++;
			}
			else{
				local_escgtob++
			}
		}
	});
		
	escltci = local_escltob;
	escgtci = local_escgtob;
	
	}
	

//function to check the owner
function checkOwner(){
		$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(4).text().toLowerCase().indexOf('@oracle.com') > 0) && (row.eq(1).text() == "Owner" ))
				{
				sr_owner_val = row.eq(4).html();
				owner_array[owner_counter++] = sr_owner_val + ' / ';
				}
		});
		}

//function to check the escalation owner
function checkESCOwner(){
		$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(0).text().toLowerCase().indexOf('@oracle.com') > 0) && (row.eq(1).text() == "Escl Owner" ))
				{
				sr_escowner_val = row.eq(4).html();
				escowner_array[escowner_counter++] = sr_escowner_val;
				}
		});
		}
		
//function to check the SR Severity Changes.

function checkSEVCval(){
		var sevvalcount = 0;
		$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var rowsev = $(this).find('td');
		if((rowsev.eq(2).text() == "Modify") && (rowsev.eq(1).text() == "Severity") && (rowsev.eq(3).text() != ''))
				{
				sevvalcount++;
				sr_sevvalc = rowsev.eq(4).html();
				sr_sevvalp = rowsev.eq(3).html();
				var sr_sevvalchange_date = calculateDate(rowsev.eq(5).text());
				prisevval_array[prisevval_counter++] = sr_sevvalc;
				
				var sevvaldiff = ((sr_sevvalchange_date - sropenddateval)/(1000*60*60*24)).toFixed(2);
				sevvaldetails = sevvaldetails  +'<tr><td>'+ sr_sevvalp +'</td><td>'+ sr_sevvalc +'</td><td>'+sr_sevvalchange_date+'</td><td>'+sevvaldiff+'</td></tr>';
				}
				
		});
		sev_val_details = '<table class="sev_val_details" style="display:none"><tr><th>From</th><th>To</th><th>Date</th><th>After Days</th></tr>'+sevvaldetails+'</table>';
		
		console.log ("this is sev val details logging"+sev_val_details);
		}		
		
//function to check the escalation level
function checkESCLevel(){
		var esccount = 0;
		$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(0).text().toLowerCase().indexOf('@oracle.com') > 0) && (row.eq(1).text() == "Escalation Level" ))
				{
				sr_esclvl_val = row.eq(4).html();
				esc_date_val11 = calculateDate(row.eq(5).text());
				esclvl_array[esclvl_counter++] = sr_esclvl_val;
				esccount++;
				var escdaysdiff = ((esc_date_val11 - sropenddateval)/(1000*60*60*24)).toFixed(2);
				escdetail = escdetail +'<tr><td>'+sr_esclvl_val+'</td><td>'+esc_date_val11+'</td><td>'+escdaysdiff+' (Days) From SR Open Date</td></tr>';
				}
		});
		console.log("array val of new_esclvl_array "+esclvl_array);
		if (esclvl_array.length>0)
				{
		escdetail_content = '<table class="escdetail_content" style="display:none"><tr><th>Escalation Level</th><th>Escalation Date</th><th>Escalation After</th></tr>'+escdetail+'</table>';
		}
		else{
		escdetail_content = "";
		}
		
		
		}	
//function to check the CAM Engagement level		
function checkCAMeng(){
		$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(0).text().toLowerCase().indexOf('@oracle.com') > 0) && (row.eq(1).text() == "CE Critical Date" ))
				{
				sr_cam_val = row.eq(4).html();
				cam_array[cam_counter++] = sr_cam_val;
				}
		});
		}	


function xfrcount(){
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if(row.eq(1).text() == "Transfer Count" )
				{
				xfr_count_val = row.eq(4).html();
				xfr_array[xfr_counter++] = xfr_count_val;
				}
		});
		}		
		
//function to get total NEW Status Days
function getNEWStatDays(){
	var old_nstat_date = "";
	var new_nstat_date = "";
	var ssstatus = "";
	var status = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var new_stat1 = row.eq(3).text().toLowerCase().indexOf('new');
		var new_stat2 = row.eq(4).text().toLowerCase().indexOf('new');
		
		
		if(new_stat1 > -1){
			if(!newstat_first_time){
				newstat_first_time = 1;
			}
			old_nstat_date = calculateDate(row.eq(5).html());
			newstat_array[newstat_counter++] = old_nstat_date;
		}
		else if(new_stat2 >  -1 ){
			if(!newstat_first_time){
				new_nstat_date = new Date();
				newstat_array[newstat_counter++] = new_nstat_date;
				newstat_first_time =1;
				new_nstat_date = calculateDate(row.eq(5).html());
				newstat_array[newstat_counter++] = new_nstat_date;
			}
			else{
				new_nstat_date = calculateDate(row.eq(5).html());
				newstat_array[newstat_counter++] = new_nstat_date;}
		}
				
	});
}

//function to get total WIP Days
function getWIPWorking(){
	var old_wip_date = "";
	var new_wip_date = "";
	var ssstatus = "";
	var status = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var wip_stat1 = row.eq(3).text().toLowerCase().indexOf('work in progress');
		var wip_stat2 = row.eq(4).text().toLowerCase().indexOf('work in progress');
		
		
		if(wip_stat1 > -1){
			if(!wip_first_time){
				wip_first_time = 1;
			}
			old_wip_date = calculateDate(row.eq(5).html());
			wip_array[cust_wip_counter++] = old_wip_date;
		}
		else if(wip_stat2 >  -1 ){
			if(!wip_first_time){
				new_wip_date = new Date();
				wip_array[cust_wip_counter++] = new_wip_date;
				wip_first_time =1;
				new_wip_date = calculateDate(row.eq(5).html());
				wip_array[cust_wip_counter++] = new_wip_date;
			}
			else{
				new_wip_date = calculateDate(row.eq(5).html());
				wip_array[cust_wip_counter++] = new_wip_date;}
		}
				
	});

}

//function to get total AIR Days
function getAIRWorking(){
	var old_air_date = "";
	var new_air_date = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var air_stat1 = row.eq(3).text().toLowerCase().indexOf('awaiting internal response');
		var air_stat2 = row.eq(4).text().toLowerCase().indexOf('awaiting internal response');
		
		
		if(air_stat1 > -1){
			if(!air_first_time){
				air_first_time = 1;
			}
			old_air_date = calculateDate(row.eq(5).html());
			air_array[cust_air_counter++] = old_air_date;
		}
		else if(air_stat2 >  -1 ){
			if(!air_first_time){
				new_air_date = new Date();
				air_array[cust_air_counter++] = new_air_date;
				air_first_time =1;
				new_air_date = calculateDate(row.eq(5).html());
				air_array[cust_air_counter++] = new_air_date;
			}
			else{
				new_air_date = calculateDate(row.eq(5).html());
				air_array[cust_air_counter++] = new_air_date;}
		}
				
	});

}

//function to get total Review Update Days
function getRVWWorking(){
	var old_rvw_date = "";
	var new_rvw_date = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var RVW_stat1 = row.eq(3).text().toLowerCase().indexOf('review update');
		var RVW_stat2 = row.eq(4).text().toLowerCase().indexOf('review update');
		
		
		if(RVW_stat1 > -1){
			if(!rvw_first_time){
				rvw_first_time = 1;
			}
			old_rvw_date = calculateDate(row.eq(5).html());
			RVW_array[cust_rvw_counter++] = old_rvw_date;
		}
		else if(RVW_stat2 >  -1 ){
			if(!rvw_first_time){
				new_rvw_date = new Date();
				RVW_array[cust_rvw_counter++] = new_rvw_date;
				rvw_first_time =1;
				new_rvw_date = calculateDate(row.eq(5).html());
				RVW_array[cust_rvw_counter++] = new_rvw_date;
			}
			else{
				new_rvw_date = calculateDate(row.eq(5).html());
				RVW_array[cust_rvw_counter++] = new_rvw_date;}
		}
				
	});
}


//function to get total Customer Working Days
function getCustomerWorking(){
	var old_cworking_date = "";
	var new_cworking_date = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var sol_offered1 = row.eq(3).text().toLowerCase().indexOf('customer working');
		var sol_offered2 = row.eq(4).text().toLowerCase().indexOf('customer working');
		
		
		if(sol_offered1 > -1){
			if(!cw_first_time){
				cw_first_time = 1;
			}
			old_cworking_date = calculateDate(row.eq(5).html());
			customer_array[cust_counter++] = old_cworking_date;
		}
		else if(sol_offered2 >  -1 ){
			if(!cw_first_time){
				new_cworking_date = new Date();
				customer_array[cust_counter++] = new_cworking_date;
				cw_first_time =1;
				new_cworking_date = calculateDate(row.eq(5).html());
				customer_array[cust_counter++] = new_cworking_date;
			}
			else{
				new_cworking_date = calculateDate(row.eq(5).html());
				customer_array[cust_counter++] = new_cworking_date;}
		}
				
	});
}
//function to get total Solution offered Days
function getsoloffDays(){
	var old_soloff_date = "";
	var new_soloff_date = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var cust_working1 = row.eq(3).text().toLowerCase().indexOf('solution offered');
		var cust_working2 = row.eq(4).text().toLowerCase().indexOf('solution offered');
		
		
		if(cust_working1 > -1){
			if(!sol_first_time){
				sol_first_time = 1;
			}
			old_soloff_date = calculateDate(row.eq(5).html());
			soloff_array[cust_sol_counter++] = old_soloff_date;
		}
		else if(cust_working2 >  -1 ){
			if(!sol_first_time){
				new_soloff_date = new Date();
				soloff_array[cust_sol_counter++] = new_soloff_date;
				sol_first_time =1;
				new_soloff_date = calculateDate(row.eq(5).html());
				soloff_array[cust_sol_counter++] = new_soloff_date;
			}
			else{
				new_soloff_date = calculateDate(row.eq(5).html());
				soloff_array[cust_sol_counter++] = new_soloff_date;}
		}
				
	});
}


//function to get Auto Close Days
function getAutoClose(){
	var old_aclose_date = "";
	var new_aclose_date = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var autoclose1 = row.eq(3).text().toLowerCase().indexOf('auto-close');
		var autoclose2 = row.eq(4).text().toLowerCase().indexOf('auto-close');
		
		
		if(autoclose1 > -1){
			if(!acl_first_time){
				acl_first_time = 1;
			}
			old_aclose_date = calculateDate(row.eq(5).html());
			autoclose_array[cust_acl_counter++] = old_aclose_date;
		}
		else if(autoclose2 >  -1 ){
			if(!acl_first_time){
				new_aclose_date = new Date();
				autoclose_array[cust_acl_counter++] = new_aclose_date;
				acl_first_time =1;
				new_aclose_date = calculateDate(row.eq(5).html());
				autoclose_array[cust_acl_counter++] = new_aclose_date;
			}
			else{
				new_aclose_date = calculateDate(row.eq(5).html());
				autoclose_array[cust_acl_counter++] = new_aclose_date;}
		}
				
	});
}

//function to get close instantiated days
function getCLIClose(){
	var old_cli_date = "";
	var new_cli_date = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var closeint1 = row.eq(3).text().toLowerCase().indexOf('close initiated');
		var closeint2 = row.eq(4).text().toLowerCase().indexOf('close initiated');
		
		
		if(closeint1 > -1){
			if(!cli_first_time){
				cli_first_time = 1;
			}
			old_cli_date = calculateDate(row.eq(5).html());
			cli_array[cust_cli_counter++] = old_cli_date;
		}
		else if(closeint2 >  -1 ){
			if(!cli_first_time){
				new_cli_date = new Date();
				cli_array[cust_cli_counter++] = new_cli_date;
				cli_first_time =1;
				new_cli_date = calculateDate(row.eq(5).html());
				cli_array[cust_cli_counter++] = new_cli_date;
			}
			else{
				new_cli_date = calculateDate(row.eq(5).html());
				cli_array[cust_cli_counter++] = new_cli_date;}
		}
				
	});

}

//function to get Close requested Days
function getCloseReqDays(){
	var old_closereq_date = "";
	var new_closereq_date = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var closereq1 = row.eq(3).text().toLowerCase().indexOf('close requested');
		var closereq2 = row.eq(4).text().toLowerCase().indexOf('close requested');
		
		
		if(closereq1 > -1){
			if(!creq_first_time){
				creq_first_time = 1;
			}
			old_closereq_date = calculateDate(row.eq(5).html());
			closereq_array[cust_close_req_counter++] = old_closereq_date;
		}
		else if(closereq2 >  -1 ){
			if(!creq_first_time){
				new_closereq_date = new Date();
				closereq_array[cust_close_req_counter++] = new_closereq_date;
				creq_first_time =1;
				new_closereq_date = calculateDate(row.eq(5).html());
				closereq_array[cust_close_req_counter++] = new_closereq_date;
			}
			else{
				new_closereq_date = calculateDate(row.eq(5).html());
				closereq_array[cust_close_req_counter++] = new_closereq_date;}
		}
				
	});
}

//function to get Development Working Days
function getDevelopmentWorking(){
	var old_dev_date = "";
	var new_dev_date = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var dev_working1 = row.eq(3).text().toLowerCase().indexOf('development working');
		var dev_working2 = row.eq(4).text().toLowerCase().indexOf('development working');
					
		if(dev_working1 > -1){
			if(!dev_first_time){
				dev_first_time = 1;
			}
			old_dev_date = calculateDate(row.eq(5).html());
			dev_array[dev_counter++] = old_dev_date;
		}
		else if(dev_working2 > -1){
			if(!dev_first_time){
				new_dev_date = new Date();
				dev_array[dev_counter++] = new_dev_date;
				dev_first_time =1;
				new_dev_date = calculateDate(row.eq(5).html());
				dev_array[dev_counter++] = new_dev_date;
			}
			else{
				new_dev_date = calculateDate(row.eq(5).html());
				
			dev_array[dev_counter++] = new_dev_date;}
		}
	});
}

//function to get Review Defect Days
function getRDEFWorking(){
	var old_rdef_date = "";
	var new_rdef_date = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var rvw_def_working1 = row.eq(3).text().toLowerCase().indexOf('review defect');
		var rvw_def_working2 = row.eq(4).text().toLowerCase().indexOf('review defect');
					
		if(rvw_def_working1 > -1){
			if(!rvw_def_first_time){
				rvw_def_first_time = 1;
			}
			old_rdef_date = calculateDate(row.eq(5).html());
			rdef_array[rdef_counter++] = old_rdef_date;
		}
		else if(rvw_def_working2 > -1){
			if(!rvw_def_first_time){
				new_rdef_date = new Date();
				rdef_array[rdef_counter++] = new_rdef_date;
				rvw_def_first_time =1;
				new_rdef_date = calculateDate(row.eq(5).html());
				rdef_array[rdef_counter++] = new_rdef_date;
			}
			else{
				new_rdef_date = calculateDate(row.eq(5).html());
				
			rdef_array[rdef_counter++] = new_rdef_date;}
		}
	});
}		


//function to get total Sub-Status changes Dates
function getSubStatDates(){
	var old_substat_date = "";
	var new_substat_date = "";
	var new_substat_val = "";
	var ssstatus = "";
	var status = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var substat1 = row.eq(4).text().toLowerCase().indexOf('work in progress');
		var substat2 = row.eq(4).text().toLowerCase().indexOf('solution offered');
		var substat3 = row.eq(4).text().toLowerCase().indexOf('review update');
		var substat4 = row.eq(4).text().toLowerCase().indexOf('auto-close');
		var substat5 = row.eq(4).text().toLowerCase().indexOf('customer working');
		var substat6 = row.eq(4).text().toLowerCase().indexOf('close requested');
		var substat7 = row.eq(4).text().toLowerCase().indexOf('close initiated');
		var substat8 = row.eq(4).text().toLowerCase().indexOf('development working');
		var substat9 = row.eq(4).text().toLowerCase().indexOf('awaiting internal response');
		var substat10 = row.eq(4).text().toLowerCase().indexOf('review defect');
		var substat11 = row.eq(4).text().toLowerCase().indexOf('new');
			
		if(substat1 >  -1 || substat2 >  -1 || substat3 >  -1 || substat4 >  -1 || substat5 >  -1 || substat6 >  -1 || substat7 >  -1 || substat8 >  -1 || substat9 >  -1 || substat10 >  -1 || substat11 > -1){
			if(!substat_first_time){
				new_substat_date = new Date();
				substatdate_array[substat_counter++] = new_substat_date;
				substat_first_time =1;
				new_substat_date = calculateDate(row.eq(5).html());
				new_substat_val = row.eq(4).html();
				substatdate_array[substat_counter++] = new_substat_date;
				substatval_array[substatval_counter++] = new_substat_val;
			}
			else{
				new_substat_date = calculateDate(row.eq(5).html());
				new_substat_val = row.eq(4).html();
				substatdate_array[substat_counter++] = new_substat_date;
				substatval_array[substatval_counter++] = new_substat_val;
				}
		}
				
	});
	
}
	
	
//function to get total Row 3 Sub-Status changes Dates
function getSubStatRow3Dates(){
	var old_substat_date1 = "";
	var new_substat3_date = "";
	var new_substat3_val = "";
		$.each($('div[id="auditGrid-page-'+(global_grid_count)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		
		var substat11 = row.eq(3).text().toLowerCase().indexOf('work in progress');
		var substat21 = row.eq(3).text().toLowerCase().indexOf('solution offered');
		var substat31 = row.eq(3).text().toLowerCase().indexOf('review update');
		var substat41 = row.eq(3).text().toLowerCase().indexOf('auto-close');
		var substat51 = row.eq(3).text().toLowerCase().indexOf('customer working');
		var substat61 = row.eq(3).text().toLowerCase().indexOf('close requested');
		var substat71 = row.eq(3).text().toLowerCase().indexOf('close initiated');
		var substat81 = row.eq(3).text().toLowerCase().indexOf('development working');
		var substat91 = row.eq(3).text().toLowerCase().indexOf('awaiting internal response');
		var substat101 = row.eq(3).text().toLowerCase().indexOf('review defect');
		var substat111 = row.eq(3).text().toLowerCase().indexOf('new');
			
		if(substat11 >  -1 || substat21 >  -1 || substat31 >  -1 || substat41 >  -1 || substat51 >  -1 || substat61 >  -1 || substat71 >  -1 || substat81 >  -1 || substat91 >  -1 || substat101 >  -1 || substat111 > -1){
			if(!substat3_first_time){
				//new_substat3_date = new Date();
			//	substat3date_array[substat3_counter++] = new_substat3_date;
				substat3_first_time =1;
				new_substat3_date = calculateDate(row.eq(5).html());
				new_substat3_val = row.eq(4).html();
				substat3date_array[substat3_counter++] = new_substat3_date;
				substat3val_array[substat3val_counter++] = new_substat3_val;
			}
			else{
				new_substat3_date = calculateDate(row.eq(5).html());
				new_substat3_val = row.eq(4).html();
				substat3date_array[substat3_counter++] = new_substat3_date;
				substat3val_array[substat3val_counter++] = new_substat3_val;
				}
		}
			
	});
	
}



//function to count number of bugs associated to the SR
function getBUG(){
	var bid = $('.externalBugIcon').attr('name');
	//$(w.document.body).find('table.bugs tr').append('<td></td>')
	//$(w.document.body).find('table.bugs tr').append(bid);
	global_grid_count++;
}

	
//function to check age of SR
function checkSRAge()
	{	
		if(srstatus == 'Open')
			{
				var srage_date2 = new Date();
				var diff = ((srage_date2 - sropenddateval)/(1000*60*60*24)).toFixed(2);
				sr_age = diff;
		
			}
		
		else
			{
				var diff = ((srcloseddateval - sropenddateval)/(1000*60*60*24)).toFixed(2);
				sr_age = diff;
			}
	}


//function to count call out-bounds To customer
function calloutbounds(){
	var outbTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	var ccccount = 0;
	var accccount = 0;
	$.each(outbTitle,function(){
		if($(this).text().toLowerCase().indexOf('call - outbound ') >= 0)
		{
		var callobtxt_raw = $(this).text().split(' ');
		var callobtxt_ob = callobtxt_raw[5]+" "+callobtxt_raw[6]+" "+callobtxt_raw[7];
		callobtxtdate = calculateDate(callobtxt_ob);
		callobdetails[accccount++] = '<tr><td>'+ callobtxtdate +'</td></tr>';
		callob_date[ccccount] = callobtxtdate;
		ccccount++;
		}
		
	});
	
	
	upd_callout_count = ccccount;
	if( upd_callout_count >0)
		{
			callob_data_details = '<table class="callob_data_details" style="display:none"><tr><th>Call Date</th><th>Frequency(In Days)</th><th>Called During</th></tr>'+callobdetails+'</table>';
		}
	else
		{
			callob_data_details = "";
		}
	}

//function to count chat conversations from customer
function chatcount(){
	var outbTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	var countchhhat = 0;
	var count1 = 0;
	$.each(outbTitle,function(){
		if($(this).text().toLowerCase().indexOf('customer conversation ') >= 0)
		{
			var chat_raw = $(this).text().split(' ');
			var chat = chat_raw[4]+" "+chat_raw[5]+" "+chat_raw[6];
			chattxdate = calculateDate(chat);
			chatobdetails[count1++] = '<tr><td>'+ chattxdate +'</td></tr>';
			chatob_date[countchhhat++] = chattxdate;
		}
	});
	upd_chat_count = countchhhat;
	
	
	if(upd_chat_count > 0)
		{
		chat_data_details = '<table class="chat_data_details" style="display:none"><tr><th>Chat Date</th><th>Frequency(In Days)</th><th>Chat 	During</th></tr>'+chatobdetails+'</table>';
		}
	else
		{
		chat_data_details = "";
		}
	}
	
	
//function to check web conferences
function webconfcount(){
	var webconfTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="containerNode"]');
	var count = 0;
	$.each(webconfTitle,function(){
		if($(this).text().toLowerCase().indexOf('https://stbeehive.oracle.com/bconf/') >= 0 || $(this).text().toLowerCase().indexOf('https://oracle-swtsc-support.webex.com/') >= 0 )
		count++;
	});
	web_conf_count = count;
	}
	
	//function to check Warning Signals
function WARSIGcount(){
	var webconfTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="containerNode"]');
	var asapcount = 0;
	var bccount = 0;
	var cricount = 0;
	var glcount = 0;
	var anyupcount = 0;
	var count_val1 = 0;
	var count_val2 = 0;
	var count_val3 = 0;
	var count_val4 = 0;
	var count_val5 = 0;
	var count_val6 = 0;
	var count_val7 = 0;
	var anyupdcpcount = 0;
	
	var count_possig2 = 0;
	var count_possig3 = 0;
	var count_possig4 = 0;
	
	$.each(webconfTitle,function(){
		var temptitle = $(this).closest('.dijitTitlePaneContentOuter').prev().find('div[dojoattachpoint="titleNode"]');
		if(temptitle.text().toLowerCase().indexOf('update from customer') >= 0)
		{
			if($(this).text().toLowerCase().indexOf('asap') >= 0)
				{
					var warsig_raw1 = $(temptitle).text().split(' ');
					var date_warsig_asap = warsig_raw1[5]+" "+warsig_raw1[6]+" "+warsig_raw1[7];
					var date_warsig_asap_date = calculateDate(date_warsig_asap);
					date_warsig_asap_details[count_val1++] = '<tr><td>'+date_warsig_asap_date+'</td></tr>';
					asapcount++;
					date_warsig_asap_date_new.push(date_warsig_asap_date);
				}
			else if($(this).text().toLowerCase().indexOf('business critical') >= 0)
				{
					var warsig_raw2 = $(temptitle).text().split(' ');
					var date_warsig_buscri = warsig_raw2[5]+" "+warsig_raw2[6]+" "+warsig_raw2[7];
					var date_warsig_buscri_date = calculateDate(date_warsig_buscri);
					date_warsig_buscri_details[count_val2++] = '<tr><td>'+date_warsig_buscri_date+'</td></tr>';
					bccount++;
					date_warsig_buscri_date_new.push(date_warsig_buscri_date);
				
				}
			else if($(this).text().toLowerCase().indexOf('critical impact') >= 0 || $(this).text().toLowerCase().indexOf('critical') >= 0)
				{
					var warsig_raw3 = $(temptitle).text().split(' ');
					var date_warsig_criimp = warsig_raw3[5]+" "+warsig_raw3[6]+" "+warsig_raw3[7];
					var date_warsig_criimp_date = calculateDate(date_warsig_criimp);
					date_warsig_criimp_details[count_val3++] = '<tr><td>'+date_warsig_criimp_date+'</td></tr>';
					cricount++;
					date_warsig_criimp_date_new.push(date_warsig_criimp_date);
			
				}
			else if($(this).text().toLowerCase().indexOf('go live') >= 0)
				{
					var warsig_raw4 = $(temptitle).text().split(' ');
					var date_warsig_golivimp = warsig_raw4[5]+" "+warsig_raw4[6]+" "+warsig_raw4[7];
					var date_warsig_goliv_date = calculateDate(date_warsig_golivimp);
					date_warsig_goliv_details[count_val4++] = '<tr><td>'+date_warsig_goliv_date+'</td></tr>';
					glcount++;
					date_warsig_goliv_date_new.push(date_warsig_goliv_date);
				
				}
			else if($(this).text().toLowerCase().indexOf('any update') >= 0)
				{
					var warsig_raw5 = $(temptitle).text().split(' ');
					var date_warsig_anyupd = warsig_raw5[5]+" "+warsig_raw5[6]+" "+warsig_raw5[7];
					var date_warsig_anyupd_date = calculateDate(date_warsig_anyupd);
					date_warsig_anyupd_details[count_val5++] = '<tr><td>'+date_warsig_anyupd_date+'</td></tr>';
					anyupcount++;
					date_warsig_anyupd_date_new.push(date_warsig_anyupd_date);
				
				}
			else if($(this).text().toLowerCase().indexOf('updated me with the current progress') >= 0)
				{
					var warsig_raw6 = $(temptitle).text().split(' ');
					var date_warsig_anyupdcp = warsig_raw6[5]+" "+warsig_raw6[6]+" "+warsig_raw6[7];
					var date_warsig_anyupdcp_date = calculateDate(date_warsig_anyupdcp);
					date_warsig_anyupdcp_details[count_val6++] = '<tr><td>'+date_warsig_anyupdcp_date+'</td></tr>';
					anyupdcpcount++;
					date_warsig_anyupdcp_date_new.push(date_warsig_anyupdcp_date);
					
				}
			else if($(this).text().toLowerCase().indexOf('any news') >= 0)
				{
					var warsig_raw7 = $(temptitle).text().split(' ');
					var date_warsig_anynews = warsig_raw7[5]+" "+warsig_raw7[6]+" "+warsig_raw7[7];
					var date_warsig_anynews_date = calculateDate(date_warsig_anynews);
					date_warsig_anynews_details[count_val7++] = '<tr><td>'+date_warsig_anynews_date+'</td></tr>';
					anynewscounter++;
					date_warsig_anynews_date_new.push(date_warsig_anynews_date);
					
				}
				
			else if($(this).text().toLowerCase().indexOf('very good') >= 0 || $(this).text().toLowerCase().indexOf('glad') >= 0)
				{
					var possig_raw1 = $(temptitle).text().split(' ');
					var date_possig_raw1 = possig_raw1[5]+" "+possig_raw1[6]+" "+possig_raw1[7];
					var date_possig_raw1_date = calculateDate(date_possig_raw1);
					var content_in = $(this).html();
					possig_raw1_details[count_possig1++] = '<tr><td>'+date_possig_raw1_date+'</td><td>'+content_in+'</td></tr>';
					possig1counter++;
					                    
				}	

			else if($(this).text().toLowerCase().indexOf('excellent ') >= 0 || $(this).text().toLowerCase().indexOf('wonderful ') >= 0)
				{
					var possig_raw2 = $(temptitle).text().split(' ');
					var date_possig_raw2 = possig_raw2[5]+" "+possig_raw2[6]+" "+possig_raw2[7];
					var date_possig_raw2_date = calculateDate(date_possig_raw2);
					possig_raw2_details[count_possig2++] = '<tr><td>'+date_possig_raw2_date+'</td></tr>';
					possig2counter++;
					possig_raw2_date_new.push(date_possig_raw2_date);
				
				}	

			else if(($(this).text().toLowerCase().indexOf('expertise') >= 0))
				{
					var possig_raw3 = $(temptitle).text().split(' ');
					var date_possig_raw3= possig_raw3[5]+" "+possig_raw3[6]+" "+possig_raw3[7];
					var date_possig_raw3_date = calculateDate(date_possig_raw3);
					possig_raw3_details[count_possig3++] = '<tr><td>'+date_possig_raw3_date+'</td></tr>';
					possig3counter++;
					possig_raw3_date_new.push(date_possig_raw3_date);
				
				}
			else if(($(this).text().toLowerCase().indexOf('quick response') >= 0))
				{
					var possig_raw4 = $(temptitle).text().split(' ');
					var date_possig_raw4= possig_raw4[5]+" "+possig_raw4[6]+" "+possig_raw4[7];
					var date_possig_raw4_date = calculateDate(date_possig_raw4);
					possig_raw4_details[count_possig4++] = '<tr><td>'+date_possig_raw4_date+'</td></tr>';
					possig4counter++;
					possig_raw4_date_new.push(date_possig_raw4_date);
				
				}
		}
	});
	asap_count_val = asapcount;
	bccount_val = bccount;
	cricount_val = cricount;
	glcount_val = glcount;
	anyupcount_val = anyupcount;
	anyup1count_val = anyupdcpcount;
	anynewscount_val = anynewscounter;
	
	possig1counter_val = possig1counter;
	possig2counter_val = possig2counter;
	possig3counter_val = possig3counter;	
	possig4counter_val = possig4counter;
	
		if (asap_count_val>0)
			{
				asapcount_val_detail = '<table class="asapcount_val_detail" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+date_warsig_asap_details+'</table>';
			}
		else
			{
				asapcount_val_detail = "";
			}
		if (bccount_val>0)
			{
				buscricount_val_detail = '<table class="buscricount_val_detail" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+date_warsig_buscri_details+'</table>';
			}
		else
			{
				buscricount_val_detail = "";
			}
		if (cricount_val>0)
			{
				criimpcount_val_detail = '<table class="criimpcount_val_detail" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+date_warsig_criimp_details+'</table>';
			}
		else
			{
				criimpcount_val_detail = "";
			}
		if (glcount_val>0)
			{
				golivcount_val_detail = '<table class="golivcount_val_detail" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+date_warsig_goliv_details+'</table>';
			}
		else
			{
				golivcount_val_detail = "";
			}
		if (anyupcount_val>0)
			{
				anyupcount_val_detail = '<table class="anyupcount_val_detail" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+date_warsig_anyupd_details+'</table>';
			}
		else
			{
				anyupcount_val_detail = "";
			}
		if (anyup1count_val>0)
			{
				anyupdcpcount_val_detail = '<table class="anyupdcpcount_val_detail" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+date_warsig_anyupdcp_details+'</table>';
			}
		else
			{
				anyupdcpcount_val_detail = "";
			}
	
		if (anynewscount_val>0)
			{
				anynewscount_val_detail = '<table class="anynewscount_val_detail" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+date_warsig_anynews_details+'</table>';
			}
		else
			{
				anynewscount_val_detail = "";
			}
			
	if (possig2counter_val>0)
			{
				possig2_val_details = '<table class="possig2_val_details" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+possig_raw2_details+'</table>';
			}
		else
			{
				possig2_val_details = "";
			}
			
	if (possig3counter_val>0)
			{
				possig3_val_details = '<table class="possig3_val_details" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+possig_raw3_details+'</table>';
			}
		else
			{
				possig3_val_details = "";
			}
			
	if (possig4counter_val>0)
			{
				possig4_val_details = '<table class="possig4_val_details" style="display:none"><tr><th>Customer Used this Word On</th><th>SR Sub Status</th><th>Details</th><th>SR Age</th></tr>'+possig_raw4_details+'</table>';
			}
		else
			{
				possig4_val_details = "";
			}		
	
	}
	

//Function to count updates from Oracle Support
function updatesbyEngineer(){
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	var count = 0;
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm action plan') >= 0)
		count++;
	});
	upd_engg_count = count;
}

//Function to get dates of all activity from Oracle Support
function AllActSupp(){
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleBarNode"]');
	var count = 0;
	var allact_raw = "";
	var allact_dates = "";
	$.each(tabTitle,function(){
	
		if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('notes') >= 0 && $(this).find('[type="checkbox"]').is(":checked"))
		{
		var sText = $(this).find('div[dojoattachpoint="titleNode"]').text();
		if (sText.toLowerCase().indexOf('collaborations notes') > -1)
		sText = sText.replace("Collaborations ", "");
		
		allact_raw = sText.split(' ');
		allact_dates = allact_raw[3]+" "+allact_raw[4]+" "+allact_raw[5];
		allactdate_array[count++] = calculateDate(allact_dates);
		
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm action plan') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[5]+" "+allact_raw[6]+" "+allact_raw[7];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('call - outbound') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[5]+" "+allact_raw[6]+" "+allact_raw[7];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('email - outbound') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[5]+" "+allact_raw[6]+" "+allact_raw[7];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm issue clarification') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[5]+" "+allact_raw[6]+" "+allact_raw[7];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm issue verification') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[5]+" "+allact_raw[6]+" "+allact_raw[7];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm cause determination') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[5]+" "+allact_raw[6]+" "+allact_raw[7];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm cause justification') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[5]+" "+allact_raw[6]+" "+allact_raw[7];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm proposed solution(s)') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[5]+" "+allact_raw[6]+" "+allact_raw[7];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm proposed solution justif') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[6]+" "+allact_raw[7]+" "+allact_raw[8];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm solution/action plan') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[5]+" "+allact_raw[6]+" "+allact_raw[7];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm question') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[4]+" "+allact_raw[5]+" "+allact_raw[6];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
		else if($(this).find('div[dojoattachpoint="titleNode"]').text().toLowerCase().indexOf('odm answer') >= 0 && $(this).find('[type="checkbox"]').is(":checked") )
		{
		allact_raw = $(this).find('div[dojoattachpoint="titleNode"]').text().split(' ');
		allact_dates = allact_raw[4]+" "+allact_raw[5]+" "+allact_raw[6];
		allactdate_array[count++] = calculateDate(allact_dates);
		}
	});
	
	all_act_count = count;
	console.log("allactdate_array"+allactdate_array);
}


//function to check odm issue clarification
function checkIC(){
	var ic_dd_date1 = "";
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm issue clarification') >= 0)
		{
			var ic_raw = $(this).text().split(' ');
			var date_ic = ic_raw[5]+" "+ic_raw[6]+" "+ic_raw[7];
			ic_dd_date1 = calculateDate(date_ic);
			if(srstatus == "Open")
				{
					ic_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
				}
			else
				{
					ic_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
				}
			
		}
	});
	
	var ic_agediff = ((ic_dd_date1 - sropenddateval)/(1000*60*60*24)).toFixed(2)
	ic_age = ic_agediff;
}

//function to check odm issue verification
function checkIV(){
	var iv_dd_date1 = "";
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm issue verification') >= 0)
		{
			var iv_raw = $(this).text().split(' ');
			var date_iv = iv_raw[5]+" "+iv_raw[6]+" "+iv_raw[7];
			iv_dd_date1 = calculateDate(date_iv);
				if(srstatus == "Open")
					{
						iv_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
					}
				else
					{
						iv_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
					}
		}
	});

	var iv_agediff = ((iv_dd_date1 - sropenddateval)/(1000*60*60*24)).toFixed(2)
	iv_age = iv_agediff;
}

//function to check odm cause determination
function checkCD(){
	var cd_dd_date1 = "";
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm cause determination') >= 0)
		{
			var cd_raw = $(this).text().split(' ');
			var date_cdd = cd_raw[5]+" "+cd_raw[6]+" "+cd_raw[7];
			cd_dd_date1 = calculateDate(date_cdd);
			if(srstatus == "Open")
			{
			cd_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
			}
			else
			{
			cd_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
			}
		}
	});
	
	var cd_agediff = ((cd_dd_date1 - sropenddateval)/(1000*60*60*24)).toFixed(2)
	cd_age = cd_agediff;
}

//function to check odm cause Justification
function checkCJ(){
	var cj_dd_date1 = "";
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm cause justification') >= 0)
		{
			var cj_raw = $(this).text().split(' ');
			var date_CJD = cj_raw[5]+" "+cj_raw[6]+" "+cj_raw[7];
			cj_dd_date1 = calculateDate(date_CJD);
			if(srstatus == "Open")
			{
			cj_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
			}
			else
			{
			cj_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
			}
		}
	});
	
	var cj_agediff = ((cj_dd_date1 - sropenddateval)/(1000*60*60*24)).toFixed(2)
	cj_age = cj_agediff;
}

//function to check odm Proposed Solution
function checkPJ(){
	var pj_dd_date1 = "";
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm proposed solution(s)') >= 0)
		{
			var PJ_raw = $(this).text().split(' ');
			var date_PJD= PJ_raw[5]+" "+PJ_raw[6]+" "+PJ_raw[7];
			pj_dd_date1 = calculateDate(date_PJD);
			if(srstatus == "Open")
				{
					ps_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
				}
			else
				{
					ps_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
				}
		}
	});
	
	var ps_agediff = ((pj_dd_date1 - sropenddateval)/(1000*60*60*24)).toFixed(2)
	ps_age = ps_agediff;
}

//function to check odm Proposed Solution Justification
function checkPSJ(){
	var psj_date1 = "";
	var tabpsjTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabpsjTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm proposed solution justif') >= 0)
		{
			var PSJ_raw = $(this).text().split(' ');
			var date_PSJD = PSJ_raw[6]+" "+PSJ_raw[7]+" "+PSJ_raw[8];
			psj_date1 = calculateDate(date_PSJD);
			if(srstatus == "Open")
			{
			psj_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
			}
			else
			{
			psj_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
			}
		}
	});
	
	var psj_agediff = ((psj_date1 - sropenddateval)/(1000*60*60*24)).toFixed(2)
	psj_age = psj_agediff;
}

//function to check odm SAP
function checksap(){
	var sap_date1 = "";
	var tabsapTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabsapTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm solution/action plan') >= 0)
		{
			var SAP_raw = $(this).text().split(' ');
			var date_SAP = SAP_raw[5]+" "+SAP_raw[6]+" "+SAP_raw[7];
			sap_date1 = calculateDate(date_SAP);
			if(srstatus == "Open")
			{
			sap_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
			}
			else
			{
			sap_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
			}
		}
	});
	
	var sap_agediff = ((sap_date1 - sropenddateval)/(1000*60*60*24)).toFixed(2)
	sap_age = sap_agediff;
}
//function to check ODM Question
function checkODMQ(){
	var odmqdate1 = "";
	var tabTitleODMQ = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitleODMQ,function(){
		if($(this).text().toLowerCase().indexOf('odm question') >= 0)
		{
			var odmq_raw = $(this).text().split(' ');
			var date_ODMQ = odmq_raw[4]+" "+odmq_raw[5]+" "+odmq_raw[6];
			odmqdate1 = calculateDate(date_ODMQ);
			if(srstatus == "Open")
				{
					odm_qu_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
				}
			else
				{
					odm_qu_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
				}
		}
	});

	var qdiff = ((odmqdate1 - sropenddateval)/(1000*60*60*24)).toFixed(2)
	odm_qu = qdiff;
}


function checkODMA(){
	var odmadate1 = "";
	var tabTitleODMQ = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitleODMQ,function(){
		if($(this).text().toLowerCase().indexOf('odm answer') >= 0)
		{
			var odmq_raw = $(this).text().split(' ');
			var date_iv = odmq_raw[4]+" "+odmq_raw[5]+" "+odmq_raw[6];
			odmadate1 = calculateDate(date_iv);
			if(srstatus == "Open")
			{
			odm_ans_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
			}
			else
			{
			odm_ans_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
			}
		}
	});
	
	var adiff = ((odmadate1 - sropenddateval)/(1000*60*60*24)).toFixed(2)
	odm_ans = adiff;
}


function checkodmDC(){
	var dcdate = "";
	var dccount = 0;
	var tabTitleODMdc = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitleODMdc,function(){
		if($(this).text().toLowerCase().indexOf('data collection') >= 0)
		{
			dccount++;
		}
	});
	
	dc_odm_count = dccount;
}



//function to count updates from customer
function updateFromCustomer(){
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	var count = 0;
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('update from customer') >= 0)
		count++;
	});
	upd_cust_count = count;
}


//Function to check Collab SR's

function CollabSR(){
	var tabTitle = $('#refElemChildrenSR').find('div[dojoattachpoint="containerNode"] > div');
	var count = 0;
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('internal collab') >= 0)
		count++;
		collab_sr_count_content = tabTitle.text().replace(/Expand to see detailsStatus:|Substatus:|Owner:|Severity:|Updated:/g, '<br>')
		collab_sr_count_content = collab_sr_count_content.replace(/Internal Collab SR/g, '<br><br>Internal Collab SR');
	});
	collab_sr_count = count;
	}

//Function to check any bugs 

function CheckBugsStat(){
	var tabbugTitle = $('#refElemBUGs').find('div[dojoattachpoint="containerNode"] > div');
	var bagcount = 0;
	$.each(tabbugTitle,function(){
		if($(this).text().toLowerCase().indexOf('bugdb') >= 0)
		bagcount++;
		collab_bug_count_content = tabbugTitle.text().replace(/Create new link/g, '')
		collab_bug_count_content = collab_bug_count_content.replace(/BugDB/g, '<br>BugDB');
	});
	collab_bug_count = bagcount;
	}
	
//Function to check any KM 

function CheckKMStat(){
	var tabkmTitle = $('#refElemKM').find('div[dojoattachpoint="containerNode"] > div');
	var kmcount = 0;
	$.each(tabkmTitle,function(){
		if($('#refElemKM').find('span[dojoattachpoint="titleRowCountNode"]').text() != "(0)")
		kmcount++;
		collab_km_count_content = tabkmTitle.text().replace(/Create new link/g, '');
				
	});
	collab_km_count = kmcount;
	
	}
	
	
//Function to check any Attachments 

function CheckAtt(){
	var tabAttTitle = $('#refElemAttachments').find('div[dojoattachpoint="containerNode"] > div');
	var attcount = 0;
	$.each(tabAttTitle,function(){
		if($('#refElemAttachments').find('span[dojoattachpoint="titleRowCountNode"]').text() != "(0)")
		attcount++;
		att_content = tabAttTitle.text().replace(/       /g, '<br>')
		
	});
	att_count = attcount;
		
	}


//function to count call in-bounds from customer
function callinbounds(){
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	var count = 0;
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('call - inbound') >= 0)
		count++;
	});
	upd_callin_count = count;
}

		
//function to check the Component
function checkCompName(){
	var compname = "";
	var tabacompname = $('#unmaximizedSRHeaderTable').find('.srHeaderAttribute');
	$.each(tabacompname,function(){
		if($(this).text().toLowerCase().indexOf('group:') >= 0){
			compname = $(this).parent().find('input').val();
		}
		});
		current_compnameval = compname;
		}		
							
	
//function to calculate date
var $months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

function calculateDate(date){
	var date_time = date.split(' ');
	var month = "";
    var date1 = date_time[0];
	var time = date_time[1].split(':');
	var hrs = "";    
    var from = date1.split('-');
	if(from.length < 2){
	
        from = date1.split('/');
	    var temp = from[0];
	    from[0] = from[1];
	    from[1] = temp; 
		month = from[1]-1;
	   }
	else{
		month = $.inArray(from[1].toLowerCase(),$months)
	
	}
    var day = from[0];
    if(date_time[2]=="AM" && parseInt(time[0]) == 12)
		{
			hrs = parseInt(time[0])-12; 
		 }
	else if(date_time[2]=="PM" && (parseInt(time[0]) > 0 && parseInt(time[0]) < 12)){
		hrs = parseInt(time[0])+12; 
	}
	else
   {	
    hrs = time[0];
		}
	var year = from[2];
   if(year.length == 2)
    year = 20 + year;
    var min = time[1];
    var sec = time[2];
    var d = new Date(year,month,day,hrs,min,sec);
    return d;
}

var currentval = 0;

function scroll(){
if($('div[id="auditGrid-page-'+(global_grid_count-1)+'"]').length > 0){
	scrolled=$('div[id="auditGrid-page-'+(global_grid_count-1)+'"]').innerHeight()*global_grid_count;
	total_scrolled = $(".dojoxGrid-scrollbox .dojoxGrid-content").innerHeight();
	
		$(".dojoxGrid-scrollbox").animate({
			scrollTop:  scrolled
		});
	
}
else{
	clearInterval(y);
	removeOverlay();
	constructDoc();
	}

 };
 
 
 //show overlay function
function displayOverlay(text) {
    $("<table id='overlay'><tbody><tr><td>" + text + "</td></tr></tbody></table>").css({
        "position": "fixed",
        "top": "0px",
        "left": "0px",
        "width": "100%",
        "height": "100%",
        "background-color": "rgba(0,0,0,.5)",
        "z-index": "10000",
        "vertical-align": "middle",
        "text-align": "center",
        "color": "#F4EC9D",
        "font-size": "60px",
        "font-weight": "bold",
        "cursor": "wait"
    }).appendTo("body");
}


 //remove overlay function
function removeOverlay() {
    $("#overlay").remove();
}

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

//original cal days function
function calcDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
		}
	return days.toFixed(2);
	}

//cal days for new status function
function calcNEWDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
		}
	return days.toFixed(2);
	}

 function calcDevDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
		}
	return days.toFixed(2);
	
}

 function calcRDEFDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
		}
	return days.toFixed(2);
	}

 function calcSolDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
		}
	return days.toFixed(2);
	}

 function calcWIPDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
		
	}
	return days.toFixed(2);
	
}

 function calcAIRDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
	}
	return days.toFixed(2);
	}
 function calcACLDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
		}
	return days.toFixed(2);
	}

 function calcCLIDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
		}
	return days.toFixed(2);
	}

 function calcCREQDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
	}
	return days.toFixed(2);
	}

 function calcRVWQDays(array){
	var days = 0;
	for(var i=0;i<array.length;i++){
		days = days + (array[i] - array[i+1])/(1000*60*60*24);
		i++;
		}
	return days.toFixed(2);
	}
 

function constructDoc(){
	
	var cown = owner_array[0];
	if(escowner_array[0] == ""){
	var escownerval = escowner_array[1];}
	else{var escownerval = escowner_array[0];}
	var escllvl = esclvl_array[0];
	var countcown = unique(owner_array).length;
	var countcowndetails = unique(owner_array);
	var camval = cam_array.length;
	var xfrval = xfr_array[0];
	// newstat_array_tmp = unique(newstat_array);
	//newstat_days_val = calcNEWDays(newstat_array);
	cust_days = calcDays(customer_array);
	dev_days = calcDevDays(dev_array);
	soloff_days = calcSolDays(soloff_array);
	wip_days = calcWIPDays(wip_array);
	air_days = calcAIRDays(air_array);
	auto_closedays = calcACLDays(autoclose_array);
	closereq_days = calcCREQDays(closereq_array);
	rvw_days = calcRVWQDays(RVW_array);
	cli_days = calcCLIDays(cli_array);
	rdef_days = calcRDEFDays(rdef_array);
	var total_cust_days = (parseFloat(cust_days) + parseFloat(soloff_days) + parseFloat(auto_closedays) + parseFloat(cli_days)).toFixed(2);
	var total_support_days = (parseFloat(closereq_days) + parseFloat(wip_days) + parseFloat(air_days) + parseFloat(rvw_days) + parseFloat(rdef_days)).toFixed(2);
	
	var srNo = $('#srHeader .dijitTitlePaneTextNode span:last-child').text().split('SR');
	var data = {};
	data.type = "sr_data"
	data.title = srNo[1];
	data.splittitleacc = current_accnameval;
	data.splittitlecomp = current_compnameval;
	data.srcomponent = srcomponent;
	data.srsubcomponent = srsubcomponent;
	data.rootcause = rootcause;
	data.reasoncode = reasoncode;
	data.knownissue = knownissue;
	data.cemail = cemail;
	
	data.srage = 'Total Age of SR:('+sr_age+')';
	data.total_support_days = total_support_days;
	data.dev_days = dev_days;
	data.total_cust_days = total_cust_days;
	
	data.srstatsubstat = srstatus+' - ('+srsubstatus+')';
	data.cown = cown;
	
	var wip_data_details = "";
	if(wip_array.length > 0)
		{
			var i;
			var diff = 0;
			var wip_details = "";
			for(i=0; i<wip_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((wip_array[i-1]-wip_array[i])/(1000*60*60*24)).toFixed(2);
							wip_details = wip_details + '<tr><td>'+wip_array[i]+'</td><td>'+wip_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.wip_data_details = '<table class="wip_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+wip_details+'</table>';	
		}
	
	var air_data_details = "";
	if(air_array.length > 0)
		{
			var i;
			var diff = 0;
			var air_details = "";
			for(i=0; i<air_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((air_array[i-1]-air_array[i])/(1000*60*60*24)).toFixed(2);
							air_details = air_details + '<tr><td>'+air_array[i]+'</td><td>'+air_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.air_data_details = '<table class="air_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+air_details+'</table>';	
		}
	
	var rvw_data_details = "";
	if(RVW_array.length > 0)
		{
			var i;
			var diff = 0;
			var rvw_details = "";
			for(i=0; i<RVW_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((RVW_array[i-1]-RVW_array[i])/(1000*60*60*24)).toFixed(2);
							rvw_details = rvw_details + '<tr><td>'+RVW_array[i]+'</td><td>'+RVW_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.rvw_data_details = '<table class="rvw_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+rvw_details+'</table>';	
		}
	
	var dev_data_details = "";
	if(dev_array.length > 0)
		{
			var i;
			var diff = 0;
			var dev_details = "";
			for(i=0; i<dev_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((dev_array[i-1]-dev_array[i])/(1000*60*60*24)).toFixed(2);
							dev_details = dev_details + '<tr><td>'+dev_array[i]+'</td><td>'+dev_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.dev_data_details = '<table class="dev_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+dev_details+'</table>';	
		}
	
	var rdef_data_details = "";
	if(rdef_array.length > 0)
		{
			var i;
			var diff = 0;
			var rdef_details = "";
			for(i=0; i<rdef_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((rdef_array[i-1]-rdef_array[i])/(1000*60*60*24)).toFixed(2);
							rdef_details = rdef_details + '<tr><td>'+rdef_array[i]+'</td><td>'+rdef_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.rdef_data_details = '<table class="rdef_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+rdef_details+'</table>';	
		}
	
	var cw_data_details = "";
	if(customer_array.length > 0)
		{
			var i;
			var diff = 0;
			var cw_details = "";
			for(i=0; i<customer_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((customer_array[i-1]-customer_array[i])/(1000*60*60*24)).toFixed(2);
							cw_details = cw_details + '<tr><td>'+customer_array[i]+'</td><td>'+customer_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.cw_data_details = '<table class="cw_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+cw_details+'</table>';	
		}
		
	var soloff_data_details = "";
	if(soloff_array.length > 0)
		{
			var i;
			var diff = 0;
			var soloff_details = "";
			for(i=0; i<soloff_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((soloff_array[i-1]-soloff_array[i])/(1000*60*60*24)).toFixed(2);
							soloff_details = soloff_details + '<tr><td>'+soloff_array[i]+'</td><td>'+soloff_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.soloff_data_details = '<table class="soloff_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+soloff_details+'</table>';	
		}
	
	var autoclose_data_details = "";
	if(autoclose_array.length > 0)
		{
			var i;
			var diff = 0;
			var autoclose_details = "";
			for(i=0; i<autoclose_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((autoclose_array[i-1]-autoclose_array[i])/(1000*60*60*24)).toFixed(2);
							autoclose_details = autoclose_details + '<tr><td>'+autoclose_array[i]+'</td><td>'+autoclose_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.autoclose_data_details = '<table class="autoclose_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+autoclose_details+'</table>';	
		}	

	var cli_data_details = "";
	if(cli_array.length > 0)
		{
			var i;
			var diff = 0;
			var cli_details = "";
			for(i=0; i<cli_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((cli_array[i-1]-cli_array[i])/(1000*60*60*24)).toFixed(2);
							cli_details = cli_details + '<tr><td>'+cli_array[i]+'</td><td>'+cli_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.cli_data_details = '<table class="cli_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+cli_details+'</table>';	
		}	
	
	var closereq_data_details = "";
	if(closereq_array.length > 0)
		{
			var i;
			var diff = 0;
			var closereq_details = "";
			for(i=0; i<closereq_array.length; i++)
					{
						if(i%2 == 0);
						else
							{
							diff = ((closereq_array[i-1]-closereq_array[i])/(1000*60*60*24)).toFixed(2);
							closereq_details = closereq_details + '<tr><td>'+closereq_array[i]+'</td><td>'+closereq_array[i-1]+'</td><td>'+diff+'</td></tr>';
							}		
					}
		data.closereq_data_details = '<table class="closereq_data_details" style="display:none"><tr><th>From</th><th>To</th><th>Diff(Days)</th></tr>'+closereq_details+'</table>';	
		}		
	
	if(topacc_val.length>0){data.topacc_val = topacc_val;}else{data.topacc_val = 'Nil';};
	if(irddonedate = "")
	{
	data.irdvalue = 'Not Done Yet'
	};
	if(irddonedate > irdrespdate)
	{
	data.irdvalue = 'Missed';
	}
	else
	{
	data.irdvalue = 'Met';
	};
	data.nrd_data_count = nrd_data_count;
	data.nrd_data_details = nrd_data_details;
	
	data.nrd_set_data_count = 'Details';
	data.nrd_set_data_details = nrd_set_data_details;
	data.callob_data_details = callob_data_details;
	data.chat_data_details = chat_data_details;
	data.escdetail_content = escdetail_content;
	
	var nrd_exp_stat_counter = 0;
	var nrd_exp_stat_array = [];
	for(var j = 0;j< nrd_old_date.length;j++)
	{
				var crossflag=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag==0; i++)
				{
					if (substatdate_array[i] < nrd_old_date[j])
					{
					if(substatdate_array.length == substatval_array.length)
						nrd_exp_stat_array[nrd_exp_stat_counter] = substatval_array[i];
					else
						nrd_exp_stat_array[nrd_exp_stat_counter] = substatval_array[i-1];
						
					crossflag = 1;
					nrd_exp_stat_counter++;
					}
				}
				if(!crossflag && i == substatdate_array.length){
						nrd_exp_stat_array[nrd_exp_stat_counter] = substatval_array[substatval_array.length-1];
						nrd_exp_stat_counter++;
					}
	}
	
	 data.nrd_exp_stat_array = nrd_exp_stat_array;
	
	var nrd_exp_stat_counter1 = 0;
	var nrd_exp_stat_array1 = [];
	for(var j = 0;j< nrd_old_date1.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < substat3date_array.length && crossflag1==0; i++)
				{
					if (substat3date_array[i] <= nrd_old_date1[j])
					{
					nrd_exp_stat_array1[nrd_exp_stat_counter1] = substat3val_array[i];
							
					crossflag1 = 1;
					nrd_exp_stat_counter1++;
					}
				}
		
	}
	
	 data.nrd_exp_stat_array1 = nrd_exp_stat_array1;
	
	
	data.asapcount_val_detail = asapcount_val_detail;
	data.anyupcount_val_detail = anyupcount_val_detail;
	data.buscricount_val_detail = buscricount_val_detail;
	data.criimpcount_val_detail = criimpcount_val_detail;
	data.golivcount_val_detail = golivcount_val_detail;
	data.anyupdcpcount_val_detail = anyupdcpcount_val_detail;
	data.anynewscount_val_detail = anynewscount_val_detail;
	
	/* positive signals data send*/
	data.possig1_val_details = possig1_val_details;
	data.possig2_val_details = possig2_val_details;
	data.possig3_val_details = possig3_val_details;
	data.possig4_val_details = possig4_val_details;
	
	
	var warsig_upd_counter = 0;
	var warsig_upd_array = [];
	
	for(var j = 0;j< date_warsig_anyupd_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
				{
					if (substatdate_array[i] <= date_warsig_anyupd_date_new[j])
					{
					warsig_upd_array[warsig_upd_counter] = substatval_array[i];
					crossflag1 = 1;
					warsig_upd_counter++;
					}
				}
		
	}
	
	 data.warsig_upd_array = warsig_upd_array;
	
	var warsig1_upd1_counter1 = 0;
	var warsig1_upd1_array1 = [];
	var warsig_upd_sr_age = [];
	for(var j = 0;j< date_warsig_anyupd_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= date_warsig_anyupd_date_new[j])
					{
					warsig1_upd1_array1[warsig1_upd1_counter1] = ((date_warsig_anyupd_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					warsig_upd_sr_age[warsig1_upd1_counter1] = ((date_warsig_anyupd_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);					
					
					crossflag1 = 1;
					warsig1_upd1_counter1++;
					}
				}
		
	}
	
	 data.warsig1_upd1_array1 = warsig1_upd1_array1;	
	 data.warsig_upd_sr_age = warsig_upd_sr_age;
	
	var warsig_asap_counter = 0;
	var warsig_asap_array = [];
	for(var j = 0;j< date_warsig_asap_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
				{
					if (substatdate_array[i] <= date_warsig_asap_date_new[j])
					{
					warsig_asap_array[warsig_asap_counter] = substatval_array[i];
							
					crossflag1 = 1;
					warsig_asap_counter++;
					}
				}
		
	}
	
	 data.warsig_asap_array = warsig_asap_array;
	
	var warsig1_asap1_counter1 = 0;
	var warsig1_asap1_array1 = [];
	var warsig_asap_sr_age = [];
	for(var j = 0;j< date_warsig_asap_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= date_warsig_asap_date_new[j])
					{
					warsig1_asap1_array1[warsig1_asap1_counter1] = ((date_warsig_asap_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					warsig_asap_sr_age[warsig1_asap1_counter1] = ((date_warsig_asap_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					warsig1_asap1_counter1++;
					}
				}
		
	}
	
	 data.warsig1_asap1_array1 = warsig1_asap1_array1;	
	 data.warsig_asap_sr_age = warsig_asap_sr_age;
	
	var warsig_buscri_counter = 0;
	var warsig_buscri_array = [];
	for(var j = 0;j< date_warsig_buscri_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
				{
					if (substatdate_array[i] <= date_warsig_buscri_date_new[j])
					{
					warsig_buscri_array[warsig_buscri_counter] = substatval_array[i];
							
					crossflag1 = 1;
					warsig_buscri_counter++;
					}
				}
		
	}
	
	 data.warsig_buscri_array = warsig_buscri_array;
	
	var warsig1_buscri1_counter1 = 0;
	var warsig1_buscri1_array1 = [];
	var warsig_buscri_sr_age = [];
	for(var j = 0;j< date_warsig_buscri_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= date_warsig_buscri_date_new[j])
					{
					warsig1_buscri1_array1[warsig1_buscri1_counter1] = ((date_warsig_buscri_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					warsig_buscri_sr_age[warsig1_buscri1_counter1] = ((date_warsig_buscri_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					warsig1_buscri1_counter1++;
					}
				}
		
	}
	
	 data.warsig1_buscri1_array1 = warsig1_buscri1_array1;	
	 data.warsig_buscri_sr_age = warsig_buscri_sr_age;	
	 
	var warsig_criimp_counter = 0;
	var warsig_criimp_array = [];
	for(var j = 0;j< date_warsig_criimp_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
				{
					if (substatdate_array[i] <= date_warsig_criimp_date_new[j])
					{
					warsig_criimp_array[warsig_criimp_counter] = substatval_array[i];
							
					crossflag1 = 1;
					warsig_criimp_counter++;
					}
				}
		
	}
	
	 data.warsig_criimp_array = warsig_criimp_array;
	
	var warsig1_criimp1_counter1 = 0;
	var warsig1_criimp1_array1 = [];
	var warsig_criimp_sr_age = [];
	for(var j = 0;j< date_warsig_criimp_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= date_warsig_criimp_date_new[j])
					{
					warsig1_criimp1_array1[warsig1_criimp1_counter1] = ((date_warsig_criimp_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					warsig_criimp_sr_age[warsig1_criimp1_counter1] = ((date_warsig_criimp_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					console.log("date_warsig_criimp_date_new[j]"+date_warsig_criimp_date_new[j]+"--"+j+"-----allactdate_array"+allactdate_array[i]+"-----"+i+"------"+date_warsig_criimp_date_new[j]-allactdate_array[i]);
					warsig1_criimp1_counter1++;
					}
					
				}
		
	}
	
	//console.log("date_warsig_criimp_date_new[j]----"+date_warsig_criimp_date_new[j]+"allactdate_array[i]---"+allactdate_array[i]);
	//	console.log("warsig1_criimp1_array1"+warsig1_criimp1_array1);
	 data.warsig1_criimp1_array1 = warsig1_criimp1_array1;	
	 data.warsig_criimp_sr_age = warsig_criimp_sr_age;
	
	var warsig_golive_counter = 0;
	var warsig_golive_array = [];
	for(var j = 0;j< date_warsig_goliv_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
				{
					if (substatdate_array[i] <= date_warsig_goliv_date_new[j])
					{
					warsig_golive_array[warsig_golive_counter] = substatval_array[i];
							
					crossflag1 = 1;
					warsig_golive_counter++;
					}
				}
		
	}
	
	 data.warsig_golive_array = warsig_golive_array;
	
	var warsig1_golive1_counter1 = 0;
	var warsig1_golive1_array1 = [];
	var warsig_golive_sr_age = [];
	for(var j = 0;j< date_warsig_goliv_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= date_warsig_goliv_date_new[j])
					{
					warsig1_golive1_array1[warsig1_golive1_counter1] = ((date_warsig_goliv_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					warsig_golive_sr_age[warsig1_golive1_counter1] = ((date_warsig_goliv_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					warsig1_golive1_counter1++;
					}
				}
		
	}
	
	 data.warsig1_golive1_array1 = warsig1_golive1_array1;	
	 data.warsig_golive_sr_age = warsig_golive_sr_age;
	
	var warsig_anyupdcp_counter = 0;
	var warsig_anyupdcp_array = [];
	for(var j = 0;j< date_warsig_anyupdcp_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
				{
					if (substatdate_array[i] <= date_warsig_anyupdcp_date_new[j])
					{
					warsig_anyupdcp_array[warsig_anyupdcp_counter] = substatval_array[i];
							
					crossflag1 = 1;
					warsig_anyupdcp_counter++;
					}
				}
		
	}
	
	 data.warsig_anyupdcp_array = warsig_anyupdcp_array;
	
	var warsig1_anyupdcp1_counter1 = 0;
	var warsig1_anyupdcp1_array1 = [];
	var warsig_anyupdcp_sr_age = [];
	for(var j = 0;j< date_warsig_anyupdcp_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= date_warsig_anyupdcp_date_new[j])
					{
					warsig1_anyupdcp1_array1[warsig1_anyupdcp1_counter1] = ((date_warsig_anyupdcp_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					warsig_anyupdcp_sr_age[warsig1_anyupdcp1_counter1] = ((date_warsig_anyupdcp_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					warsig1_anyupdcp1_counter1++;
					}
				}
		
	}
	
	 data.warsig1_anyupdcp1_array1 = warsig1_anyupdcp1_array1;	
	 data.warsig_anyupdcp_sr_age = warsig_anyupdcp_sr_age;
	

	var warsig_anynews_counter = 0;
	var warsig_anynews_1_array = [];
	for(var j = 0;j< date_warsig_anynews_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
				{
					if (substatdate_array[i] <= date_warsig_anynews_date_new[j])
					{
					warsig_anynews_1_array[warsig_anynews_counter] = substatval_array[i];
							
					crossflag1 = 1;
					warsig_anynews_counter++;
					}
				}
		
	}
	
	 data.warsig_anynews_1_array = warsig_anynews_1_array;	
	 
	var anynews_counter1 = 0;
	var any_news_array1 = [];
	var anynews_sr_age = [];
	for(var j = 0;j< date_warsig_anynews_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= date_warsig_anynews_date_new[j])
					{
					any_news_array1[anynews_counter1] = ((date_warsig_anynews_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					anynews_sr_age[anynews_counter1] = ((date_warsig_anynews_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					anynews_counter1++;
					}
				}
		
	}
	
	 data.any_news_array1 = any_news_array1;	
	 data.anynews_sr_age = anynews_sr_age;
	 
	/* Positive Signals*/
	
	var possig1c = 0;
	var possig1a = [];
	for(var j = 0;j< possig_raw1_date_new.length;j++)
		{
					var crossflag1=0;
					var i=0;
					for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
					{
						if (substatdate_array[i] <= possig_raw1_date_new[j])
						{
						possig1a[possig1c] = substatval_array[i];
								
						crossflag1 = 1;
						possig1c++;
						}
					}
			
		}
	
	 data.possig1a = possig1a;	
	 
	var possigc1 = 0;
	var possiga1 = [];
	var possig1_sr_age = [];
	for(var j = 0;j< possig_raw1_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= possig_raw1_date_new[j])
					{
					possiga1[possigc1] = ((possig_raw1_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					possig1_sr_age[possigc1] = ((possig_raw1_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					possigc1++;
					}
				}
		
	}
	
	 data.possiga1 = possiga1;	
	 data.possig1_sr_age = possig1_sr_age;
	
		var possig2c = 0;
	var possig2a = [];
	for(var j = 0;j< possig_raw2_date_new.length;j++)
		{
					var crossflag1=0;
					var i=0;
					for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
					{
						if (substatdate_array[i] <= possig_raw2_date_new[j])
						{
						possig2a[possig2c] = substatval_array[i];
								
						crossflag1 = 1;
						possig2c++;
						}
					}
			
		}
	
	 data.possig2a = possig2a;	
	 
	var possigc2 = 0;
	var possiga2 = [];
	var possig2_sr_age = [];
	for(var j = 0;j< possig_raw2_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= possig_raw2_date_new[j])
					{
					possiga2[possigc2] = ((possig_raw2_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					possig2_sr_age[possigc2] = ((possig_raw2_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					possigc2++;
					}
				}
		
	}
	
	 data.possiga2 = possiga2;	
	 data.possig2_sr_age = possig2_sr_age;
	
		var possig3c = 0;
	var possig3a = [];
	for(var j = 0;j< possig_raw3_date_new.length;j++)
		{
					var crossflag1=0;
					var i=0;
					for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
					{
						if (substatdate_array[i] <= possig_raw3_date_new[j])
						{
						possig3a[possig3c] = substatval_array[i];
								
						crossflag1 = 1;
						possig3c++;
						}
					}
			
		}
	
	 data.possig3a = possig3a;	
	 
	var possigc3 = 0;
	var possiga3 = [];
	var possig3_sr_age = [];
	for(var j = 0;j< possig_raw3_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= possig_raw3_date_new[j])
					{
					possiga3[possigc3] = ((possig_raw3_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					possig3_sr_age[possigc3] = ((possig_raw3_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					possigc3++;
					}
				}
		
	}
	
	 data.possiga3 = possiga3;	
	 data.possig3_sr_age = possig3_sr_age;
	
		var possig4c = 0;
	var possig4a = [];
	for(var j = 0;j< possig_raw4_date_new.length;j++)
		{
					var crossflag1=0;
					var i=0;
					for(i = 0; i < substatdate_array.length && crossflag1==0; i++)
					{
						if (substatdate_array[i] <= possig_raw4_date_new[j])
						{
						possig4a[possig4c] = substatval_array[i];
								
						crossflag1 = 1;
						possig4c++;
						}
					}
			
		}
	
	 data.possig4a = possig4a;	
	 
	var possigc4 = 0;
	var possiga4 = [];
	var possig4_sr_age = [];
	for(var j = 0;j< possig_raw4_date_new.length;j++)
	{
				var crossflag1=0;
				var i=0;
				for(i = 0; i < allactdate_array.length && crossflag1==0; i++)
				{
					if (allactdate_array[i] <= possig_raw4_date_new[j])
					{
					possiga4[possigc4] = ((possig_raw4_date_new[j]-allactdate_array[i])/(1000*60*60*24)).toFixed(2);
					possig4_sr_age[possigc4] = ((possig_raw4_date_new[j]-sropenddateval)/(1000*60*60*24)).toFixed(2);							
					crossflag1 = 1;
					possigc4++;
					}
				}
		
	}
	
	 data.possiga4 = possiga4;	
	 data.possig4_sr_age = possig4_sr_age;
	
	
	  	
	var callob_freq_array = [];
	for(var j = 0;j< callob_date.length;j++)
	{
		callob_freq_array.push(callob_date[j]);
	}
	
	callob_freq_array.push(sropenddateval);
	
	var call_freq_diff = [];
	for(var j = 0;j < callob_freq_array.length-1;j++)
	{
		call_freq_diff.push(((callob_freq_array[j]-callob_freq_array[j+1])/(1000*60*60*24)).toFixed(2));
	}
	data.call_freq_diff = call_freq_diff;
	
	var callob_data_counter = 0;
	var callob_data_array = [];
	for(var j = 0;j< callob_date.length;j++)
	{
				var crossflag=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag==0; i++)
				{
					if (substatdate_array[i] < callob_date[j])
					{
					if(substatdate_array.length == substatval_array.length)
						callob_data_array[callob_data_counter] = substatval_array[i];
					else
						callob_data_array[callob_data_counter] = substatval_array[i-1];
						
					crossflag = 1;
					callob_data_counter++;
					}
				}
				if(!crossflag && i == substatdate_array.length){
						callob_data_array[callob_data_counter] = substatval_array[substatval_array.length-1];
						callob_data_counter++;
					}
	}
	
	 data.callob_data_array = callob_data_array;
	
	var chatd_freq_array = [];
	for(var j = 0;j< chatob_date.length;j++)
	{
		chatd_freq_array.push(chatob_date[j]);
	}

	chatd_freq_array.push(sropenddateval);
	
	var chatd_freq_diff = [];
	for(var j = 0;j < chatd_freq_array.length-1;j++)
	{
		chatd_freq_diff.push(((chatd_freq_array[j]-chatd_freq_array[j+1])/(1000*60*60*24)).toFixed(2));
	}
	data.chatd_freq_diff = chatd_freq_diff;
	
	var chatd_data_counter = 0;
	var chatd_data_array = [];

	for(var j = 0;j< chatob_date.length;j++)
	{
				var crossflag=0;
				var i=0;
				for(i = 0; i < substatdate_array.length && crossflag==0; i++)
				{
					if (substatdate_array[i] < chatob_date[j])
					{
					if(substatdate_array.length == substatval_array.length)
						chatd_data_array[chatd_data_counter] = substatval_array[i];
					else
						chatd_data_array[chatd_data_counter] = substatval_array[i-1];
						
					crossflag = 1;
					chatd_data_counter++;
					}
				}
				if(!crossflag && i == substatdate_array.length){
						chatd_data_array[chatd_data_counter] = substatval_array[substatval_array.length-1];
						chatd_data_counter++;
					}
	}
	
	 data.chatd_data_array = chatd_data_array;
	 
	if(ic_age >= 0)
	{
	data.ic_age = 'Done in '+ic_age+' (days)';
	data.ic_content = ic_content;
	}
	else
	{
	data.ic_age = 'Not Done';
	}
	
	if(iv_age >= 0)
	{
	data.iv_age = 'Done in '+iv_age+' (days)';
	data.iv_content = iv_content;
	}
	else
	{
	data.iv_age = 'Not Done';
	}
	
	if(cd_age >= 0)
	{
	data.cd_age = 'Done in '+cd_age+' (days)';
	data.cd_content = cd_content;
	}
	else
	{
	data.cd_age = 'Not Done';
	}
	
	if(cj_age >= 0)
	{
	data.cj_age = 'Done in '+cj_age+' (days)';
	data.cj_content = cj_content;
	}
	else
	{
	data.cj_age = 'Not Done';
	}
	
	if(ps_age >= 0)
	{
	data.ps_age = 'Done in '+ps_age+' (days)';
	data.ps_content = ps_content;
	}
	else
	{
	data.ps_age = 'Not Done';
	}
	
	if(psj_age >= 0)
	{
	data.psj_age = 'Done in '+psj_age+' (days)';
	data.psj_content = psj_content;
	}
	else
	{
	data.psj_age = 'Not Done';
	}
	
	if(sap_age >= 0)
	{
	data.sap_age = 'Done in '+sap_age+' (days)';
	data.sap_content = sap_content;
	}
	else
	{
	data.sap_age = 'Not Done';
	}
	
	if(odm_qu >= 0)
	{
	data.odm_qu = 'Done in '+odm_qu+' (days)';
	data.odm_qu_content = odm_qu_content;
	}
	else
	{
	data.odm_qu = 'Not Done';
	}
	
	if(odm_ans >= 0)
	{
	data.odm_ans = 'Done in '+odm_ans+' (days)';
	data.odm_ans_content = odm_ans_content;
	}
	else
	{
	data.odm_ans = 'Not Done';
	}
	
	if(dc_odm_count > 0)
	{
	data.dc_odm_count = dc_odm_count + 'Tag(s)';
	}
	else
	{
	data.dc_odm_count = 'No Tags Found';
	}
	
	
	 if(prisevval_array.length > 0){
		data.prisevva_val = 'Yes';
		data.sev_val_details = sev_val_details;
		}
		else
		{
		data.prisevva_val = 'No Changes';
		};
	
	data.countcown = countcown;
	data.countcowndetails = countcowndetails;
	data.xfrval = xfrval;
	if(atStatus.length >0)
	{
	data.atStatus = atStatus;
	}
	else
	{
	data.atStatus = 'No Data';
	}
	if(collab_sr_count > 0)
	{
	data.collab_sr_count = 'Yes ('+collab_sr_count+')';
	data.collab_sr_count_content = collab_sr_count_content;
	}
	else
	{ 
	data.collab_sr_count = 'No'; 
	}
	
	
	if(collab_bug_count > 0)
	{
	data.collab_bug_count = 'Yes ('+collab_bug_count+')';
	data.collab_bug_count_content = collab_bug_count_content;
	}
	else
	{ 
	data.collab_bug_count = 'No'; 
	}
	
	if(collab_km_count > 0)
	{
	data.collab_km_count = 'Yes';
	data.collab_km_count_content = collab_km_count_content;
	}
	else
	{ 
	data.collab_km_count = 'No'; 
	}
	
	if(att_count > 0)
	{
	var econt = $('#refElemAttachments').find('span[dojoattachpoint="titleRowCountNode"]').text();
	data.att_count = 'Yes '+econt;
	data.att_content = att_content;
	}
	else
	{ 
	data.att_count = 'No'; 
	}
	
	if(esc_age >= 0)
	{
	data.eschead = 'Escalation Details';
	data.escownerval = escownerval.toLowerCase();
	data.esc_age = esc_age+'- Days';
	data.escllvl = escllvl;
	data.escgtob = escgtob;
	data.escgtib = escgtib;
	data.escgtci = escgtci;
	data.escltob = escltob;
	data.escltib = escltib;
	data.escltci = escltci;
	}
	else
	{
	data.eschead = 'Escalation Details - [SR Never Escalated]';
	data.escownerval = '-';
	data.esc_age = '-';
	data.escllvl = '-';
	data.escgtob = '-';
	data.escgtib = '-';
	data.escgtci = '-';
	data.escltob = '-';
	data.escltib = '-';
	data.escltci = '-';
	}
	
	if(camval >0)
	{
	data.camval = 'Yes';
	}
	else
	{
	data.camval = 'No';
	}
	
	if(upd_cust_count >0)
	{
	data.upd_cust_count = upd_cust_count;
	}
	else
	{
	data.upd_cust_count = 'Nil';
	}
	
	if(upd_engg_count >0)
	{
	data.upd_engg_count = upd_engg_count;
	}
	else
	{
	data.upd_engg_count = 'Nil';
	}
	
	if(upd_callin_count >0)
	{
	data.upd_callin_count = upd_callin_count;
	}
	else
	{
	data.upd_callin_count = 'Nil';
	}
	
	if(upd_callout_count >0)
	{
	data.upd_callout_count = upd_callout_count;
	}
	else
	{
	data.upd_callout_count = 'Nil';
	}

	if(upd_chat_count >0)
	{
	data.upd_chat_count = upd_chat_count;
	}
	else
	{
	data.upd_chat_count = 'Nil';
	}
	
	if(web_conf_count >0)
	{
	data.web_conf_count = web_conf_count;
	}
	else
	{
	data.web_conf_count = 'Nil';
	}
	
	if(asap_count_val >0)
	{
	data.asap_count_val = asap_count_val;
	}
	else
	{
	data.asap_count_val = 'Nil';
	}
	
	if(bccount_val >0)
	{
	data.bccount_val = bccount_val;
	}
	else
	{
	data.bccount_val = 'Nil';
	}
	
	if(cricount_val >0)
	{
	data.cricount_val = cricount_val;
	}
	else
	{
	data.cricount_val = 'Nil';
	}
	
	if(glcount_val >0)
	{
	data.glcount_val = glcount_val;
	}
	else
	{
	data.glcount_val = 'Nil';
	}

	if(anyupcount_val >0)
	{
	data.anyupcount_val = anyupcount_val;
	}
	else
	{
	data.anyupcount_val = 'Nil';
	}

	if(anyup1count_val >0)
	{
	data.anyup1count_val = anyup1count_val;
	}
	else
	{
	data.anyup1count_val = 'Nil';
	}
	
	if(anynewscount_val >0)
	{
	data.anynewscount_val = anynewscount_val;
	}
	else
	{
	data.anynewscount_val = 'Nil';
	}
	
	if(possig1counter_val > 0)
	{
		data.possig1counter_val = possig1counter_val;
	}
	else
	{
		data.possig1counter_val = 'Nil';
	}
	
	if(possig2counter_val > 0)
	{
		data.possig2counter_val = possig2counter_val;
	}
	else
	{
		data.possig2counter_val = 'Nil';
	}
	
	if(possig3counter_val > 0)
	{
		data.possig3counter_val = possig3counter_val;
	}
	else
	{
		data.possig3counter_val = 'Nil';
	}
	
	if(possig4counter_val > 0)
	{
		data.possig4counter_val = possig4counter_val;
	}
	else
	{
		data.possig4counter_val = 'Nil';
	}
	
	
	data.wip_days = wip_days;
	data.air_days = air_days;
	data.rvw_days = rvw_days;
	data.dev_days = dev_days;
	data.rdef_days = rdef_days;
	
	
	data.cust_days = cust_days;
	data.soloff_days = soloff_days;
	data.auto_closedays = auto_closedays;
	data.cli_days = cli_days;
	data.closereq_days = closereq_days;
	
	data.srproduct = srproduct;
	if (Val247 == "true")
	{
	data.prioval = prioval+'(24/7) Y';
	}
	else
	{
	data.prioval = prioval;
	}
	chrome.runtime.sendMessage(data);
			
	}
	

