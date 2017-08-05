#include<iostream>
#include "Automobile.h"
#include "Cabrio.h"
#include "Limousine.h"
#include "Van.h"
#include "Cars.h"

using namespace std;

Cabrio::Cabrio()
{
    Cabrio_speed=0;
}

int Cabrio::currentspeed()
{
    if(Cabrio_speed>0) // condition for checking speed
    {
        return Cabrio_speed; // if the speed is positive then it returns the positive speed
    }
    else
    {
        return(Cabrio_speed=0); //if the speed is negetive then it sets the speed as zero and returns the zero speed

    }
}
void Cabrio::Brake()
{
    Cabrio::currentspeed(); // to get positive or zero speed by recalling the method
    Cabrio_speed -=30; // equation for reducing speed
    if(Cabrio_speed>0) // if speed is positive then it prints the actual speed
    {
        cout<<"Brake the Cabrio speed by 30 km/h !" <<endl;
        cout<<"The new speed of the Cabrio is" <<Cabrio_speed<<"km/h" <<endl;

    }
    else{
        cout <<"Brake the Cabrio speed by 30 km/h" <<endl;
        cout<<"The new speed of the Cabrio is "<<0<<"km/h"<<endl;

    }
}
void Cabrio::Accelerate()
{
    Cabrio::currentspeed();// to get positive or zero speed by recalling the method
    Cabrio_speed +=40; //equation for accelerating the speed
    cout<<"The new speed of the Cabrio is " <<Cabrio_speed<<"km/h"<<endl;

}
