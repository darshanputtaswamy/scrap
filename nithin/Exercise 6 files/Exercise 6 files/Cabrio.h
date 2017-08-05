#ifndef Cabrio_H
#define Cabrio_H


class Cabrio : public Automobile
{
    public:
        Cabrio();// accessor function

        int currentspeed ();
        void Brake();
        void Accelerate();



    private:
        int Cabrio_speed;
};

#endif // CABRIO_H

