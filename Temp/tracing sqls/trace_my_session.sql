declare
   v_sid	number;
   v_serial	number;
begin
	select 
		sid,
		serial#
	into
		v_sid,
		v_serial
	from 
		v$session
	where
		sid=SYS_CONTEXT('USERENV','SID');
	
	dbms_monitor.session_trace_enable(v_sid,v_serial,TRUE,TRUE);
end;
/