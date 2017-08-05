#include<iostream>
#include "Automobile.h"
#include "Cabrio.h"
#include "Limousine.h"
#include "Van.h"
#include "Cars.h"

using namespace std;

Limousine::Limousine()
{
    Limousine_speed=0;
}

int Limousine::currentspeed()
{
    if(Limousine_speed>0)
    {
      return Limousine_speed ;
    }
    else
    {
        return(Limousine_speed=0);

    }

}
void Limousine::Brake()
{
    Limousine::currentspeed();
    Limousine_speed -=30;
    if (Limousine_speed>0)
    {
        cout<<"Brake the limousine speed by 30 km/h " <<endl;
        cout<<"The new speed of the limousine is "<<Limousine_speed<<"km/h"<<endl;

    }
    else
    {
        cout<<"Brake the limousine speed by 30 km/h"<<endl;
        cout<<"The new speed of the limousine is " <<0<<"km/h"<<endl;
    }
}
void Limousine :: Accelerate()
{
    Limousine ::currentspeed();
    Limousine_speed +=35;
    cout<<"The new speed of the limousine is "<<Limousine_speed <<"km/h"<<endl;
}

