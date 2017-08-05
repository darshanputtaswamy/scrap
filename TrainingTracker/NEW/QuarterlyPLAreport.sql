SELECT * FROM (
SELECT NVL(TO_CHAR(AREA), 'TOTAL') AS AREA,  SUM(FYQ1) FYQ1,  SUM(FYQ2) FYQ2,  SUM(FYQ3) FYQ3, SUM(FYQ4) FYQ4,  SUM(Fyq1+Fyq2+Fyq3+Fyq4)as TOTAL   FROM 
(
WITH pivot_data AS (
SELECT COALESCE(TABLE1.AREA , TABLE2.AREA) AS AREA, COALESCE(DURATION , 0) AS DURATION   ,  COALESCE(TABLE1.QTR, TABLE2.QTR) AS QTR
FROM ( ( select table1.AREA as AREA, TO_CHAR(table2.n) as QTR
               from 
                (SELECT   PLA_LINE || ' > ' ||  PLA_FAMILY || ' > '|| PLA_AREA As AREA
                 FROM TTE_PLA_INFO
                 WHERE  ((:P30_SELECT_PLA_LINE is null or instr(upper(PLA_LINE),upper(:P30_SELECT_PLA_LINE)) > 0) AND 
          	         (:P30_SELECT_PLA_FAMILY is null or instr(upper(PLA_FAMILY),upper(:P30_SELECT_PLA_FAMILY)) > 0) AND 
        		 (:P30_SELECT_PLA_AREA is null or instr(upper(PLA_AREA),upper(:P30_SELECT_PLA_AREA)) > 0)
		        ) AND PLA_AREA <> 'Unspecified' AND PLA_FAMILY <> 'Unspecified' AND PLA_LINE  <> 'Unspecified'
                 ORDER by PLA_LINE,PLA_FAMILY,PLA_AREA ) table1 
               cross join 
                 (select level n from dual connect by level <= 4) table2 )
  ) TABLE1  

FULL OUTER JOIN 

(
SELECT   E.PLA_LINE || ' > ' || E.PLA_FAMILY || ' > '|| E.PLA_AREA As AREA, SUM (EXTRACT(DAY FROM C.HOURS)*24 + EXTRACT ( HOUR FROM C.HOURS) + EXTRACT ( MINUTE FROM C.HOURS)/60 ) AS DURATION  , QTR

FROM 

( SELECT EMP_ID,PLA_LINE,PLA_FAMILY,PLA_AREA 
   FROM TT_EMPLOYEE_PLA_ACCESS
	  WHERE         ((:P30_SELECT_PLA_LINE is null or instr(upper(PLA_LINE),upper(:P30_SELECT_PLA_LINE)) > 0) AND 
			 (:P30_SELECT_PLA_FAMILY is null or instr(upper(PLA_FAMILY),upper(:P30_SELECT_PLA_FAMILY)) > 0) AND 
                	 (:P30_SELECT_PLA_AREA is null or instr(upper(PLA_AREA),upper(:P30_SELECT_PLA_AREA)) > 0)
			) 	
	) E, 
    
	 TTESESSIONS_ATTENDEE F , 
	 
	 ( SELECT EXTRACT (DAY FROM A.NUMBER_OF_DAYS) * A.INTERVAL AS HOURS , A.TRAINING_ID, A.SESSION_ID , CASE 
           WHEN EXTRACT(month FROM A.FROM_DATETIMEL)  IN (12, 1, 2) THEN '3'
           WHEN EXTRACT(month FROM A.FROM_DATETIMEL) IN (3, 4, 5)  THEN '4'
           WHEN EXTRACT(month FROM A.FROM_DATETIMEL) IN (6, 7, 8) THEN '1'
           ELSE '2'
           END As QTR 

            FROM TTEVENT_SESSIONS A, TT_EVENT B
            WHERE A.TRAINING_ID = B.TRAINING_ID
		AND   ((:P30_SELECT_PLA_LINE is null or instr(upper(TOWARDS_PLA_LINE),upper(:P30_SELECT_PLA_LINE)) > 0) AND 
			   (:P30_SELECT_PLA_FAMILY is null or instr(upper(TOWARDS_PLA_FAMILY),upper(:P30_SELECT_PLA_FAMILY)) > 0) AND 
			   (:P30_SELECT_PLA_AREA is null or instr(upper(TOWARDS_PLA_AREA),upper(:P30_SELECT_PLA_AREA)) > 0)
			  )
               AND  ( A.FROM_DATETIMEL between ADD_MONTHS(to_date('01-06-'|| :P30_YEAR ,'dd-mm-yyyy'),-12) and to_date('01-06-' || :P30_YEAR,'dd-mm-yyyy')  )
	 ) C

     WHERE C.TRAINING_ID = F.TRAINING_ID AND
	       C.SESSION_ID = F.SESSION_ID AND
	       E.EMP_ID = F.ATTENDEE_ID 
      GROUP BY  E.PLA_LINE, E.PLA_FAMILY, E.PLA_AREA , QTR
) TABLE2
ON TABLE1.QTR= TABLE2.QTR AND
TABLE1.AREA= TABLE2.AREA
ORDER BY AREA, QTR
)
  SELECT *
  FROM   pivot_data
  PIVOT (
   SUM(DURATION)	
   for QTR in (1 as "FYQ1",2 as "FYQ2",3 as "FYQ3" ,4 as "FYQ4")
))
 group by rollup ( AREA ) 
) WHERE AREA != 'TOTAL';
 