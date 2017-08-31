

#ifndef CAR_H
#define CAR_H
#include <string> 
#include <iostream>
using namespace std;
enum TStatus {OK,SOLD,DEFECT};

struct TDate{
int year;
int month;
int day;
};


class CarClass {

string brand;
struct TDate manufactureDate;
unsigned int priceEuro;
TStatus Status;
unsigned int carId;


public:
unsigned int getID();
unsigned int getPrice();
string getBrand();
TStatus getStatus();
string getManufactureDate();
void sellCar();
void defect();
void setbrand(string brandname);
void setmanufactureDate(TDate date);
void setPrice(unsigned int price);
void setStatus (TStatus state);
void setID(unsigned int id);
void setNewCar(string brand,unsigned int price ,TDate date,TStatus status, int id);
 

};


#endif