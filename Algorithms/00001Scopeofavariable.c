#include<stdio.h>

int a =600 , b=500;
void Swap(){
int t;
t=a;
a=b;
b=a;

print("%d %d",a,b);

}

main(){
int a=10,b=20;
Swap();
print("%d %d",a,b);

}