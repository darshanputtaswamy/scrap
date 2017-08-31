
#include "Car.h"
#include <stdlib.h>   
#include <ostream>      // std::flush
#include <string> 
#include <sstream>
#include <iostream>


unsigned int CarClass::getID(){
	return carId;
}

unsigned int CarClass::getPrice(){
	return priceEuro;
}

string CarClass::getBrand(){
	return brand;
}


TStatus CarClass::getStatus(){
    return Status;
}



string CarClass::getManufactureDate(){


std::stringstream manufactureDateInStringStream;
manufactureDateInStringStream  << manufactureDate.year << "/" << manufactureDate.month << "/"<< manufactureDate.day;
std::string manufactureDateInString = manufactureDateInStringStream.str();
	
	return manufactureDateInString ;
}

void CarClass::setmanufactureDate(TDate date){
	manufactureDate = date;
}


void CarClass::setID(unsigned int id){
	carId = id;
}

void CarClass::setbrand(string brandname){
	brand = brandname;
	
};

void CarClass::setPrice(unsigned int price){
	priceEuro = price;
}

void CarClass::setStatus (TStatus state){
   	Status = state ;
}

void CarClass::sellCar(){
	setStatus(SOLD);
}


void CarClass::defect(){
	setStatus(DEFECT);
}

void CarClass::setNewCar(string brand,unsigned int price ,TDate date, TStatus status, int id){
	setID(id);
	setbrand(brand);
	setPrice(price);
    setmanufactureDate(date);
    setStatus(OK);	
}





 
