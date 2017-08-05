#ifndef Limousine_H
#define Limousine_H


class Limousine : virtual public Cabrio
{
    public:
        Limousine();
        int currentspeed();
        void Brake();
        void Accelerate();




    private:
        int Limousine_speed;
};

#endif // LIMOUSINE_H

