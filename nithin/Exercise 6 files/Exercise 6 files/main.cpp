#include <iostream>
#include "Automobile.h"
#include "Cabrio.h"
#include "Limousine.h"
#include "Van.h"
#include "Cars.h"
using namespace std;

int main()
{
    int select=0;
    Cabrio  c;
    Limousine  l ;
    Van  v;
    Automobile *vehicle1=&c;
    Automobile *vehicle2=&l;
    Automobile *vehicle3=&v;

    while(1)
    {
        cout<< "*-----------------------------------------------------------------------------------"<<endl;
        cout<<" 1) Accelerate Cabrio " << endl;
        cout<< "2) Brake Cabrio " << endl;
        cout<< " 3) Accelerate Limo " << endl;
        cout<< " 4) Brake Limo " << endl;
        cout<< " 5) Accelerate Van"<< endl;
        cout<< "6) Brake van"<< endl;
        cout<< "7) Actual speed of all cars"<< endl;
        cout<< "0) Exit"<< endl;
        cout<< "Please select an option by enter a number which is listed above:  ";
        cin>> select;
        switch(select)
        {
        case 1:
            vehicle1-> Accelerate();
            break;
        case 2:
             vehicle1-> Brake();
             break;
         case 3:
             vehicle2-> Accelerate();
             break;
         case 4:
            vehicle2-> Brake();
            break;
         case 5:
            vehicle3-> Accelerate();
            break;
         case 6:
            vehicle3-> Brake();
            break;
         case 7:
            cout<< "Actual speed of all cars"<< endl;
            cout<< "The current speed of Cabrio is " <<vehicle1-> currentspeed()<<"km/h"<<endl;
            cout<< "The current speed of Luminous is"<< vehicle2-> currentspeed()<<"km/h"<<endl;
            cout<<"The current speed of Van is"<< vehicle3-> currentspeed()<<"km/h"<< endl;
            break;
        case 0:
             cout<< "Thank you."<<endl;
             return 0;
        default:
            cout<<"Wrong choice." << endl;


        }
    }
    return 0;

}

