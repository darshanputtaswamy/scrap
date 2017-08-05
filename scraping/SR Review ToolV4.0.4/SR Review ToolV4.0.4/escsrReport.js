chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type == "escsyn_data"){
		

		if($('.new_escdetail_content').length>0){
			$('.new_escdetail_content').remove();
		}
		
		
		if($('.gbl_esc_comm_txt_details').length>0){
			$('.gbl_esc_comm_txt_details').remove();
		}
		
		if($('.gbl_esc_ap_txt_details').length>0){
			$('.gbl_esc_ap_txt_details').remove();
		}
		
	/*	if(isNaN(request.checkobjval_msg))
		{
		$('.topbord').css('display','block')
		}*/
		
		if($('.nrd_data_details_before').length>0){
			$('.nrd_data_details_before').remove();
		}
		
		if($('.nrd_data_details_after').length>0){
			$('.nrd_data_details_after').remove();
		}
		
		if($('.date_ib_data_details').length>0){
			$('.date_ib_data_details').remove();
		}
		
		if($('.date_ib_data_details_11').length>0){
			$('.date_ib_data_details_11').remove();
		}
		
		
		
		
		
		
		
			
		var ebdetailsheader = $(".ebdetailsheader");	
		ebdetailsheader.find('.ebdetailsheaderrow1').find('.thaccount').text('Account:'+request.esc_account);
		
		
		ebdetailsheader.find('.ebdetailsheaderrow1').find('.title').text('SR:'+request.esc_sr_num_val);
		ebdetailsheader.find('.ebdetailsheaderrow1').find('.priority').text('Current Severity:'+request.esc_sr_prioval);
		ebdetailsheader.find('.ebdetailsheaderrow1').find('.CAGE').text('Age:'+request.esc_sr_age);
		
		var ebdetails = $(".ebdetails");
		ebdetails.find('.trescowner').find('.tdescowner').text(request.escownerval);
		
		ebdetails.find('.esc_trproductline').find('.esc_tdproductline').text(request.esc_product_line);
		ebdetails.find('.esc_trproduct').find('.esc_tdproduct').text(request.esc_product);
		ebdetails.find('.esc_trcreated').find('.esc_tdcreated').text(request.esc_o_val);
		ebdetails.find('.esc_trhighsev').find('.esc_tdhighsev').text(request.new_esc_prisevval_array);
		ebdetails.find('.esc_tr247').find('.esc_td247').text(request.esc_247_array);
		ebdetails.find('.esc_tricq').find('.esc_tdicq').text(request.esc_ic_age+' / '+request.esc_odmq_age);
		
		
		ebdetails.find('.trcurstatus').find('.tdcurstatus').text(request.esc_status_substatus);
		ebdetails.find('.trescstatus').find('.tdescstatus').text(request.new_esc_val);
		
		
		var new_chs_ebdetails = $(".new_chs_ebdetails");
		new_chs_ebdetails.find('.chs_tbdy').html(request.new_escdetail_content);
		
		var escalation_mgr_details = $(".escalation_mgr_details");
		escalation_mgr_details.find('.tbody_escalation_mgr_details').html(request.mgr_req_val_details+request.esc_act_val_details);
		//escalation_mgr_details.find('.tbody_escalation_mgr_details').html(request.esc_act_val_details);
		
		//$('body').append(request.new_escdetail_content)
		$('body').append(request.gbl_esc_comm_txt_details_detals)
		$('body').append(request.gbl_esc_ap_txt_details_details)
		$('body').append(request.nrd_data_details_before)	
		$('body').append(request.nrd_data_details_after)
		$('body').append(request.date_ib_data_details)
		$('body').append(request.date_ib_data_details_11)
		
		
		
		
		
		/*	$('.nrd_data_details_before').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.nrd_exp_stat_array[index-1]+'</td>');
			}
		});
		$('.nrd_details').find('tr').each(function( index, value){
			if(index > 0){
				if((request.nrd_exp_stat_array[index-1].toLowerCase().indexOf('review update') >= 0) || (request.nrd_exp_stat_array[index-1].toLowerCase().indexOf('work in progress') >= 0) || (request.nrd_exp_stat_array[index-1].toLowerCase().indexOf('awaiting internal response') >= 0) || (request.nrd_exp_stat_array[index-1].toLowerCase().indexOf('new') >= 0) || (request.nrd_exp_stat_array[index-1].toLowerCase().indexOf('close requested') >= 0) || (request.nrd_exp_stat_array[index-1].toLowerCase().indexOf('review defect') >= 0) || (request.nrd_exp_stat_array[index-1].toLowerCase().indexOf('development working') >= 0)){
					$(this).append('<td>Support Working</td>');
				}
				else 
				$(this).append('<td>Customer Working</td>');
			}
		});*/
		
		
		
		var esc_01_ebdetails = $(".esc_01_ebdetails");
		
		esc_01_ebdetails.find('.esc_trescalationlevel').find('.esc_tdescalationlevel').text(request.new_esclvl_array);
		esc_01_ebdetails.find('.esc_trcreateddate').find('.esc_tdcreateddate').text(request.new_esc_date_val11_array);
		esc_01_ebdetails.find('.esc_trescafter').find('.esc_tdescafter').text(request.escdaysdiff_array+' (Days)');
		esc_01_ebdetails.find('.esc_trownerval').find('.esc_tdownerval').text(request.esc_owner_array);
		//esc_01_ebdetails.find('.esc_trownerval').find('.esc_tdownerval').text(request.checkobjval_msg);
		esc_01_ebdetails.find('.esc_new_trescby').find('.esc_new_tdescby').text(request.esc_activity_escalated_by);
		esc_01_ebdetails.find('.esc_new_trduedata').find('.esc_new_tdduedata').text(request.esc_due_array);
		esc_01_ebdetails.find('.esc_new_trstatus').find('.esc_new_tdstatus').text(request.ActivityFld_statusEscalationfs_array);
		if(request.ActivityFld_resolutionCodeEscalationfs_array == "")
		{
			esc_01_ebdetails.find('.esc_new_trresolution').find('.esc_new_tdresolution').text('[No Data]');
		}
		else
		{
			esc_01_ebdetails.find('.esc_new_trresolution').find('.esc_new_tdresolution').text(request.ActivityFld_resolutionCodeEscalationfs_array);
		}
		esc_01_ebdetails.find('.esc_new_trcomplan').find('.esc_new_tdcomplan').text(request.gbl_esc_comm_txt_details);
		esc_01_ebdetails.find('.esc_new_trapplan').find('.esc_new_tdapplan').text(request.gbl_esc_ap_txt_details);
		
		
		
		esc_01_ebdetails.find('.esc_new_trcategory').find('.esc_new_tdcategory').text(request.ActivityFld_categoryEscalationfs_array);
		
		
		
		var ESC_NEW_commescbefore = $(".ESC_NEW_commescbefore");
		
		
	//	ESC_NEW_commescbefore.find('.esc_new_trbchat').find('.esc_new_tdbchat').text('0');
		ESC_NEW_commescbefore.find('.esc_new_trbcob').find('.esc_new_tdbcob').text(request.new_escgtob);
		ESC_NEW_commescbefore.find('.esc_new_trbcib').find('.esc_new_tdbcib').text(request.new_escgtib);
		ESC_NEW_commescbefore.find('.esc_new_trbchat').find('.esc_new_tdbchat').text(request.new_escgtci);
		ESC_NEW_commescbefore.find('.esc_new_trbsevchanges').find('.esc_new_tdbsevchanges').text(request.new_sev_countafter);
		ESC_NEW_commescbefore.find('.esc_new_trbnrdmissed').find('.esc_new_tdbnrdmissed').text(request.new_nrd_countafter);
		ESC_NEW_commescbefore.find('.esc_new_trbtransfers').find('.esc_new_tdbtransfers').text(request.gbl_trasfer_count_after);
		ESC_NEW_commescbefore.find('.esc_new_trbcowners').find('.esc_new_tdbcowners').text(request.gbl_owner_after);
		ESC_NEW_commescbefore.find('.esc_new_trbbugs').find('.esc_new_tdbbugs').text(request.gbl_bug_after_counter);
		
		
		
		
		//ESC_NEW_commescbefore.find('.esc_new_trbcib').find('.esc_new_tdbcib').text('2');
		
		
		var esc_new_commescafter = $(".esc_new_commescafter");
		
		esc_new_commescafter.find('.esc_new_tracob').find('.esc_new_tdacob').text(request.new_escltob);
		esc_new_commescafter.find('.esc_new_tracib').find('.esc_new_tdacib').text(request.new_escltib);
		esc_new_commescafter.find('.esc_new_trachat').find('.esc_new_tdachat').text(request.new_escltci);
		esc_new_commescafter.find('.esc_new_trasevchanges').find('.esc_new_tdasevchanges').text(request.new_sev_countbefore);
		esc_new_commescafter.find('.esc_new_tranrdmissed').find('.esc_new_tdanrdmissed').text(request.new_nrd_countbefore);
		esc_new_commescafter.find('.esc_new_tratransfers').find('.esc_new_tdatransfers').text(request.gbl_trasfer_count_before);
		esc_new_commescafter.find('.esc_new_tracowners').find('.esc_new_tdacowners').text(request.gbl_owner_before);
		esc_new_commescafter.find('.esc_new_trabugs').find('.esc_new_tdabugs').text(request.gbl_bug_before_counter);
		
	} 
  });
  
    var popup = function($popupclass, $popupdiv){
        var moveLeft = 20;
        var moveDown = 10;
        $popupclass.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass.hover(function(e) {
          $popupdiv.show().css('position', 'absolute');
        }, function() {
          $popupdiv.hide();
        });
        
        $popupclass.mousemove(function(e) {
          $popupdiv.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
      var popup1 = function($popupclass, $popupdiv){
        var moveLeft = -70;
        var moveDown = 10;
        $popupclass.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass.hover(function(e) {
          $popupdiv.show().css('position', 'fixed');
		  $popupdiv.show().css('width', '650px');
		  $popupdiv.show().css('bottom', '0');
		  $popupdiv.show().css('right', '0');
		  $popupdiv.show().css('border', '3px solid #8AC007;');
		  
		  
		  
		  
        }, function() {
          $popupdiv.hide();
        });
        
        $popupclass.mousemove(function(e) {
          $popupdiv.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
  
        var popup2 = function($popupclass, $popupdiv){
        var moveLeft = 20;
        var moveDown = -100;
        $popupclass.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass.hover(function(e) {
          $popupdiv.show().css('position', 'fixed');
		  $popupdiv.show().css('width', '650px');
		  $popupdiv.show().css('bottom', '0');
		  $popupdiv.show().css('right', '0');
		  $popupdiv.show().css('border', '3px solid #8AC007;');
		  
		  
		  
		  
        }, function() {
          $popupdiv.hide();
        });
        
        $popupclass.mousemove(function(e) {
          $popupdiv.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
  var popup3 = function($popupclass3, $popupdiv3){
        var moveLeft = -10;
        var moveDown = -350;
        $popupclass3.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass3.hover(function(e) {
          $popupdiv3.show().css('position', 'absolute');
        }, function() {
          $popupdiv3.hide();
        });
        
        $popupclass3.mousemove(function(e) {
          $popupdiv3.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
  
  $(window).load(function(){
	setTimeout(function(){
			
			popup($('.tdescstatus'), $('.new_escdetail_content'));
			popup1($('.esc_new_tdcomplan'), $('.gbl_esc_comm_txt_details'));
			popup2($('.esc_new_tdapplan'), $('.gbl_esc_ap_txt_details'));
			
			popup3($('.esc_new_tranrdmissed'), $('.nrd_data_details_before'));
			popup3($('.esc_new_trbnrdmissed'), $('.nrd_data_details_after'));
			
			popup($('.esc_new_tracib'), $('.date_ib_data_details'));
			popup($('.esc_new_trbcib'), $('.date_ib_data_details_11'));
			
			
			
			
			
			
	},1000)
  });
  
  