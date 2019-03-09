# Github jobs example

Simple application for viewing github jobs.

Build with React and PHP.

API usage: https://jobs.github.com/api

Original service: https://jobs.github.com/

# Install

1 . Clone repository

```
git clone https://github.com/antonshell/github-jobs.git
```

2 . Install php dependencies

```
cd backend
composer install
```

3 . Install js dependencies

```
cd frontend
npm install
```

# Run

1 . Run built in server:

```
cd backend/public
php -S 127.0.0.1:8000
```

2 . Open in browser, Ensure api works

```
http://127.0.0.1:8000/server/search?search=php&page=1
http://127.0.0.1:8000/server/get/3299b71e-0c21-4bec-9c04-0d74c9db6331
```

3 . Start frontend application

```
cd frontend
npm start
```

4 . Open in browser:

```
http://localhost:3000/
```