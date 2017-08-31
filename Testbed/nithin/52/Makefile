CFLAGS = -O
CC = g++
CarShop: mainCar.o Car.o
	$(CC) $(CFLAGS) -o CarShop mainCar.o Car.o
mainCar.o: mainCar.cpp
	$(CC) $(CFLAGS) -c mainCar.cpp
Car.o: Car.cpp
	$(CC) $(CFLAGS) -c Car.cpp
clean:
	rm -f core *.o 