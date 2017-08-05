SELECT * FROM (
WITH TABLEQ AS
(
SELECT EMP_ID,	MANAGER_ID,	FYQ1,	FYQ2,	FYQ3,	FYQ4, CONNECT_BY_ROOT EMP_ID as ROOT
 FROM (
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
)CONNECT BY MANAGER_ID= PRIOR EMP_ID 
     AND    ( PRIOR FYQ1 = '0' AND PRIOR FYQ2 = '0' AND PRIOR FYQ3 = '0' AND PRIOR FYQ4 = '0' )
), TABLEW as
(
     SELECT     ROOT , SUM (FYQ1) AS FYQ1 ,   SUM (FYQ2) AS FYQ2 ,   SUM (FYQ3) AS FYQ3 ,   SUM (FYQ4)  AS FYQ4 , SUM(FYQ1+FYQ2+FYQ3+FYQ4 ) AS TOTAL
     FROM     TABLEQ
     GROUP BY root
)
SELECT EMP_ID, FYQ1,FYQ2,FYQ3,FYQ4 , TOTAL , CONNECT_BY_ISLEAF AS LEAF , LEVEL AS D  
FROM TT_EMPLOYEE e JOIN TABLEW d     
ON e.EMP_ID    = d.root
 START WITH EMP_ID= :P7_MANAGER_ID
 CONNECT BY MANAGER_ID= PRIOR EMP_ID 
 ) WHERE LEAF= 0 and (:P30_SCOPE = 0 or D = 2);