a. Budowanie obrazu kontenera:
    docker build -t weather-app .

b. Uruchomienie kontenera:
    docker run -p 3000:3000 --name zadanie1 weather-app

c. Sprawdzenie "logów":
    docker logs zadanie1

d. Sprawdzenie liczby warstw:
    docker image history weather-app
