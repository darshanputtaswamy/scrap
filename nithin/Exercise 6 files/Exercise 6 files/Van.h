#ifndef Van_H
#define Van_H


class Van : virtual public Limousine
{
    public:
        Van();
        int currentspeed();
        void Brake();
        void Accelerate();


    private:
        int van_speed;
};

#endif // VAN_H

