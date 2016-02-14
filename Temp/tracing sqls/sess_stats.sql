select sn.name,st.value
from v$statname sn
join v$sestat st
     on sn.statistic#=st.statistic#
where sn.name in ('session logical reads',
					'physical reads',
					'gc cr blocks received',
					'gc current blocks received')
	  and st.sid=SYS_CONTEXT('USERENV','SID')
order by sn.statistic#;

