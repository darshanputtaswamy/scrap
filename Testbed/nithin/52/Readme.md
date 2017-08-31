Project Title: CarShop
--------------

Getting Started: Manage your Car Shop inventory using below Software 
---------------

Prerequisites:
--------------
gcc version 5.4.0 (GCC)
GNU Make 4.2.1


Installing:
----------

dpp@DPP-LAP>$ Unzip 52

dpp@DPP-LAP>$ cd 52

dpp@DPP-LAP>$ ls -li
Readme.md Car.cpp	 Car.h	 mainCar.cpp	 Makefile

dpp@DPP-LAP>$ make
g++ -O -c mainCar.cpp
g++ -O -c Car.cpp
g++ -O -o CarShop mainCar.o Car.o


dpp@DPP-LAP>$ ./CarShop.exe

  
Built With:
------------
 GNU C++
 Make 
 
 
License:
---------
This project is licensed under the MIT License - see the LICENSE.md file for details


Acknowledgments:
----------------

How To run this:
------------------
dpp@DPP-LAP$./CarShop.exe

======================================
        MENU
1       --      Add a car
2       --      Sell a car
3       --      List all cars
0       --      Exit Program
======================================
Your Choice:    1
Input the brand of the car : BMW
Input the Price of the car : 12000
Input the manufacture year : 1992
Input the manufacture month : 8
Input the manufacture day : 2

======================================
        MENU
1       --      Add a car
2       --      Sell a car
3       --      List all cars
0       --      Exit Program
======================================
Your Choice:    1
Input the brand of the car : AUDI
Input the Price of the car : 20000
Input the manufacture year : 2013
Input the manufacture month : 3
Input the manufacture day : 31

======================================
        MENU
1       --      Add a car
2       --      Sell a car
3       --      List all cars
0       --      Exit Program
======================================
Your Choice:    3

No.0-->  BMW 12000$ 1992/8/2 OK
No.1-->  AUDI 20000$ 2013/3/31 OK

======================================
        MENU
1       --      Add a car
2       --      Sell a car
3       --      List all cars
0       --      Exit Program
======================================
Your Choice:    2

No.0-->  BMW 12000$ 1992/8/2 OK
No.1-->  AUDI 20000$ 2013/3/31 OK
Which car you want to sell : 0

======================================
        MENU
1       --      Add a car
2       --      Sell a car
3       --      List all cars
0       --      Exit Program
======================================
Your Choice:    3

No.0-->  BMW 12000$ 1992/8/2 SOLD
No.1-->  AUDI 20000$ 2013/3/31 OK

======================================
        MENU
1       --      Add a car
2       --      Sell a car
3       --      List all cars
0       --      Exit Program
======================================
Your Choice:    0

dpp@DPP-LAP 
