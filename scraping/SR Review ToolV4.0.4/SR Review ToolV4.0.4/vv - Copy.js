 $(document).ready(function sample_chs(){ 
       
        var specialElementHandlers = {
            '#editor': function (element,renderer) {
                return true;
            }
        };
     $('#cmd').click(function () {
		var doc = new jsPDF();
			doc.setTextColor(0, 0, 0);
			doc.setFontSize(11);
			doc.setFont("helvetica");
			doc.setFontType("bold");
			doc.text(15, 15, 'SR Number/Title:');
            doc.setTextColor(0, 0, 0);
			doc.fromHTML($('#titlepdf').html(), 15, 15, {'width': 570,'elementHandlers': specialElementHandlers});
			doc.text(15, 30, 'Status / Sub-Status:');
			doc.fromHTML($('#tdsrstatsubstatpdf').html(), 15, 30, {'width': 170,'elementHandlers': specialElementHandlers});
			doc.text(140, 30, 'Severity:');
			doc.fromHTML($('#pioritypdf').html(), 140, 30, {'width': 170,'elementHandlers': specialElementHandlers});
			doc.text(15, 45, 'Account:');
			doc.fromHTML($('#accountpdf').html(), 15, 45, {'width': 170,'elementHandlers': specialElementHandlers});
			doc.text(140, 45, 'Account Clasification:');
			doc.fromHTML($('#tdtopaccvalpdf').html(), 140, 45, {'width': 170,'elementHandlers': specialElementHandlers});
			doc.text(15, 60, 'Owned By:');
			doc.fromHTML($('#tdcownpdf').html(), 15, 60, {'width': 170,'elementHandlers': specialElementHandlers});
			doc.text(140, 60, 'Owning Group:');
			doc.fromHTML($('#compsubpdf').html(), 140, 60, {'width': 170,'elementHandlers': specialElementHandlers});
			doc.text(15, 90, 'ODM IC:');
			
			doc.addHTML($('body'), 0, 0);
			
			doc.setDrawColor(0,153,0); // draw GREEN lines
			doc.setLineWidth(.25);
			doc.line(15, 70, 190, 70);  
			//doc.line(100, 30, 100, 70); // vertical line			
		   doc.save('SR Review.pdf');
			
        });  
    });