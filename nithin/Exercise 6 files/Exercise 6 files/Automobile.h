#ifndef Automobile_H
#define Automobile_H


class Automobile
{
	public:
     Automobile(); // accessor function
     virtual int currentspeed()=0;
     virtual void Brake()=0;
     virtual void Accelerate()=0;
     
    private:
};

#endif // AUTOMOBILE_H

