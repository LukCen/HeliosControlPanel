# Helios Control Panel

Proste narzędzie devops zaprojektowane na własne potrzeby - jako praktyka Electrona i ogólnego rozwijania aplikacji, głównie do zarządzania lokalnym serwerem - nawiązywanie i monitorowanie połączeń i przesyłanie plików bez konieczności kontaktu z maszyną serwera.


# ver 0.5.0 - Dane serwera zasobów i bazy danych do których chcemy się podłączyć należy zmienić w odpowiednich plikach - odpowiednio fileTransfer.mjs i _db_connect.mjs


## fileTransfer.mjs
```
// konfiguracja serwera zasobów do którego chcemy wysłać zasoby
const config = {
  host: 'adres-hosta',
  port: 'twoj-port',
  username: 'twoja-nazwa-uzytkownika',
  password: 'twoje-haslo'
}

// adres folderu w którym zasoby mają wylądować
const remotePath = `/sciezka/do/pliku`
```
## _db_connect.mjs
```
  const [rows] = await db.query('SELECT * FROM products') // tutaj wpisz zapytanie MySQL jakie chcesz wykonać
```


Tymczasowo zakodowanie na sztywno - w przyszłości przerobię to na bardziej wszechstronny interfejs.

Aby włączyć aplikację, należy przejść włączyć konsolę/terminal, przejść do folderu w którym znajduje się plik 'main.js' tej aplikacji, i uruchomić komendę 'npm run start' bądź, gdy nie mamy zainstalowanego NPM, 'electron .'
