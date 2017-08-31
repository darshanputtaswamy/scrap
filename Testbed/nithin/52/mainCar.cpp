#include <iostream>
#include <vector> //header file where std::vector is defined
#include <stdlib.h>   
#include <ostream>      // std::flush
#include <string> 
#include <sstream>
#include <iostream>

#include "Car.h"

using namespace std;

unsigned  int MAX = 100;
std::vector<CarClass>  Car(MAX);



unsigned int Count = 0;

void  Addcar(){
string brand; 
TDate date ;
TStatus status ;
unsigned int id;
unsigned int price;
  cout << "Input the brand of the car : ";
  cin >> brand;
  cout << "Input the Price of the car : ";
  cin >> price;
  cout << "Input the manufacture year : ";
  cin >> date.year;
  cout << "Input the manufacture month : ";
  cin >> date.month;
  cout << "Input the manufacture day : ";
  cin >> date.day;
  
Car[Count].setNewCar(brand,price,date,status,Count);
Count++;

}


void print(int i){
	
	cout << "No." << Car[i].getID() << "-->  " << Car[i].getBrand() << " " << Car[i].getPrice() << "$ " << Car[i].getManufactureDate() << " ";
	
	switch(Car[i].getStatus())
{
    case 0  : std::cout << "OK\n";   break;
    case 1  : std::cout << "SOLD\n"; break;
    case 2  : std::cout << "DEFECT\n";  break;
}
	
}
void  ListCar(){
unsigned int i = 0;
cout << "\n";
while (i < Count){
print(i);
i++;
}

}

void  SellCar(){
unsigned int id;
ListCar();
cout << "Which car you want to sell : ";
cin  >> id ;
Car[id].sellCar();

}



void  DefectCar(){
unsigned int id;
ListCar();
cout << "Which car as defect : ";
cin  >> id ;
Car[id].defect();

}


 void switch_case()
   {
	   
	while(1){
		
		
		string Menu = "\n======================================\n\tMENU\n1\t--\tAdd a car\n2\t--\tSell a car\n3\t--\tList all cars\n0\t--\tExit Program\n======================================\nYour Choice:\t";
		string i;
		cout << Menu ;
		cin>>i;
		
		int MenuChoice;
		std::istringstream iss(i);

		int num = 0;

		if (!(iss >> num).fail()) {
			MenuChoice = num ;
		}
		else {
			std::cerr << "There was a problem converting the string to an integer!" << std::endl;
			MenuChoice = 100;
		}



		switch(num)
		{
		case 1:
			 Addcar();
		  break;

		case 2:
			 SellCar();
		  break;

		case 3:
			 ListCar();
		  break;
		  
		case 0:
		  exit(0);

		default:
		  cout<<"wrong choice ";
		}
	}
  }
  

   
int main()
{
  switch_case();
}
