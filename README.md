# BudgetMate - System monitorowania wydatków domowych

## 📌 Opis projektu

Aplikacja webowa służąca do monitorowania i analizy wydatków. Została stworzona z wykorzystaniem technologii takich jak Node.js, Express, Sequelize, SQLite i Tailwind. System pozwala na zarządzanie budżetem domowym w prosty i przejrzysty sposób — umożliwia dodawanie, edytowanie i usuwanie wydatków, a także generowanie podstawowych raportów miesięcznych.

## ✅ Funkcjonalności

- Dodawanie wydatków z podziałem na kategorie (np. żywność, odzież, transport).
- Przeglądanie listy wydatków z możliwością filtrowania i edycji.
- Usuwanie wydatków.
- Generowanie miesięcznych raportów z podziałem na kategorie.
- Filtrowanie po kliknięciu na nazwę kategorii.

## 🚀 Instrukcja uruchomienia aplikacji

### Wymagania:
- Node.js `>=18.x`
- NPM lub Yarn

### Instalacja i uruchomienie:

```bash
git clone https://github.com/dima-kharchenko/mvc-uni-project && cd mvc-uni-project
```

```bash
npm install
```

```bash
npm start
```

## 📖 Biblioteki zewnętrzne:

- `express` - framework serwera HTTP
- `express-session` - zarządzanie sesją użytkownika
- `sequelize` - ORM do bazy danych
- `sqlite3` - baza danych
- `passport` + passport-local - autoryzacja i logowanie
- `ejs` - szablonowy silnik HTML
- `tailwindcss` - stylowanie frontendu
- `nodemon` - automatyczne restartowanie serwera

## 🧩 Struktura aplikacji
Aplikacja została zbudowana zgodnie z wzorcem MVC (Model-View-Controller):

### 📁 Modele (`models/`)
- `User.js` - model użytkownika zawierający pola: username, password, salt.
- `Expense.js` - model wydatku z polami: amount, category, date, userId.

### 📁 Kontrolery (`controllers/`)
- `authController.js` - obsługuje rejestrację, logowanie i wylogowywanie użytkownika.
- `expensesController.js` - obsługuje dodawanie, edycję i usuwanie wydatków.
- `homeController.js` - renderuje stronę główną.

### 📁 Widoki (`views/`)
- `partials/` - wspólne komponenty, np. nagłówek, stopka.
- `/` - wszystkie widoki.

## 🧪 Testowy użytkownik

Po zalogowaniu na konto testowe (`test` / `test`) dostępne są przykładowe wydatki, które można przeglądać, edytować i usuwać.
