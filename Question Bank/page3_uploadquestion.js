<script>

var stateC5=0;
var stateC6=0;
var stateC7=0;

function display()
{
if(!apex.item( "P3_CHOICE4" ).isEmpty()&&!apex.item( "P3_CHOICE3" ).isEmpty()&&!apex.item( "P3_CHOICE2" ).isEmpty()&&!apex.item( "P3_CHOICE1" ).isEmpty() ){

		 if (!apex.item( "P3_CHOICE5" ).isEmpty()){
		    
		         if(!apex.item( "P3_CHOICE6" ).isEmpty()){
				
                    if(!apex.item( "P3_CHOICE7" ).isEmpty()){
					
                        alert("MAX Option Reached");
					  


            } else {
			  if (stateC7 == 0){
                          apex.item( "P3_CHOICE7" ).show();
			              stateC7=1;
		             } 
					 else { 
					 
					 alert("Please Filling all above choice first");
				    
					}
              }
				
         } else {
				  if (stateC6 == 0){
                          apex.item( "P3_CHOICE6" ).show();
			              stateC6=1;
		             } 
					 else { 
					 
					 alert("Please Filling all above choice first");
				    
					}
              }
			
         } 		else  {
		              if (stateC5 == 0){
                          apex.item( "P3_CHOICE5" ).show();
			              stateC5=1;
		             } 
					 else { 
					 
					 alert("Please Filling all above choice first");
				    
					}
             }

         } else { 

               alert("Please Filling all above choice first");

         }


}
</script>


