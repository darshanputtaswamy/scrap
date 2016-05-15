






#############################################################################################
DIRECTORY STRUCTURE
############################################################################################
startupchk
         +----> startupchk 
		 +====> SRC
   		 |        +---->profile.dat
  		 |	  +---->validate.pl
		 |	  +====>CONFIG
                 |        |        +--->case 1  <ID>.sh
                 |        |        |     .
		 |	  |	   |     . 
		 |	  |	   +--->case n  <ID>.sh
		 |	  |
		 |	  +====>DISK
        	 |        |        +--->case 1
        	 |        |        |     .
		 |	  |	   |     .
		 |	  | 	   +--->case n				  
		 |	  |
		 |	  +====>FS
	         |        |   	   +--->case 1
        	 |        |        |     .
		 |	  |        |     .
		 |	  |	   +--->case n
		 |	  |
		 | 	  +====>NET
	         |        |        +--->case 1
        	 |        |        |     .
		 |	  |	   |     .
		 |	  |	   +--->case n				  
		 |	  | 		  
		 |	  +====>KNOWNBUGS
	         |        |        +--->case 1
        	 |        |        |     .
		 |	  |	   |     .
		 |	  |	   +--->case n
		 |	  |   		   
		 |	  +====>HTML
		 |	           +---->header.html
		 |		   +---->tail.html				
		 |									
	         +====> .INPUT<TIMESTAMP> [hidden]
		 |        +---->watchdog.sh
		 | 	  +---->o_host_list.out
	         |        +---->cluster_env.out
		 |
        	 +====> OUTPUT<TIMESTAMP>
                	  |
		          +====> html
			  |	  +---->header_com_validation.html		 
			  |       +---->summary.html
			  |	  +----><ID>case1.html
			  |	  +----><ID>case2.html
			  |	  .
			  |	  +----><ID>casen.html
			  |	  +---->Tail.html
			  |
			  +====> logs
				  + watchdog.logs
				  + <ID>case1.log
                         	  + <ID>case2.log
                                  .
                                  + <ID>casen.log


