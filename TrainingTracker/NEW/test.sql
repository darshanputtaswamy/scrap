WITH  TABLEA     AS
(
SELECT * FROM
(
SELECT COALESCE(TABLE1.EMP_ID , TABLE2.EMP_ID) AS EMP_ID , MANAGER_ID  ,COALESCE(DURATION , 0) AS DURATION   ,  COALESCE(TABLE1.QTR, TABLE2.QTR) AS QTR 
FROM (   ( select table1.EMP_ID, table1.MANAGER_ID , TO_CHAR(table2.n) as QTR
               from 
                ( SELECT EMP_ID , MANAGER_ID
				 FROM TT_EMPLOYEE
				 START WITH EMP_ID= :P7_MANAGER_ID
				 CONNECT BY MANAGER_ID= PRIOR EMP_ID  ) table1 
               cross join 
                 (select level n from dual connect by level <= 4) table2 )
  ) TABLE1  

FULL OUTER JOIN 
(
               SELECT  B.ATTENDEE_ID AS EMP_ID ,   SUM (EXTRACT(DAY FROM HOURS)*24 + EXTRACT ( HOUR FROM HOURS) + EXTRACT ( MINUTE FROM HOURS)/60 ) AS DURATION , QTR
				 FROM 
                                 (
                                 SELECT TRAINING_ID , SESSION_ID , 
                                        CASE 
                                        WHEN EXTRACT(month FROM FROM_DATETIMEL)  IN (12, 1, 2) THEN '3'
                                        WHEN EXTRACT(month FROM FROM_DATETIMEL) IN (3, 4, 5)  THEN '4'
                                        WHEN EXTRACT(month FROM FROM_DATETIMEL) IN (6, 7, 8) THEN '1'
                                        ELSE '2'
                                        END As QTR ,EXTRACT (DAY FROM NUMBER_OF_DAYS) * INTERVAL AS HOURS
				 FROM TTEVENT_SESSIONS
                                 WHERE
                                  ( FROM_DATETIMEL between ADD_MONTHS(to_date('01-06-'|| :P30_YEAR ,'dd-mm-yyyy'),-12) and to_date('01-06-' || :P30_YEAR,'dd-mm-yyyy') )
                                 ) A ,

				 TTESESSIONS_ATTENDEE B ,

				 (
                                 SELECT EMP_ID 
				 FROM TT_EMPLOYEE
				 START WITH EMP_ID= :P7_MANAGER_ID
				 CONNECT BY MANAGER_ID= PRIOR EMP_ID 

				 ) C

				 WHERE
				 B.ATTENDEE_ID = C.EMP_ID
				 AND A.TRAINING_ID = B.TRAINING_ID 
				 AND A.SESSION_ID = B.SESSION_ID  
				 GROUP BY ATTENDEE_ID, QTR 
)  TABLE2
ON TABLE1.QTR= TABLE2.QTR AND
TABLE1.EMP_ID= TABLE2.EMP_ID )
pivot( SUM(DURATION)	
   for QTR in (1 as "FYQ1",2 as "FYQ2",3 as "FYQ3" ,4 as "FYQ4") 
   )
)
  SELECT EMP_ID,( SELECT SUM(FYQ1)  FROM TABLEA  E2 
				START WITH E2.EMP_ID= TT_EMPLOYEE.EMP_ID
				CONNECT BY PRIOR E2.EMP_ID= E2.MANAGER_ID) FYQ1 , 
                (SELECT SUM(FYQ2)  FROM TABLEA  E2 
				START WITH E2.EMP_ID= TT_EMPLOYEE.EMP_ID
				CONNECT BY PRIOR E2.EMP_ID= E2.MANAGER_ID) FYQ2 , 
                (SELECT SUM(FYQ3)  FROM TABLEA  E2 
				START WITH E2.EMP_ID= TT_EMPLOYEE.EMP_ID
				CONNECT BY PRIOR E2.EMP_ID= E2.MANAGER_ID) FYQ3 , 
                (SELECT SUM(FYQ4)  FROM TABLEA  E2 
				START WITH E2.EMP_ID= TT_EMPLOYEE.EMP_ID
				CONNECT BY PRIOR E2.EMP_ID= E2.MANAGER_ID) FYQ4 
FROM TT_EMPLOYEE
CONNECT BY MANAGER_ID= PRIOR EMP_ID 
START WITH EMP_ID= :P7_MANAGER_ID










!!--------------------------------------

SELECT AREA ,  FYQ1M1 , FYQ1M2,FYQ1M3,FYQ2M1,FYQ2M2,FYQ2M3,FYQ3M1,FYQ3M2,FYQ3M3,FYQ4M1,FYQ4M2,FYQ4M3,  SUM(FYQ1M1+FYQ1M2+FYQ1M3+FYQ2M1+FYQ2M2+FYQ2M3+FYQ3M1+FYQ3M2+FYQ3M3+FYQ4M1+FYQ4M2+FYQ4M3   )  As Total
FROM (
(WITH pivot_data AS (
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
                 (select level n from dual connect by level <=12) table2 )
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
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL)  IN (12) THEN '12'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL) IN (11)  THEN '11'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL) IN (10) THEN '10'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL)  IN (9) THEN '9'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL) IN (8)  THEN '8'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL) IN (7) THEN '7'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL)  IN (6) THEN '6'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL) IN (5)  THEN '5'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL) IN (4) THEN '4'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL)  IN (3) THEN '3'
			  WHEN EXTRACT(month FROM A.FROM_DATETIMEL) IN (2)  THEN '2'
			  ELSE '1'
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
 FROM pivot_data
 PIVOT (
 SUM(DURATION) 
 for QTR in (6 as "FYQ1M1"  ,7 as "FYQ1M2",8 as "FYQ1M3",9 as "FYQ2M1",10 as "FYQ2M2" ,11 as "FYQ2M3",12 as "FYQ3M1" ,1 as "FYQ3M2",2 as "FYQ3M3",3 as "FYQ4M1",4 as "FYQ4M2",5 as "FYQ4M3" )
)))
GROUP BY AREA ,FYQ1M1 , FYQ1M2,FYQ1M3,FYQ2M1,FYQ2M2,FYQ2M3,FYQ3M1,FYQ3M2,FYQ3M3,FYQ4M1,FYQ4M2,FYQ4M3
 