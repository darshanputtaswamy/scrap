#include<stdio.h>
#include<stdlib.h>
#include<string.h>

struct test{
	
	int i;
	char *c;
	
}st[]={5,"become",4,"better",6,"jungle",8,"ancestor",7,"brother"};

main(){

//int a[] = {0,1,2,3,4};

//int *p[] ={a,a+1,a+2,a+3,a+4};

//int **ptr = p;
int *a;
{
	int i=30;
	a=&i;
	
}
printf("%d\n",*a);

/*
int i=5;
i=(++i)/(i++);
printf("%d \n",i);


struct test *p = st;
p+=1;
++p->c;
printf("%s\n",(p++->c));
printf("%c\n",*++p->c);
printf("%d\n",p[0].i);
printf("%s\n",p->c);
/*
++p->c;
printf("%s",++p->c);
printf("%c",*++(p->c));
printf("%s",p[0].i);
printf("%s",p->c);
/*
char *p ,*str,*str1;

p=&s[3];

str=p;
str1=p;
printf("%c",++*p+++*str1-32);


/*   
char p[20];
char *s = "String";

int l=strlen(s),i;

for (i=0;i<l;i++){
	p[i]=s[l-i];
	printf("%s\n",p[i]);

}

printf("%s",p);
/*
printf("ptr2:%u ptr:%u   p:%u  &a:%u  \n",ptr2,ptr,p,&a);
printf("*ptr:%u **ptr:%u *p:%u **p%u \n",*ptr, **ptr,*p,**p);
printf("*ptr2:%u **ptr2:%u ***ptr2:%u  \n",*ptr2 , **ptr2,***ptr2);
printf("&ptr2:%u &ptr:%u &p:%u ",&ptr2 ,&ptr,&p);

/*
**ptr++;
printf("%u %u %d %d %d \n",ptr,p,ptr-p,*ptr-a,**ptr );

*++*ptr;
printf("%d %d %d \n",ptr-p,*ptr-a,**ptr );

printf("%u %u  \n",ptr,p);
++**ptr;
printf("%d %d %d \n",ptr-p,*ptr-a,**ptr );
*/
}