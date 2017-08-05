
#include<iostream>
#include "Automobile.h"
#include "Cabrio.h"
#include "Limousine.h"
#include "Van.h"
#include "Cars.h"
using namespace std;


Van::Van()
{
    Van_speed=0;
}

int Van::currentspeed()
{
    if (Van_speed>0)
    {
        return Van_speed;
    }
    else
    {
        return (Van_speed=0);
    }
}
void Van::Brake()
{
    Van::currentspeed();
    Van_speed -=25;
    if(Van_speed>0)
    {
        cout<<"Brake the van speed by 25 km/h "<<endl;
        cout<<"The new speed of the van is "<<van_speed<<"km/h"<<endl;
    }
    else
    {
        cout<<"Brake the van speed by 25 km/h"<<endl;
        cout<<"The new speed of the van is "<<0<<"km/h"<<endl;
    }
}
void Van::Accelerate()
{
    Van::currentspeed();
    Van_speed +=20;
    cout<<"The new speed of the van is"<<van_speed<<"km/h"<<endl;
}

