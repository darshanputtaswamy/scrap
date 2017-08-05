SELECT * 
FROM (
SELECT EMP_ID,FYQ1,FYQ2,FYQ3,FYQ4,TOTAL, quater
FROM  
(SELECT * FROM (
SELECT  EMP_ID  , MANAGER_ID  ,  SUM(FYQ1) FYQ1,  SUM(FYQ2) FYQ2,  SUM(FYQ3) FYQ3, SUM(FYQ4) FYQ4,  SUM(Fyq1+Fyq2+Fyq3+Fyq4) as total  FROM 
(
WITH pivot_data AS (

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
TABLE1.EMP_ID= TABLE2.EMP_ID
ORDER BY EMP_ID, QTR
)
  SELECT *
  FROM   pivot_data
  PIVOT (
   SUM(DURATION)	
   for QTR in (1 as "FYQ1",2 as "FYQ2",3 as "FYQ3" ,4 as "FYQ4")
))
 group by rollup (MANAGER_ID,EMP_ID ) 
) WHERE EMP_ID != 'TOTAL' )
CONNECT BY MANAGER_ID= PRIOR EMP_ID 
START WITH EMP_ID= :P7_MANAGER_ID )
WHERE LEAF=  1 and (:P8_SCOPE = 0 or D = 2);