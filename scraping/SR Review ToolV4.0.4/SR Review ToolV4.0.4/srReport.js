chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type == "sr_data"){
		console.log(request);
		
		if(isNaN(request.total_support_days) || isNaN(request.dev_days) || isNaN(request.total_cust_days)){
			$('.topbord').css('display','block');
		}
		
		if($('.ic_content').length>0){
			$('.ic_content').remove();
		}
		
		if($('.iv_content').length>0){
			$('.iv_content').remove();
		}
		
		if($('.cd_content').length>0){
			$('.cd_content').remove();
		}
		
		if($('.cj_content').length>0){
			$('.cj_content').remove();
		}
		
		if($('.ps_content').length>0){
			$('.ps_content').remove();
		}
		
		if($('.psj_content').length>0){
			$('.psj_content').remove();
		}
		
		if($('.odm_qu_content').length>0){
			$('.odm_qu_content').remove();
		}
		
		if($('.odm_ans_content').length>0){
			$('.odm_ans_content').remove();
		}
		
		if($('.cowndetails').length>0){
			$('.cowndetails').remove();
		}
		
		if($('.collab_sr_count_content').length>0){
			$('.collab_sr_count_content').remove();
		}
		
		if($('.collab_bug_count_content').length>0){
			$('.collab_bug_count_content').remove();
		}
		
		if($('.collab_km_count_content').length>0){
			$('.collab_km_count_content').remove();
		}
		
		if($('.att_content').length>0){
			$('.att_content').remove();
		}
		
		if($('.nrd_details').length>0){
			$('.nrd_details').remove();
		}
		
		if($('.nrd_set_details').length>0){
			$('.nrd_set_details').remove();
		}
	
		if($('.wip_data_details').length>0){
			$('.wip_data_details').remove();
		}
				
		if($('.air_data_details').length>0){
			$('.air_data_details').remove();
		}
		
		if($('.rvw_data_details').length>0){
			$('.rvw_data_details').remove();
		}
		
		if($('.dev_data_details').length>0){
			$('.dev_data_details').remove();
		}
		
		if($('.rdef_data_details').length>0){
			$('.rdef_data_details').remove();
		}
		
		if($('.cw_data_details').length>0){
			$('.cw_data_details').remove();
		}		
		
		if($('.soloff_data_details').length>0){
			$('.soloff_data_details').remove();
		}		
		
		if($('.autoclose_data_details').length>0){
			$('.autoclose_data_details').remove();
		}		
		
		if($('.cli_data_details').length>0){
			$('.cli_data_details').remove();
		}		
		
		if($('.closereq_data_details').length>0){
			$('.closereq_data_details').remove();
		}		
		
		if($('.anyupcount_val_detail').length>0){
			$('.anyupcount_val_detail').remove();
		}
		
		if($('.asapcount_val_detail').length>0){
			$('.asapcount_val_detail').remove();
		}
		
		if($('.buscricount_val_detail').length>0){
			$('.buscricount_val_detail').remove();
		}
		
		if($('.criimpcount_val_detail').length>0){
			$('.criimpcount_val_detail').remove();
		}
			
		if($('.golivcount_val_detail').length>0){
			$('.golivcount_val_detail').remove();
		}
		
		if($('.anyupdcpcount_val_detail').length>0){
			$('.anyupdcpcount_val_detail').remove();
		}		
		
		if($('.anynewscount_val_detail').length>0){
			$('.anynewscount_val_detail').remove();
		}
		
		if($('.possig1_val_details').length>0){
			$('.possig1_val_details').remove();
		}
		
		if($('.possig2_val_details').length>0){
			$('.possig2_val_details').remove();
		}
		
		if($('.possig3_val_details').length>0){
			$('.possig3_val_details').remove();
		}
		if($('.possig4_val_details').length>0){
			$('.possig4_val_details').remove();
		}
		
		if($('.sev_val_details').length>0){
			$('.sev_val_details').remove();
		}
		
		if($('.escdetail_content').length>0){
			$('.escdetail_content').remove();
		}
			
		if($('.callob_data_details').length>0){
			$('.callob_data_details').remove();
		}

		if($('.chat_data_details').length>0){
		$('.chat_data_details').remove();
		}
		var srheader = $(".chs1 .row1");
		srheader.find('.title').text(request.title);
		srheader.find('.priority').text(request.prioval);
		srheader.find('.account').text(request.splittitleacc);
		srheader.find('.comp-sub').text(request.splittitlecomp);
		
		var sragedata = $(".chs1 .row2");
		sragedata.find('.srage').text(request.srage);
		sragedata.find('.custdays').text('Customer Working Days('+request.total_cust_days+')');
		sragedata.find('.supdays').text('Support Working Days('+request.total_support_days+')');
		sragedata.find('.devdays').text('Development Working Days('+request.dev_days+')');
		
		var atstattbl = $(".ATSTATUS");
		atstattbl.find('.thatstatus').text('Automation Status: '+request.atStatus);
		atstattbl.find('.productth').text('Product: '+request.srproduct);
			
		//atstattbl.find('.thirdmet').text('IRD: '+request.irdvalue);
		var irdmet = $(".irdmet");
		irdmet.find('.thirdmet').text(request.irdvalue);
		
		var ebdetails = $(".ebdetails");
		ebdetails.find('.thebdetails').text(request.eschead);
		ebdetails.find('.trescowner').find('.tdescowner').text(request.escownerval);
		ebdetails.find('.trescafter').find('.tdescafter').text(request.esc_age);
		ebdetails.find('.tresclevel').find('.tdesclevel').text(request.escllvl);
		ebdetails.find('.trcamval').find('.tdcamval').text(request.camval);
		
		var commescbefore = $(".commescbefore");
		commescbefore.find('.trcommescbeforecob').find('.tdcommescbeforecob').text(request.escgtob);
		commescbefore.find('.trcommescbeforecib').find('.tdcommescbeforecib').text(request.escgtib);
		commescbefore.find('.trcommescbeforechat').find('.tdcommescbeforechat').text(request.escgtci);
		
		var commescafter = $(".commescafter");
		commescafter.find('.trcommescafterob').find('.tdcommescafterob').text(request.escltob);
		commescafter.find('.trcommescafterib').find('.tdcommescafterib').text(request.escltib);
		commescafter.find('.trcommescafterchat').find('.tdcommescafterchat').text(request.escltci);
		
		
		var srgeninfo = $('.srAgeData');
		var srgeninfo1 = $('.srAgeData1');
		var srgeninfo2 = $('.srAgeData2');
		srgeninfo.find('.trsrstatsubstat').find('.tdsrstatsubstat').text(request.srstatsubstat);
		srgeninfo.find('.trcown').find('.tdcown').text(request.cown);
		srgeninfo1.find('.trtopacc_val').find('.tdtopacc_val').text(request.topacc_val);
		srgeninfo1.find('.trprisevva_val').find('.tdprisevva_val').text(request.prisevva_val);
		srgeninfo1.find('.trcowners').find('.tdcowners').text(request.countcown);
		srgeninfo1.find('.trcomp').find('.tdcomp').text(request.srcomponent);
		srgeninfo1.find('.trsubcomp').find('.tdsubcomp').text(request.srsubcomponent);
		
		srgeninfo1.find('.r6').find('.nrd_data_count').text(request.nrd_data_count);
		srgeninfo1.find('.r7').find('.nrd_data_set_count').text(request.nrd_set_data_count);
		srgeninfo1.find('.trtransfers').find('.tdtransfers').text(request.xfrval);
		srgeninfo2.find('.trcollabsrs').find('.tdcollabsrs').text(request.collab_sr_count);
		srgeninfo2.find('.trbugs').find('.tdbugs').text(request.collab_bug_count);
		srgeninfo2.find('.trkm').find('.tdkm').text(request.collab_km_count);
		srgeninfo2.find('.tratt').find('.tdatt').text(request.att_count);
		srgeninfo2.find('.trrc').find('.tdrc').text(request.rootcause);
		srgeninfo2.find('.trreason').find('.tdreason').text(request.reasoncode);
		srgeninfo2.find('.trknow').find('.tdknow').text(request.knownissue);
		srgeninfo.find('.trcemail').find('.tdcemail').text(request.cemail);
		
		var communicationtbl= $('.communicationtbl');
		communicationtbl.find('.trcommtotupdcust').find('.tdcommtotupdcust').text(request.upd_cust_count);
		communicationtbl.find('.trcommtotupdeng').find('.tdcommtotupdeng').text(request.upd_engg_count);
		communicationtbl.find('.trcommtocib').find('.tdcommtocib').text(request.upd_callin_count);
		communicationtbl.find('.trcommtocob').find('.tdcommtocob').text(request.upd_callout_count);
		communicationtbl.find('.trcommtochat').find('.tdcommtochat').text(request.upd_chat_count);
		communicationtbl.find('.trcommtowebconf').find('.tdcommtowebconf').text(request.web_conf_count);
		
		var warsigtbl = $('.warsigtbl');
		warsigtbl.find('.trwarsigasap').find('.tdwarsigasap').text(request.asap_count_val);
		warsigtbl.find('.trwarsigbc').find('.tdwarsigbc').text(request.bccount_val);
		warsigtbl.find('.trwarsigcri').find('.tdwarsigcri').text(request.cricount_val);
		warsigtbl.find('.trwarsiggl').find('.tdwarsiggl').text(request.glcount_val);
		warsigtbl.find('.trwarsigaup').find('.tdwarsigaup').text(request.anyupcount_val);
		warsigtbl.find('.trwarsigucp').find('.tdwarsigucp').text(request.anyup1count_val);
		warsigtbl.find('.trwarsiganynews').find('.tdwarsiganynews').text(request.anynewscount_val);
		
		var posigtbl1 = $('.posigtbl1');
		posigtbl1.find('.trvgg').find('.tdvgg').text(request.possig1counter_val);
		posigtbl1.find('.trew').find('.tdew').text(request.possig2counter_val);
		
		var posigtbl2 = $('.posigtbl2');
		posigtbl2.find('.trexp').find('.tdexp').text(request.possig3counter_val);
		posigtbl2.find('.trqresp').find('.tdqresp').text(request.possig4counter_val);
		
		
		var supstattbl= $('.supstattbl');
		supstattbl.find('.trwipdays').find('.tdwipdays').text(request.wip_days);
		supstattbl.find('.trairdays').find('.tdairdays').text(request.air_days);
		supstattbl.find('.trrvwdays').find('.tdrvwdays').text(request.rvw_days);
		supstattbl.find('.trdevdays').find('.tddevdays').text(request.dev_days);
		supstattbl.find('.trrddays').find('.tdrddays').text(request.rdef_days);
		
		var cusstattbl = $('.cusstattbl');
		cusstattbl.find('.trcustwork').find('.tdcustwork').text(request.cust_days);
		cusstattbl.find('.trsoloff').find('.tdsoloff').text(request.soloff_days);
		cusstattbl.find('.trautoclo').find('.tdautoclo').text(request.auto_closedays);
		cusstattbl.find('.trcliint').find('.tdcliint').text(request.cli_days);
		cusstattbl.find('.trcloreq').find('.tdcloreq').text(request.closereq_days);
		$('body').append(request.asapcount_val_detail)
		$('body').append(request.anyupcount_val_detail)
		$('body').append(request.buscricount_val_detail)
		$('body').append(request.criimpcount_val_detail)
		$('body').append(request.golivcount_val_detail)
		$('body').append(request.anyupdcpcount_val_detail)
		$('body').append(request.anynewscount_val_detail)
		
		
		/* positive signals*/
		$('body').append(request.possig1_val_details)
		$('body').append(request.possig2_val_details)
		$('body').append(request.possig3_val_details)
		$('body').append(request.possig4_val_details)
		
		
		$('body').append(request.nrd_set_data_details);
		$('body').append(request.nrd_data_details)
		$('body').append(request.wip_data_details)
		$('body').append(request.air_data_details)
		$('body').append(request.rvw_data_details)
		$('body').append(request.dev_data_details)
		$('body').append(request.rdef_data_details)
		
	
		$('body').append(request.cw_data_details)
		$('body').append(request.soloff_data_details)
		$('body').append(request.autoclose_data_details)
		$('body').append(request.cli_data_details)
		$('body').append(request.closereq_data_details)
		
		$('.nrd_set_details').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.nrd_exp_stat_array1[index-1]+'</td>');
			}
		});
		
		$('.asapcount_val_detail').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.warsig_asap_array[index-1]+'</td>');
				$(this).append('<td>'+request.warsig1_asap1_array1[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.warsig_asap_sr_age[index-1]+'(Days)'+'</td>');
				
			}
		});
		
		$('.buscricount_val_detail').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.warsig_buscri_array[index-1]+'</td>');
				$(this).append('<td>'+request.warsig1_buscri1_array1[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.warsig_buscri_sr_age[index-1]+'(Days)'+'</td>');
				
			}
		});		
		
		$('.criimpcount_val_detail').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.warsig_criimp_array[index-1]+'</td>');
				$(this).append('<td>'+request.warsig1_criimp1_array1[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.warsig_criimp_sr_age[index-1]+'(Days)'+'</td>');
				
			}
		});		
			
		$('.golivcount_val_detail').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.warsig_golive_array[index-1]+'</td>');
				$(this).append('<td>'+request.warsig1_golive1_array1[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.warsig_golive_sr_age[index-1]+'(Days)'+'</td>');
				
			}
		});		
						
	
		$('.anyupcount_val_detail').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.warsig_upd_array[index-1]+'</td>');
				$(this).append('<td>'+request.warsig1_upd1_array1[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.warsig_upd_sr_age[index-1]+'(Days)'+'</td>');
			}
		});
		
		$('.anyupdcpcount_val_detail').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.warsig_anyupdcp_array[index-1]+'</td>');
				$(this).append('<td>'+request.warsig1_anyupdcp1_array1[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.warsig_anyupdcp_sr_age[index-1]+'(Days)'+'</td>');
			}
		});
		
		$('.anynewscount_val_detail').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.warsig_anynews_1_array[index-1]+'</td>');
				$(this).append('<td>'+request.any_news_array1[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.anynews_sr_age[index-1]+'(Days)'+'</td>');
			}
		});
		
	/* $('.possig1_val_details').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.possig1a[index-1]+'</td>');
				$(this).append('<td>'+request.possiga1[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.possig1_sr_age[index-1]+'(Days)'+'</td>');
			}
		}); */

		$('.possig2_val_details').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.possig2a[index-1]+'</td>');
				$(this).append('<td>'+request.possiga2[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.possig2_sr_age[index-1]+'(Days)'+'</td>');
			}
		});
		
		$('.possig3_val_details').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.possig3a[index-1]+'</td>');
				$(this).append('<td>'+request.possiga3[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.possig3_sr_age[index-1]+'(Days)'+'</td>');
			}
		});	

		$('.possig4_val_details').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.possig4a[index-1]+'</td>');
				$(this).append('<td>'+request.possiga4[index-1]+'(Days) Before support Updated Customer'+'</td>');
				$(this).append('<td>'+'SR Age was '+request.possig4_sr_age[index-1]+'(Days)'+'</td>');
			}
		});		
		
		
		$('.nrd_details').find('tr').each(function( index, value){
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
				//$(this).parent().hide();
			}
		});
		
		
			var $rowsNo = $('.nrd_details').find('tr').filter(function () {
				return $.trim($(this).find('td').eq(5).text()) === "Customer Working"
			}).toggle(); 
		

		$('body').append(request.sev_val_details)
		$('body').append(request.escdetail_content)
		$('body').append(request.callob_data_details)
		$('body').append(request.chat_data_details)
		
		
		$('.callob_data_details').find('tr').each(function( index, value){
			if(index > 0){
				$(this).append('<td>'+request.call_freq_diff[index-1]+'</td>');
				$(this).append('<td>'+request.callob_data_array[index-1]+'</td>');
			}
		});
		 $('.chat_data_details').find('tr').each(function( index, value){
			if(index > 0)
			{
				$(this).append('<td>'+request.chatd_freq_diff[index-1]+'</td>');
				$(this).append('<td>'+request.chatd_data_array[index-1]+'</td>');
			 }
		 });
		
		var odm = $('.odm');
		odm.find('.tric').find('.tdic').text(request.ic_age);
		odm.find('.triv').find('.tdiv').text(request.iv_age);
		odm.find('.trcd').find('.tdcd').text(request.cd_age);
		odm.find('.trcj').find('.tdcj').text(request.cj_age);
		odm.find('.trps').find('.tdps').text(request.ps_age);
		odm.find('.trpsj').find('.tdpsj').text(request.psj_age);
		odm.find('.trsap').find('.tdsap').text(request.sap_age);
		odm.find('.trodmq').find('.tdodmq').text(request.odm_qu);
		odm.find('.trodmans').find('.tdodmans').text(request.odm_ans);
		odm.find('.trodmdc').find('.tdodmdc').text(request.dc_odm_count);
		
		$('body').append('<table class="ic_content" id="iccontentpdf" style="display:none"><table>');
		$('body').append('<table class="iv_content" style="display:none"><table>');
		$('body').append('<table class="cd_content" style="display:none"><table>');
		$('body').append('<table class="cj_content" style="display:none"><table>');
		$('body').append('<table class="ps_content" style="display:none"><table>');
		$('body').append('<table class="psj_content" style="display:none"><table>');
		$('body').append('<table class="sap_content" style="display:none"><table>');
		$('body').append('<table class="odm_qu_content" style="display:none"><table>');
		$('body').append('<table class="odm_ans_content" style="display:none"><table>');
		
		$('body').append('<table class="cowndetails" style="display:none"><table>');
		$('body').append('<table class="collab_sr_count_content" style="display:none"><table>');
		$('body').append('<table class="collab_bug_count_content" style="display:none"><table>');
		$('body').append('<table class="collab_km_count_content" style="display:none"><table>');
		$('body').append('<table class="att_content" style="display:none"><table>');
		
		
		$('.cowndetails').append(request.countcowndetails);
		$('.ic_content').append(request.ic_content);
		$('.iv_content').append(request.iv_content);
		$('.cd_content').append(request.cd_content);
		$('.cj_content').append(request.cj_content);
		$('.ps_content').append(request.ps_content);
		$('.psj_content').append(request.psj_content);
		$('.sap_content').append(request.sap_content);
		$('.odm_qu_content').append(request.odm_qu_content);
		$('.odm_ans_content').append(request.odm_ans_content);
		
		$('.collab_sr_count_content').append(request.collab_sr_count_content);
		$('.collab_bug_count_content').append(request.collab_bug_count_content);
		$('.collab_km_count_content').append(request.collab_km_count_content);
		$('.att_content').append(request.att_content);
		
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
  
      var popup1 = function($popupclass1, $popupdiv1){
        var moveLeft = -400;
        var moveDown = 10;
        $popupclass1.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass1.hover(function(e) {
          $popupdiv1.show().css('position', 'absolute');
        }, function() {
          $popupdiv1.hide();
        });
        
        $popupclass1.mousemove(function(e) {
          $popupdiv1.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
   var popup2 = function($popupclass2, $popupdiv2){
        var moveLeft = -400;
        var moveDown = 18;
        $popupclass2.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass2.hover(function(e) {
          $popupdiv2.show().css('position', 'absolute');
        }, function() {
          $popupdiv2.hide();
        });
        
        $popupclass2.mousemove(function(e) {
          $popupdiv2.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
 var popup3 = function($popupclass3, $popupdiv3){
        var moveLeft = -250;
        var moveDown = 5;
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

 var popup4 = function($popupclass4, $popupdiv4){
        var moveLeft = 10;
        var moveDown = 20;
        $popupclass4.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass4.hover(function(e) {
          $popupdiv4.show().css('position', 'absolute');
        }, function() {
          $popupdiv4.hide();
        });
        
        $popupclass4.mousemove(function(e) {
          $popupdiv4.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
 
  var popup6 = function($popupclass6, $popupdiv6){
        var moveLeft = -250;
        var moveDown = -20;
        $popupclass6.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass6.hover(function(e) {
          $popupdiv6.show().css('position', 'absolute');
        }, function() {
          $popupdiv6.hide();
        });
        
        $popupclass6.mousemove(function(e) {
          $popupdiv6.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
    var popup7 = function($popupclass7, $popupdiv7){
        var moveLeft = -650;
        var moveDown = 10;
        $popupclass7.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass7.hover(function(e) {
          $popupdiv7.show().css('position', 'absolute');
        }, function() {
          $popupdiv7.hide();
        });
        
        $popupclass7.mousemove(function(e) {
          $popupdiv7.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
   var popup8 = function($popupclass8, $popupdiv8){
        var moveLeft = -400;
        var moveDown = -64;
        $popupclass8.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass8.hover(function(e) {
          $popupdiv8.show().css('position', 'absolute');
        }, function() {
          $popupdiv8.hide();
        });
        
        $popupclass8.mousemove(function(e) {
          $popupdiv8.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
  var popup9 = function($popupclass9, $popupdiv9){
        var moveLeft = -720;
        var moveDown = -70;
        $popupclass9.css('cursor','pointer').css('text-decoration', 'underline');
        $popupclass9.hover(function(e) {
          $popupdiv9.show().css('position', 'absolute');
        }, function() {
          $popupdiv9.hide();
        });
        
        $popupclass9.mousemove(function(e) {
          $popupdiv9.css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft).css('position', 'absolute');
        });
  }
  
  $(window).load(function(){
	setTimeout(function(){
		popup3($('.nrd_data_count'), $('.nrd_details'));
		popup6($('.nrd_data_set_count'), $('.nrd_set_details'));
		popup3($('.tdprisevva_val'), $('.sev_val_details'));
		popup4($('.tdcommtocob'), $('.callob_data_details'));
		popup4($('.tdcommtochat'), $('.chat_data_details'));
		
		
		popup2($('.tdic'), $('.ic_content'));
		popup2($('.tdiv'), $('.iv_content'));
		popup2($('.tdcd'), $('.cd_content'));
		popup2($('.tdcj'), $('.cj_content'));
		popup2($('.tdps'), $('.ps_content'));
		popup2($('.tdpsj'), $('.psj_content'));
		popup2($('.tdsap'), $('.sap_content'));
		popup2($('.tdodmq'), $('.odm_qu_content'));
		popup2($('.tdodmans'), $('.odm_ans_content'));
		popup3($('.tdcowners'), $('.cowndetails'));
		popup($('.tdcollabsrs'), $('.collab_sr_count_content'));
		popup3($('.tdbugs'), $('.collab_bug_count_content'));
		popup3($('.tdkm'), $('.collab_km_count_content'));
		popup3($('.tdatt'), $('.att_content'));
		popup1($('.tdesclevel'), $('.escdetail_content'));
		popup8($('.tdwarsigaup'), $('.anyupcount_val_detail'));
		popup1($('.tdwarsigbc'), $('.buscricount_val_detail'));
		popup1($('.tdwarsigcri'), $('.criimpcount_val_detail'));
		popup1($('.tdwarsiggl'), $('.golivcount_val_detail'));
		popup8($('.tdwarsigucp'), $('.anyupdcpcount_val_detail'));
		popup8($('.tdwarsiganynews'), $('.anynewscount_val_detail'));
		
		
/* 		popup9($('.tdvgg'), $('.possig1_val_details'));
		popup9($('.tdew'), $('.possig2_val_details'));
		popup9($('.tdexp'), $('.possig3_val_details'));
		popup9($('.tdqresp'), $('.possig4_val_details'));
		 */
		
		popup1($('.tdwarsigasap'), $('.asapcount_val_detail'));
		popup9($('.tdwipdays'), $('.wip_data_details'));
		popup9($('.tdairdays'), $('.air_data_details'));		
		popup9($('.tdrvwdays'), $('.rvw_data_details'));
		popup9($('.tddevdays'), $('.dev_data_details'));
		popup9($('.tdrddays'), $('.rdef_data_details'));
		popup9($('.tdcustwork'), $('.cw_data_details'));
		popup9($('.tdsoloff'), $('.soloff_data_details'));
		popup9($('.tdautoclo'), $('.autoclose_data_details'));
		popup9($('.tdcliint'), $('.cli_data_details'));
		popup9($('.tdcloreq'), $('.closereq_data_details'));
		
	},1000)
  });
  