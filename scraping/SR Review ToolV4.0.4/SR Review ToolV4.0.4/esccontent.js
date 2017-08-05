var xyz = "";
var esc_sr_num_val = "";
var esc_product_line = "";
var esc_product = "";
var esc_sropenddateval = "";
var esc_sropendate = "";
var acc_name_esc = "";
var esc_sr_prioval = "";
var esc_srstatus = "";
var esc_srcloseddate = "";
var esc_srcloseddateval ="";
var esc_sub_status = "";
var esc_topacc_val = "";

//var checkobjval_msg = [];
chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
		case "escsyn":
		var esc_status_true = $('#escalationStatus').val()
		
		var body = $('body');
		var allElem = $('#showAllBtn_label');
		var srelem = body.find('img[title="SR Header Audit"]');
		var maximize = body.find('img[title="Maximize"]');
		
		srelem.css('background-color','green');
		allElem.css('background-color','green');
		esc_displayOverlay("Please wait while we review for Escalation Synopsis on this SR....DONOT Tab out / DONOT Do Any SCROLLS on MOUSE ..just stay on this page leaving your mouse idle for accurate results");	
		maximize.trigger('click');
		
		setTimeout(function(){
			esc_sropendate = $('#MaximizedSRHeaderDialog td[title="Date Created"]').nextAll().eq(2).find('input').val()
			esc_srcloseddate = $('#MaximizedSRHeaderDialog td[title="Closed Date"]').nextAll().eq(1).find('input').val()
			esc_sub_status = $('#MaximizedSRHeaderDialog td[title="Substatus"]').nextAll().eq(2).find('input').val()
			esc_topacc_val = $('#MaximizedSRHeaderDialog td[title="Primary Classification"]').nextAll().eq(1).find('input').val()
			esc_product = $('#MaximizedSRHeaderDialog #productDescription').val()
			esc_product_line = $('#MaximizedSRHeaderDialog #productLine').val()
			esc_sr_num_val =$('#MaximizedSRHeaderDialog #srNumber').val()
			if (esc_sropendate.length !=0)
			{
			esc_sropenddateval = esccalculateDate(esc_sropendate);
			}
			
			if (esc_srcloseddate.length !=0)
			{
			esc_srcloseddateval = esccalculateDate(esc_srcloseddate);
			}
			
			
			acc_name_esc = $('#MaximizedSRHeaderDialog td[title="Account"]').nextAll().eq(2).find('input').val()
			esc_sr_prioval = $('#MaximizedSRHeaderDialog td[title="Severity"]').nextAll().eq(2).find('input').val()
			esc_srstatus = $('#MaximizedSRHeaderDialog td[title="Status"]').nextAll().eq(2).find('input').val()
			
			var close = $('#MaximizedSRHeaderDialog span[title="Cancel"]');
			close.trigger('click');
			allElem.trigger('click');
			srelem.trigger('click');
			runescdetails();
		},2000);
		
		break;
    
	}
});



var global_grid_count_esc = 0;

var yesc = "";
var esc_sr_escowner_val = "";
var esc_owner_array = [];
var esc_owner_counter = 0;
var esc_sr_age = 0;
var new_esc_age = 0;
var esc_new_date = "";
var new_sr_esclvl_val = "";
var new_esclvl_counter = 0;
var new_esclvl_array = [];
var new_esc_date_val11 = "";
var new_escdetail = "";
var new_escdetail_content = "";
var sr_escsevvalc = "";
var sr_escsevvalp = "";
var esc_prisevval_array = [];
var new_esc_prisevval_array = [];
var esc_prisevval_counter = 0;
var new_esc_prisevval_counter = 0;
var esc_sevvaldetails = "";
var esc_sev_val_details = "";
//var esc_sevvaldiff = "";
var sr_escs247 = "";
var esc_247_array = [];
var esc_247_counter = 0;
var esc_ic_content = "";
var esc_ic_age = "";	
var esc_ODMQ_content = "";
var esc_odmq_age = "";
var new_esc_date_val11_array = [];
var new_esc_date_val11_counter = 0;
var escdaysdiff_array = [];
var escdaysdiff_counter = 0;
var esc_new_sr_escowner_val = "";
var esc_new_escowner_array = [];
var esc_new_escowner_counter = 0;
var esc_activity_escalated_by = [];
var esc_activity_escalated_by_counter = 0;
var esc_act_by = "";
var esc_new_lvl_pencil_array = [];
var esc_new_lvl_pencil_counter = 0;
var ActivityFld_statusEscalationfs_array = [];
var ActivityFld_statusEscalationfs_counter = 0;
var ActivityFld_resolutionCodeEscalationfs_array = [];
var ActivityFld_resolutionCodeEscalationfs_counter = 0;
var ActivityFld_categoryEscalationfs_array = [];
var ActivityFld_categoryEscalationfs_counter = 0;
var esc_due_array = [];
var gbl_esc_comm_details = "";
var gbl_esc_comm_counter = 0;
var gbl_esc_comm_txt_details = "";

var new_escdate = "";
var new_escltob = 0;
var new_escgtob = 0;

var new_new_escdate = "";
var new_escltib = 0;
var new_escgtib = 0;


var new_escltci = 0;
var new_escgtci = 0;


var gbl_esc_ap_details = "";
var gbl_esc_ap_counter = 0;
var gbl_esc_ap_txt_details = "";

var new_sev_countbefore = 0;
var new_sev_countafter = 0;

var new_nrd_countbefore = 0;
var new_nrd_countafter = 0;

var gbl_trasfer_count_before = 0;
var gbl_trasfer_count_after = 0;
var local_trasfer_count_before_array = [];
var local_trasfer_count_after_array = [];

var gbl_owner_before = 0;
var gbl_owner_after = 0;


var gbl_bug_before_counter = 0;
var gbl_bug_after_counter = 0;
	
var mgr_req_details = "";
var mgr_req_val_details = "";
var esc_mgr_inner_content = "";


var esc_act_inner_content = "";
var esc_act_details_content = "";
var esc_act_val_details = "";

var ActivityFld_dueEscalation = "";
var esc_due_counter = 0;

var gbl_esc_comm_details_reuse = "";
var gbl_esc_comm_details_date = "";

var gbl_esc_comm_txt_row_reuse = "";

var mgr_req_progress_details = "";

var mgr_req_field_checked = "";
var esc_act_field_checked = "";

var new_mgr_counter = 0;
var new_test_counter = 0;

var date_esc_gbl = "";
var local_esc_first_cal = [];

var gbl_scroll_pos_count = 0;

var details_nrd_beforeesc = "";
var nrd_data_details_before = "";
var nrd_old_date_before = [];


var nrd_old_date_after = "";
var nrd_old_date_after = [];
var nrd_data_details_after = "";
var details_nrd_afteresc= "";
	
	
var date_ib_data_details = "";
var date_ib_details = "";

var date_ib_details_11 = "";
var date_ib_data_details_11 = "";

function escactivitydetails()
{
var escacttitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
$.each(escacttitle,function()
{		if($(this).text().toLowerCase().indexOf('escalation (') >= 0)
		{
			//if($(this).text().toLowerCase().indexOf('escalation update') < 0) 
			//	{	
					var esc_pencilnode = $(this).parent().find('img[dojoattachpoint="customImg2Node"]');
					esc_pencilnode.css('background-color','green');
					esc_pencilnode.trigger('click'); 
					setTimeout(function()
					{
						var esc_act_by = $('#ActivityFld_escalatedByEscalation').val()
						var esc_new_lvl_pencil = $('#ActivityFld_lvlEscalation').val()
						var ActivityFld_statusEscalationfs = $('#ActivityFld_statusEscalationfs').val()
						var ActivityFld_resolutionCodeEscalationfs = $('#ActivityFld_resolutionCodeEscalationfs').val()
						var ActivityFld_categoryEscalationfs = $('#ActivityFld_categoryEscalationfs').val()
						ActivityFld_dueEscalation = ''+esccalculateDate($('#ActivityFld_dueEscalation').val());
						esc_activity_escalated_by[esc_activity_escalated_by_counter++] = esc_act_by; 
						esc_new_lvl_pencil_array[esc_new_lvl_pencil_counter++] = esc_new_lvl_pencil;
						ActivityFld_statusEscalationfs_array[ActivityFld_statusEscalationfs_counter++] = ActivityFld_statusEscalationfs;
						ActivityFld_resolutionCodeEscalationfs_array[ActivityFld_resolutionCodeEscalationfs_counter++] = ActivityFld_resolutionCodeEscalationfs;
						esc_due_array.push(ActivityFld_dueEscalation);
						ActivityFld_categoryEscalationfs_array[ActivityFld_categoryEscalationfs_counter++] = ActivityFld_categoryEscalationfs;
						setTimeout(function()
					{
						var close = $('div[title="Cancel Activity"]'); 
						close.trigger('click');
						},7000);
					},2000);
				//}
		}
});

//console.log("this is the value of esc_due_array"+esc_due_array);
}


function escapcometails()
{
var escacttitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
var count = 0;
var apcount = 0;
$.each(escacttitle,function()
{		if($(this).text().toLowerCase().indexOf('escalation (') >= 0)
		{
					var esc_audit_pencilnode = $(this).parent().find('img[dojoattachpoint="customImg4Node"]');
					esc_audit_pencilnode.css('background-color','red');
					esc_audit_pencilnode.trigger('click'); 
					setTimeout(function()
					{
							$.each($('div[id="activityInstructionDialog"]').find('.dojoxGrid-row'),function()
								{
									
									var row = $(this).find('td');
									if((row.eq(2).text() == "Escalation Communication Plan" ))
										{
											count++
											var new_esc_comm_plan = row.eq(3).html();
											var new_esc_comm_plan_date = esccalculateDate(row.eq(0).html());
											gbl_esc_comm_details = gbl_esc_comm_details+'<tr><td>'+ new_esc_comm_plan_date +'</td>'+'<td>'+ new_esc_comm_plan +'</td></tr>';
											gbl_esc_comm_details_reuse = new_esc_comm_plan;
											gbl_esc_comm_details_date = esccalculateDate(row.eq(0).html());
										}
										
										
									var aprow = $(this).find('td');
									if((aprow.eq(2).text() == "Escalation Action Plan" ))
										{
											apcount++
											var new_esc_ap_plan = row.eq(3).html();
											var new_esc_ap_plan_date = esccalculateDate(row.eq(0).html());
											gbl_esc_ap_details = gbl_esc_ap_details+'<tr><td>'+ new_esc_ap_plan_date +'</td>'+'<td>'+ new_esc_ap_plan +'</td></tr>';
										}
								});
							
								gbl_esc_comm_counter = gbl_esc_comm_counter + count;
								if (gbl_esc_comm_counter > 0)
									{
										gbl_esc_comm_txt_details = '<table class="gbl_esc_comm_txt_details" style="display:none"><tr><th>Communication Details</th></tr>'+gbl_esc_comm_details+'</table>';
										gbl_esc_comm_txt_row_reuse = '<tr><td>'+'Escalation Communication Plan'+'</td><td></td><td>'+gbl_esc_comm_details_date+'</td><td>'+gbl_esc_comm_details_reuse+'</td>';
									}
								else
									{
										gbl_esc_comm_txt_details = "";
										gbl_esc_comm_txt_row_reuse = "";
									}
									
									
								gbl_esc_ap_counter = gbl_esc_ap_counter + apcount;
								if (gbl_esc_ap_counter > 0)
									{
										gbl_esc_ap_txt_details = '<table class="gbl_esc_ap_txt_details" style="display:none"><tr><th>Action Plan Details</th></tr>'+gbl_esc_ap_details+'</table>';
									}
								else
									{
										gbl_esc_ap_txt_details = "";
									}
					},4000);
		}
			
});

}




function runescdetails(){

		if($('.dojoxGrid-row .dojoxGrid-cell').eq(0).text() != "?")
		{

		var initial = $('.dojoxGrid-scrollbox .dojoxGrid-row').length;
		yesc = setInterval(function(){
			 if($('.dojoxGrid-scrollbox .dojoxGrid-row').length)
			 {
			
				//MgrReq();
				new_esc_fun();
				//checkscroll_end();
				esccheckESCLevel();
				esccheckSEVCval();
				esccheckescdays();
				
				check247();
				esccheckIC();
				newcheckOBBesc();
			//	newcheckCALLIBesc();
				newcheckCHATesc();
				new_getSRsevData();
				new_getNRDSets();
				newxfrcount();
				newcheckOwner();
				//new_webconfcount();
				//esccheckODMQ();
				esccheckESCOwner();
				esccheckSRAge();
				//checkmgr_req();
				newCheckBugdetails();
				//escactivitydetails();
				escscroll();
				
			 }
		 },9000);
		}
	//},1000);
}

function new_esc_fun()
{
var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('escalation (') >= 0)
		{
			var esc_raw = $(this).text().split(' ');
			var date_esc = esc_raw[3]+" "+esc_raw[4]+" "+esc_raw[5];
			date_esc_gbl = esccalculateDate(date_esc);
			local_esc_first_cal.push(date_esc_gbl);
		}
	});
	//console.log("this is the value of local_esc_first_cal"+local_esc_first_cal);
}

function esccheckescdays()
{
		$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function()
			{
				var row = $(this).find('td');
				if((row.eq(1).text() == "Escl Status" ) && (row.eq(4).text() == "Escalated" ))
					{
						var new_ESCD_date1 = esccalculateDate(row.eq(5).text());
						esc_new_date = new_ESCD_date1;
						}
			});
	
	var esc_new_agediff = ((esc_new_date - esc_sropenddateval)/(1000*60*60*24)).toFixed(2);
	new_esc_age = esc_new_agediff;
	
}


//Function to check the CallOut outbounds Before escalation
function newcheckOBBesc(){
var count = 0;
var OB_ESC_date1 = "";
var local_escltob = 0;
var local_escgtob = 0;
	$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Escl Status" ) && (row.eq(4).text() == "Escalated" ))
		{
			new_escdate =esccalculateDate(row.eq(5).text());
		}
	});
	
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('call - outbound ') >= 0)
		{
			var eco_raw = $(this).text().split(' ');
			var date_ob = eco_raw[5]+" "+eco_raw[6]+" "+eco_raw[7];
			OB_ESC_date1 = esccalculateDate(date_ob);
			if(new_esc_date_val11_array[0] < OB_ESC_date1){
				local_escltob++;
			}
			else{
				local_escgtob++
			}
		}
	});
		
	new_escltob = local_escltob;
	new_escgtob = local_escgtob;
	
	}

	
function newcheckCALLIBesc(){
var count = 0;
var callidd_date12 = "";
var local_escltib = 0;
var local_escgtib = 0;
var callidd_date11 = "";
var date_ib_caller_11 = "";
var date_ib_caller = "";
	
	$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Escl Status" ) && (row.eq(4).text() == "Escalated" ))
		{
			new_new_escdate =esccalculateDate(row.eq(5).text());
		}
	});
	
	
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('call - inbound ') >= 0)
		{
			var ib_raw = $(this).text().split(' ');
			var date_ib = ib_raw[5]+" "+ib_raw[6]+" "+ib_raw[7];
			callidd_date1 = esccalculateDate(date_ib);
			if(new_esc_date_val11_array[0] < callidd_date1)
			{
				local_escltib++;
				var ib_raw_1 = $(this).text().split(' ');
				var date_ib_1 = ib_raw_1[5]+" "+ib_raw_1[6]+" "+ib_raw_1[7];
				callidd_date12 = esccalculateDate(date_ib_1);
				date_ib_caller = ib_raw_1[4];
				date_ib_details = date_ib_details+'<tr><td>'+date_ib_caller+'</td><td>'+callidd_date12+'</td></tr>';
			}
			else{
				local_escgtib++
				var ib_raw_2 = $(this).text().split(' ');
				var date_ib_2 = ib_raw_2[5]+" "+ib_raw_2[6]+" "+ib_raw_2[7];
				callidd_date11 = esccalculateDate(date_ib_2);
				date_ib_caller_11 = ib_raw_2[4];
				date_ib_details_11 = date_ib_details_11+'<tr><td>'+date_ib_caller_11+'</td><td>'+callidd_date11+'</td></tr>';
			}
		}
	});
	
	new_escltib = local_escltib;
	new_escgtib = local_escgtib;
	
	if (new_escltib>0)
	
	{
	date_ib_data_details = '<table class="date_ib_data_details" style="display:none"><tr><th>Details</th><th>Date</th></tr>'+date_ib_details+'</table>';
	}
	else{
	date_ib_data_details = "";
	}
	
	if (new_escgtib>0)
	
	{
	date_ib_data_details_11 = '<table class="date_ib_data_details_11" style="display:none"><tr><th>Details</th><th>Date</th></tr>'+date_ib_details_11+'</table>';
	}
	else{
	date_ib_data_details_11 = "";
	
	}
	
	
	}
	


	//Function to check Chat instances Before escalation
function newcheckCHATesc(){
var count = 0;
var chatdd_date1 = "";
var local_escltob = 0;
var local_escgtob = 0;
var local_escdate = "";
	$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Escl Status" ) && (row.eq(4).text() == "Escalated" ))
		{
			local_escdate =esccalculateDate(row.eq(5).text());
		}
	});
	
	var tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('customer conversation') >= 0)
		{
			var chat_raw = $(this).text().split(' ');
			var date_chat_esc = chat_raw[4]+" "+chat_raw[5]+" "+chat_raw[6];
			chatdd_date1 = esccalculateDate(date_chat_esc);
			if(new_esc_date_val11_array[0] < chatdd_date1)
			{
				local_escltob++;
			}
			else{
				local_escgtob++;
			}
		}
	});
		
	new_escltci = local_escltob;
	new_escgtci = local_escgtob;
	
	}
	

//function to get severity data
function new_getSRsevData(){
var local_sevcountbefore = 0;
var local_sevcountafter = 0;

	$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		if($(this).find('td').eq(1).text().toLowerCase().indexOf("severity") > -1 && $(this).find('td').eq(3).text() != '' )
			
		{
			var data_val = esccalculateDate($(this).find('td').eq(5).text());
			
			if(local_esc_first_cal[0] < data_val)
			{
				local_sevcountbefore++;
			}
			else
			{
				local_sevcountafter++;
			}
		}
	});
	
	
	new_sev_countbefore = new_sev_countbefore+local_sevcountbefore;
	new_sev_countafter = new_sev_countafter+local_sevcountafter;
	
}

function checkscroll_end(){
	var scroll_pos_count = 0;
	
	$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Updates from Customer" ) && (row.eq(2).text() == "New Record") && (row.eq(4).text() == "0") )
		{
			scroll_pos_count++;
		}
	});
	
	gbl_scroll_pos_count = gbl_scroll_pos_count+scroll_pos_count;
	//console.log("this is the value of gbl_scroll_pos_count"+gbl_scroll_pos_count);
}

function new_getNRDSets(){
	var nrdcount = 0;
	var local_nrdcountbefore = 0;
var local_nrdcountafter = 0;
var nrd_mod_data = "";
	
	$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(1).text() == "Next Response Due" ) && (row.eq(3).text() != '') && (row.eq(2).text() == "Modify" ) )
		{
			var nrdsets = $(this).find('tbody').html();
			var NRD_date1 = calculateDate(row.eq(5).text());
			var NRD_date2 = calculateDate(row.eq(3).text());
			if (NRD_date1 > NRD_date2)
			{
			nrd_mod_data = esccalculateDate(row.eq(5).text());
			
					if(local_esc_first_cal[0] < nrd_mod_data)
					{
						
						local_nrdcountbefore++;
						var NRD_name = $(this).find('tbody td').eq(0).text();
						var NRD_old_date = calculateDate($(this).find('tbody td').eq(3).text());
						var NRD_new_date = calculateDate($(this).find('tbody td').eq(5).text());
						var ack_nrd_time = ((NRD_new_date - NRD_old_date)/(1000*60*60)).toFixed(2);
						details_nrd_beforeesc = details_nrd_beforeesc +'<tr><td>'+ NRD_name +'</td><td>'+NRD_old_date+'</td><td>'+NRD_new_date+'</td><td>'+ack_nrd_time+' hours</td></tr>';
						nrd_old_date_before.push(NRD_old_date);
				
					
					}
					else
					{
						local_nrdcountafter++;
						var NRD_name_1 = $(this).find('tbody td').eq(0).text();
						var NRD_old_date_1 = calculateDate($(this).find('tbody td').eq(3).text());
						var NRD_new_date_1 = calculateDate($(this).find('tbody td').eq(5).text());
						var ack_nrd_time_1 = ((NRD_new_date_1 - NRD_old_date_1)/(1000*60*60)).toFixed(2);
						details_nrd_afteresc = details_nrd_afteresc +'<tr><td>'+ NRD_name_1 +'</td><td>'+NRD_old_date_1+'</td><td>'+NRD_new_date_1+'</td><td>'+ack_nrd_time_1+' hours</td></tr>';
						nrd_old_date_after.push(NRD_old_date_1);
					
					}
			
			//nrdcount++;
			//var NRD_set_name = $(this).find('tbody td').eq(0).text();
			//var NRD_set_old_date = calculateDate($(this).find('tbody td').eq(3).text());
			//var NRD_set_new_date = calculateDate($(this).find('tbody td').eq(4).text());
			//var NRD_SET_MOD_DATE = calculateDate($(this).find('tbody td').eq(5).text());
			//var nrd_set_diff = ((NRD_set_new_date - NRD_set_old_date)/(1000*60*60*24)).toFixed(2);
			//nrd_set_details = nrd_set_details +'<tr><td>'+ NRD_set_name +'</td><td>'+NRD_set_old_date+'</td><td>'+NRD_set_new_date+'</td><td>'+nrd_set_diff+'</td></tr>';
			//nrd_old_date1.push(NRD_SET_MOD_DATE);
			}
			
		}
	});
	
	new_nrd_countbefore = new_nrd_countbefore+local_nrdcountbefore;
	new_nrd_countafter = new_nrd_countafter+local_nrdcountafter;
	

	if (new_nrd_countbefore>0)
	{
	nrd_data_details_before = '<table class="nrd_data_details_before" style="display:none"><tr><th>Modified By</th><th>Expired On</th><th>Modified On</th><th>Ack. Time Taken</th></tr>'+details_nrd_beforeesc+'</table>';
	}
	else
	{
	nrd_data_details_before = "";
	}
	
	if (new_nrd_countafter>0)
	{
	nrd_data_details_after = '<table class="nrd_data_details_after" style="display:none"><tr><th>Modified By</th><th>Expired On</th><th>Modified On</th><th>Ack. Time Taken</th></tr>'+details_nrd_afteresc+'</table>';
	}
	else
	{
	nrd_data_details_after = "";
	}
	
}


function newxfrcount(){
var local_trasfer_count_before = 0;
var local_trasfer_count_after = 0;

	$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		//var row = $(this).find('td');
		if($(this).find('td').eq(1).text() == "Transfer Count")
				{
				var local_transfer_date = esccalculateDate($(this).find('td').eq(5).text());
				
				if(local_esc_first_cal[0] < local_transfer_date)
				
				{
					
					local_trasfer_count_before++;
					local_trasfer_count_before_array.push(local_transfer_date);
				
				}
				else
				
				{
					local_trasfer_count_after++;
					local_trasfer_count_after_array.push(local_transfer_date);
				}
				
				}
		});
		
		gbl_trasfer_count_before = gbl_trasfer_count_before+local_trasfer_count_before;
		gbl_trasfer_count_after = gbl_trasfer_count_after+local_trasfer_count_after;
		
		//console.log("this is the value of gbl_trasfer_count_before"+gbl_trasfer_count_before+"this is the value of local_trasfer_count_before_array"+local_trasfer_count_before_array);
		//console.log("this is the value of gbl_trasfer_count_after"+gbl_trasfer_count_after+"this is the value of local_trasfer_count_after_array"+local_trasfer_count_after_array);
		//console.log("this is the value of new_esc_date_val11_array"+new_esc_date_val11_array[0]);

		}	
		

	
function newcheckOwner(){
var local_owner_after = 0;
var local_owner_before = 0;

		$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(4).text().toLowerCase().indexOf('@oracle.com') > 0) && (row.eq(1).text() == "Owner" ))
				{
				var sr_owner_date_val = esccalculateDate(row.eq(5).text());
				
				if (local_esc_first_cal[0] < sr_owner_date_val)
				{
				local_owner_before++
				}
				else
				{
				local_owner_after++
				}
				}
		});
		gbl_owner_before = gbl_owner_before+local_owner_before;
		gbl_owner_after = gbl_owner_after+local_owner_after;
		}



	
//function to check web conferences
/*function new_webconfcount(){
	var webconfTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="containerNode"]');
	var count = 0;
	var web_conf_count = 0;
	$.each(webconfTitle,function(){
		if($(this).text().toLowerCase().indexOf('https://stbeehive.oracle.com/bconf/') >= 0 || $(this).text().toLowerCase().indexOf('https://oracle-swtsc-support.webex.com/') >= 0 || $(this).text().toLowerCase().indexOf('https://stbeehive.oracle.com:443/bconf/') >= 0)
		{
		var webconf_raw = $(this).closest('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]').text().split(' ');
		
		
		
		count++;
	});
	web_conf_count = count;
	}
	}
	*/
	

function esccheckESCLevel(){
		var new_esccount = 0;
		$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(0).text().toLowerCase().indexOf('@oracle.com') > 0) && (row.eq(1).text() == "Escalation Level" ))
				{
				new_sr_esclvl_val = row.eq(4).html();
				new_esc_date_val11 = esccalculateDate(row.eq(5).text());
				new_esclvl_array[new_esclvl_counter++] = new_sr_esclvl_val;
				new_esccount++;
				var escdaysdiff = ((new_esc_date_val11 - esc_sropenddateval)/(1000*60*60*24)).toFixed(2);
				new_escdetail = new_escdetail +'<tr><td>'+new_sr_esclvl_val+'</td><td>'+new_esc_date_val11+'</td><td>'+escdaysdiff+' (Days) From SR Open Date</td></tr>';
				new_esc_date_val11_array[new_esc_date_val11_counter++] = new_esc_date_val11;
				escdaysdiff_array[escdaysdiff_counter++] = escdaysdiff;
				
				}
		});
		
		if (new_esclvl_array.length>0)
				{
		new_escdetail_content = '<table class="new_escdetail_content"><tr><th>Escalation Level</th><th>Escalation Date</th><th>Escalation After</th></tr>'+new_escdetail+'</table>';
		}
		else
		{
		new_escdetail_content = "";
		}
		
		
		}

		


function esccheckSEVCval(){
		var sevvalcount = 0;
		$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var rowsev = $(this).find('td');
		if((rowsev.eq(2).text() == "Modify") && (rowsev.eq(1).text() == "Severity") && (rowsev.eq(3).text() != ''))
				{
				sevvalcount++;
				sr_escsevvalc = rowsev.eq(4).html();
				sr_escsevvalp = rowsev.eq(3).html();
				var esc_sr_sevvalchange_date = esccalculateDate(rowsev.eq(5).text());
				esc_prisevval_array[esc_prisevval_counter++] = sr_escsevvalc;
				new_esc_prisevval_array[new_esc_prisevval_counter++] = sr_escsevvalc;
				new_esc_prisevval_array[new_esc_prisevval_counter++] = sr_escsevvalp;
				
				var esc_sevvaldiff = ((esc_sr_sevvalchange_date - esc_sropenddateval)/(1000*60*60*24)).toFixed(2);
				
				esc_sevvaldetails = esc_sevvaldetails  +'<tr><td>'+ sr_escsevvalp +'</td><td>'+ sr_escsevvalc +'</td><td>'+esc_sr_sevvalchange_date+'</td><td>'+esc_sevvaldiff+'</td></tr>';
				}
				
		});
		esc_sev_val_details = '<table class="esc_sev_val_details" style="display:none"><tr><th>From</th><th>To</th><th>Date</th><th>After Days</th></tr>'+esc_sevvaldetails+'</table>';
		//console.log("hello this is array"+new_esc_prisevval_array);
		}		
	
// function to check 24/ 7 flag

function check247(){
		var sev247count = 0;
		$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var row247 = $(this).find('td');
		if((row247.eq(2).text() == "Modify") && (row247.eq(1).text() == "Request Full Support Flg") && (row247.eq(3).text() != 'Y'))
				{
				sev247count++;
				sr_escs247 = row247.eq(5).html();
				var esc_sr_247_date = esccalculateDate(sr_escs247);
				esc_247_array[esc_247_counter++] = esc_sr_247_date;
				}
				
		});
		}
		
//check IC
function esccheckIC(){
	var esc_ic_dd_date1 = "";
	var esc_ic_tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(esc_ic_tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm issue clarification') >= 0)
		{
			var ic_raw = $(this).text().split(' ');
			var date_ic = ic_raw[5]+" "+ic_raw[6]+" "+ic_raw[7];
			esc_ic_dd_date1 = esccalculateDate(date_ic);
			if(esc_srstatus == 'Open')
				{
					esc_ic_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
				}
			else
				{
					esc_ic_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
				}
			
		}
	});
	
	var ic_agediff = ((esc_ic_dd_date1 - esc_sropenddateval)/(1000*60*60*24)).toFixed(2)
	esc_ic_age = ic_agediff;
}

//check IC
function esccheckODMQ(){
	var esc_Q_dd_date1 = "";
	var esc_Q_tabTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	$.each(esc_Q_tabTitle,function(){
		if($(this).text().toLowerCase().indexOf('odm question') >= 0)
		{
			var Q_raw = $(this).text().split(' ');
			var date_Q = Q_raw[5]+" "+Q_raw[6]+" "+Q_raw[7];
			esc_Q_dd_date1 = esccalculateDate(date_Q);
			if(esc_srstatus == 'Open')
				{
					esc_ODMQ_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').html();
				}
			else
				{
					esc_ODMQ_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
				}
			
		}
	});
	
	var odm_agediff = ((esc_Q_dd_date1 - esc_sropenddateval)/(1000*60*60*24)).toFixed(2)
	esc_odmq_age = odm_agediff;
}



function newCheckBugdetails(){
	var new_tabbugTitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	var bugcount = 0;
	var bug_raw = "";
	var cal_date_raw = "";
	var local_bug_after_counter = 0;
	var local_bug_before_counter = 0;
	
	$.each(new_tabbugTitle,function(){
		if($(this).text().toLowerCase().indexOf('predefect update') >= 0)
		{
		if($(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').text().toLowerCase().indexOf('defect') >= 0 && $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').text().toLowerCase().indexOf('predefect') < 0)
			{
				bug_raw = $(this).text().split(' ');
				var bug_raw_data = bug_raw[4]+" "+bug_raw[5]+" "+bug_raw[5];
				cal_date_raw = esccalculateDate(bug_raw_data);
				if(new_esc_date_val11_array[0] < cal_date_raw)
	
					{
						local_bug_before_counter++
					}
				else
					{
						local_bug_after_counter++
					}		
			}
		}
				
	});
		
		gbl_bug_before_counter = local_bug_before_counter;
		gbl_bug_after_counter = local_bug_after_counter;
	
	}
	





	//esc_pencilnode.css('background-color','green');
	//	esc_pencilnode.trigger('click');

//function to check the escalation owner
function esccheckESCOwner(){
		$.each($('div[id="auditGrid-page-'+(global_grid_count_esc)+'"]').find('.dojoxGrid-row'),function(){
		var row = $(this).find('td');
		if((row.eq(0).text().toLowerCase().indexOf('@oracle.com') > 0) && (row.eq(1).text() == "Escl Owner" ))
				{
				esc_sr_escowner_val = row.eq(4).html();
				esc_owner_array[esc_owner_counter++] = esc_sr_escowner_val;
				}
		});
		global_grid_count_esc++;
		}
	
	
	
	

function esccheckSRAge()
	{	
		if(esc_srstatus == 'Open')
			{
				var esc_srage_date2 = new Date();
				var diff = ((esc_srage_date2 - esc_sropenddateval)/(1000*60*60*24)).toFixed(2);
				esc_sr_age = diff;
		
			}
		
		else
			{
				var diff = ((esc_srcloseddateval - esc_sropenddateval)/(1000*60*60*24)).toFixed(2);
				esc_sr_age = diff;
			}

	}

	



function MgrReq(){
	var mgrtitle = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
	var MgrReqcount = 0;
	var Mgrarrccount = 0;
	$.each(mgrtitle,function(){
		if($(this).text().toLowerCase().indexOf('manager request') >= 0)
		{
		var mgrreq_raw = $(this).text().split(' ');
		var mgrreqtxt = mgrreq_raw[5]+" "+mgrreq_raw[6]+" "+mgrreq_raw[7];
		//console.log("this is manager request date time"+mgrreqtxt);
		var pencilnode = $(this).parent().find('img[dojoattachpoint="customImg2Node"]');
		pencilnode.css('background-color','green');
		//console.log("this is variable1"+pencilnode);
		pencilnode.trigger('click');
		//MgrReqDate= esccalculateDate(mgrreqtxt);
		//callobdetails[Mgrarrccount++] = '<tr><td>'+ callobtxtdate +'</td></tr>';
		//callob_date[MgrReqcount] = callobtxtdate;
		MgrReqcount++;
		}
		
	});

	}
	

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}


//function to calculate date
var $months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

function esccalculateDate(date){
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

function escscroll(){
if($('div[id="auditGrid-page-'+(global_grid_count_esc-1)+'"]').length > 0){
	scrolled=$('div[id="auditGrid-page-'+(global_grid_count_esc-1)+'"]').innerHeight()*global_grid_count_esc;
	total_scrolled = $(".dojoxGrid-scrollbox .dojoxGrid-content").innerHeight();
	
		$(".dojoxGrid-scrollbox").animate({
			scrollTop:  scrolled
		});
	
}
else{
	clearInterval(yesc);
	setTimeout(function(){
	$('#auditDialog').find('span[title="Cancel"]').trigger('click');
	escactivitydetails();
	},3000)
	setTimeout(function(){
	newcheckCALLIBesc();
	escapcometails();
	},14000);
	setTimeout(function(){
	checkmgr_req();
	esc_act_details();
	//removeOverlayesc();
	//constructDocesc();
	},25000);
	setTimeout(function(){
			xyz = setInterval(function(){
			mgr_status_details();
			},6000);
	},40000);
	setTimeout(function(){
	removeOverlayesc();
	constructDocesc();
	},70000);
	}

 };
 
 
 //show overlay function
function esc_displayOverlay(text) {
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
function removeOverlayesc() {
    $("#overlay").remove();
}

function checkmgr_req()
{
var mgr_req_new = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
var mgr_raw = "";
var cal_mgr_req_date = "";

$.each(mgr_req_new,function()
{
		if($(this).text().toLowerCase().indexOf('manager request') >= 0)
	{

				if ($(this).parent().find('[type="checkbox"]').is(":checked"))
						{
							mgr_req_field_checked = "Y";
						}
				else
						{
							mgr_req_field_checked = "N";
						}

		new_mgr_counter++

		mgr_raw = $(this).text().split(' ');

		var mgr_raw_data = mgr_raw[4]+" "+mgr_raw[5]+" "+mgr_raw[6];
		cal_mgr_req_date = esccalculateDate(mgr_raw_data);

		var req_name = mgr_raw[3];
					if(esc_srstatus == 'Open')
							{
								esc_mgr_inner_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
							}
					else
							{
								esc_mgr_inner_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
							}
				
mgr_req_details = mgr_req_details  +'<tr><td>'+ req_name +'</td><td>'+mgr_req_field_checked+'</td><td>'+ cal_mgr_req_date +'</td><td>'+esc_mgr_inner_content+'</td></tr>';
}


});

mgr_req_val_details = '<table class="mgr_req_val_details" width="99%"><tr><th width="15%">Requested By</th><th width="2%">Public</th><th width="6%">Date /Time </th><th width="75%">Text Details</th></tr>'+mgr_req_details+'</table>';

}



function mgr_status_details()
{
var mgr_req_status = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
var mgr_status_date = "";
$.each(mgr_req_status,function()
		{
			if($(this).text().toLowerCase().indexOf('manager request') >= 0)
				{
					var mgr_pencil = $(this).parent().find('img[dojoattachpoint="customImg5Node"]');				
					mgr_pencil.css('background-color','blue');
					mgr_pencil.trigger('click'); 
					//new_test_counter++
					setTimeout(function()
						{
							$.each($('div[id="auditDialog"]').find('.dojoxGrid-row'),function(){
								var row = $(this).find('td');
								if((row.eq(1).text() == "Status") && (row.eq(2).text() == "Modify") && (row.eq(3).text() == "New"))
									{
										var mgr_req_progress_status_date  = esccalculateDate(row.eq(5).html());
										var mgr_req_progress_status = row.eq(4).html();
										mgr_req_progress_details = '<tr><td>'+'From: New'+'</td><td>'+'To:'+mgr_req_progress_status+'</td><td>'+ mgr_req_progress_status_date +'</td></tr>';
						//				console.log("this is the value (inside) of mgr_req_progress_details >>>>>>"+mgr_req_progress_details);
									}
									
								setTimeout(function()
										{
										var close_btn = $(this).find('span[dojoattachpoint="closeButtonNode"]');	
										close_btn.trigger('click'); 
										},3000);
				
							});
							new_test_counter++
						},2000);
	
	
				}
				
			//	console.log("this is the value of mgr_req_progress_details >>>>>>"+mgr_req_progress_details);
		});

		if (new_test_counter == new_mgr_counter)
		{
		clearInterval(xyz);
		}
		
}



function esc_act_details(){
var esc_req_new = $('table[id^="activityList"] tr').find('div[dojoattachpoint="titleNode"]');
var esc_req_new_counter = 0;
var esc_req_new_raw = "";
var esc_req_new_date = "";

$.each(esc_req_new,function(){
if($(this).text().toLowerCase().indexOf('escalation (') >= 0)
{


if ($(this).parent().find('[type="checkbox"]').is(":checked"))
		{
			esc_act_field_checked = "Y";
		}
else
		{
			esc_act_field_checked = "N";
		}

		
		
esc_req_new_counter++
esc_req_new_raw = $(this).text().split(' ');
var esc_raw_date =  esc_req_new_raw[3]+" "+esc_req_new_raw[4]+" "+esc_req_new_raw[5];
esc_req_new_date = esccalculateDate(esc_raw_date);
var esc_created_name = esc_req_new_raw[2];
if(esc_srstatus == 'Open')
{
esc_act_inner_content = $(this).closest('.dijitTitlePaneTitle').next().find('div[title="Double click inside the activity pane to edit activity"]').html();
}
else
{
esc_act_inner_content = $(this).closest('.dijitTitlePaneTitle').next().find('.dijitTitlePaneContentInner').find('div').html();
}

esc_act_details_content = esc_act_details_content + '<tr><td>'+ esc_created_name +'</td><td>'+esc_act_field_checked+'</td><td>'+ esc_req_new_date +'</td><td>'+esc_act_inner_content+'</td></tr>';
}


});

esc_act_val_details = '<table class="esc_act_val_details" width="99%"><tr><th width="15%">Escalation Created By</th width="2%"><th></th><th width="6%">Date /Time </th><th width="75%">Text Details</th></tr>'+esc_act_details_content+gbl_esc_comm_txt_row_reuse+'</table>';
}



function constructDocesc(){
	
	var data = {};
	data.type = "escsyn_data"
		
	if(esc_topacc_val == "Top Account")
	{
	data.esc_account = acc_name_esc + ' [' + esc_topacc_val + ']';
	}
	else
	{
	data.esc_account = acc_name_esc;
	}
	data.esc_sr_prioval = esc_sr_prioval;
	
	data.esc_o_val = '' + esc_sropenddateval;
	data.esc_sr_age = esc_sr_age;
	data.esc_status_substatus = esc_srstatus+' - '+'('+esc_sub_status+')';
	data.new_escdetail_content = new_escdetail_content;
	data.esc_sr_num_val = esc_sr_num_val;
	data.esc_product_line = esc_product_line;
	data.esc_product = esc_product;
	
	
	if(new_esc_prisevval_array.length!=0)
	{
	new_esc_prisevval_array.sort();
	data.new_esc_prisevval_array = new_esc_prisevval_array[0]
	
	}
	else
	{
	data.new_esc_prisevval_array = 'No Data';
	}
	
	if(esc_247_array.length!=0)
	{
	data.esc_247_array = 'Y';
	}
	else
	{
	data.esc_247_array = 'N';
	}
	
	if(esc_ic_age > 0)
	{
		data.esc_ic_age = 'IC Done in '+esc_ic_age+' (days)';
	}
	else
	{
		data.esc_ic_age = 'IC Not Done';
	}
	
	if(esc_odmq_age > 0)
	{
	data.esc_odmq_age = 'ODM(Q)Done in '+esc_odmq_age+' (days)';
	}
	else
	{
	data.esc_odmq_age = 'ODM(Q) Not Done';
	}
	
	
	if(esc_owner_array[0] == "")
	{
	var escownerval = esc_owner_array[1];
	}
	else
	{
	var escownerval = esc_owner_array[0];
	}
	
	if (esc_owner_array.length != "")
	{
	data.escownerval = escownerval.toLowerCase();
	}
	else
	{
	data.escownerval = "No Escalation Owner";
	}
	
	if (new_esc_age>0)
	{
	data.new_esc_val = "Yes"
	}
	else
	{
	data.new_esc_val = "No"
	}
	
	//console.log("gbl_esc_comm_txt_details--------"+gbl_esc_comm_txt_details);
	//console.log("this is -----------escdaysdiff_array"+escdaysdiff_array[0]);
	//data.checkobjval_msg = escdaysdiff_array[0];
	
	/*if(typeof escdaysdiff_array[0] == 'undefined')
	{
		data.checkobjval_msg = "undefined";
	}
	else
	{
		data.checkobjval_msg = "";
	}*/
	
	
	if(new_esclvl_array.length != 0)
	{
	//new_esclvl_array.sort();
	new_esc_date_val11_array.sort();
	//escdaysdiff_array.sort();
	data.new_esclvl_array = new_esclvl_array[0]
	data.new_esc_date_val11_array = ''+new_esc_date_val11_array[0];
	data.escdaysdiff_array = escdaysdiff_array[0];
	
	data.esc_owner_array = esc_owner_array[0];
	data.esc_activity_escalated_by = esc_activity_escalated_by[0];
	data.esc_new_lvl_pencil_array = esc_new_lvl_pencil_array[0];
	data.ActivityFld_statusEscalationfs_array = ActivityFld_statusEscalationfs_array[0];
	data.ActivityFld_resolutionCodeEscalationfs_array = ActivityFld_resolutionCodeEscalationfs_array[0];
	data.ActivityFld_categoryEscalationfs_array = ActivityFld_categoryEscalationfs_array[0];
	data.esc_due_array = esc_due_array[0];
	
	data.new_escltob = new_escltob;
	data.new_escgtob = new_escgtob;
	data.new_escltib = new_escltib;
	data.date_ib_data_details = date_ib_data_details;
	data.date_ib_data_details_11 = date_ib_data_details_11;
	data.new_escgtib = new_escgtib;
	data.new_escltci = new_escltci;
	data.new_escgtci = new_escgtci;

	data.new_sev_countbefore = new_sev_countbefore;
	data.new_sev_countafter = new_sev_countafter;
	
	data.new_nrd_countbefore = new_nrd_countbefore;
	data.nrd_data_details_before = nrd_data_details_before;
	
	data.new_nrd_countafter = new_nrd_countafter;
	data.nrd_data_details_after = nrd_data_details_after;
	
	data.gbl_trasfer_count_before = gbl_trasfer_count_before;
	data.gbl_trasfer_count_after = gbl_trasfer_count_after;
	
	data.gbl_owner_before = gbl_owner_before;
	data.gbl_owner_after = gbl_owner_after;
	
	data.gbl_bug_before_counter = gbl_bug_before_counter;
	data.gbl_bug_after_counter = gbl_bug_after_counter ;

	data.mgr_req_val_details = mgr_req_val_details;
	data.esc_act_val_details = esc_act_val_details;
	
	if (gbl_esc_comm_counter !== "")
	{
	data.gbl_esc_comm_txt_details = 'Yes';
	data.gbl_esc_comm_txt_details_detals = gbl_esc_comm_txt_details;
	}
	else
	{
	data.gbl_esc_comm_txt_details = 'Not Done'
	}
	
	if (gbl_esc_ap_counter !== "")
	{
	data.gbl_esc_ap_txt_details = 'Yes';
	data.gbl_esc_ap_txt_details_details = gbl_esc_ap_txt_details;
	}
	else
	{
	data.gbl_esc_ap_txt_details = 'Not Done'
	}
	

	}
	
	
	chrome.runtime.sendMessage(data);
			
	}
	

