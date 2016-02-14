select 
    pm.value||'/diag/rdbms/'||d.name||'/'||i.instance_name||
	'trace/'||i.instance_name||'_ora_'||pr.spid||'.trc' as trace_file
from
    ( select 
	      p.spid
	  from
		  v$session s
	  join
	      v$process p
		  on s.paddr=p.addr
	  where
	       s.sid=SYS_CONTEXT('USERENV','SID')) pr
	   cross join
	    (select 
		     instance_name
			from 
			  v$instance) i
	    cross join
		 (select 
		    lower(name) as name
			from v$database ) d
		
		
