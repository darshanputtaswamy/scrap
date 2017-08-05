 var titleval = "";
 chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type == "sr_data"){
		titleval = request.title;
	} 
  });
 $(document).ready(function sample_chs(){ 
       
        var specialElementHandlers = {
            '#editor': function (element,renderer) {
                return true;
            }
        };
     $('#cmd').click(function () {
		 var pdf = new jsPDF('landscape');
		pdf.addHTML(document.body,function() {
    pdf.save('SRReview['+titleval+'].pdf');
});
        });  
    });
	

jQuery(document).ready(function csv_chs() {


	 
 var specialElementHandlers = {
            '#editor': function (element,renderer) {
                return true;
            }
        };
		
		 $('#csvcmd').click(function () {
     jQuery('#target').TableCSVExport({
		//header:['Product Line'],
       //columns:[$('#esc_tdproductline').val()],
      // extraHeader: 'General Information',
       //extraData:['zwi"ck','markatto','bcsquire','ksingri'],
       //insertBefore: "General Information",
       delivery: 'popup'
     });
	 
	 
	         });  
			 
});
	
	 $(document).ready(function testurl(){ 
      
       $('#urlid').click(function () {
		 var newURL = "https://socialnetwork.oracle.com/osn/web/#conversation:id=78687818";
    chrome.tabs.create({ url: newURL });
        });  
    });
	
	