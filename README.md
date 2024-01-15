# PAMiW---Projekt
Projekt zrealizowany

## Backend

Backend został napisany w Java Spring. Obejmuje implementację bazy danych, udostępnienie endpointów od operacji CRUD na danych oraz autentykację poprzez jwt.
Ogólna struktura plików:
![](img/backend_pliki.png) 

### Hosting
Backend został zahostowany na Railway
![](img/railway_hosting.png)
![](img/adres_hosta.png)

Dodanie adresu do kodu strony
![](img/link_do_api.png)

## Realizacja punktów

Implementacja logowania/rejestracji - użytkownik wybiera i wpisuje nazwę oraz hasło. Aplikacja blokuje dostęp niezalogowanym użytkownikom.
Widok ekranu przed zalogowaniem
![](img/front_bez_logowanie.png)

Dodano możlowość autentykacji przez Google OAuth
![](img/oauth.png)

Po zalogowaniu wyświetla się widok strony głównej razem z danymi pobranymi z api po zalogowaniu
![](img/front_zalogowany.png)

Operacje CRUD

Dodawanie  
![](img/dodawanie.png)

Edycja  
![](img/edycja.png)

Pobieranie wykonuje się automatycznie, zanim dane przyjdą wyświetla się ikona ładowania
![](img/ikona_ladowania.png)

Zaimplementowane są role na backendzie, przy czym jest na stałe dwóch użytkowników ADMIN, a każdy nowy rejestrowany jest jako USER.  
![](img/rola.png)

Dodano możliwość zmiany motywu aplikacji
![](img/ciemny_motyw.png)

Dodano możliwość zmiany języka aplikacji  
![](img/zmiana_jezyka.png)

## Aplikacja Desktopowa

Widok okna autentykacji
![](img/desktop_autentykacja.png)

Widok okna po zalogowaniu
![](img/desktop_zalogowany.png)