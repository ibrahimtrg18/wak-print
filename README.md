# print-online
clone terlebih dahulu
```
$ git clone "https://github.com/t33rg3/print-online.git"
```
## Installasi
#### client
```
$ cd client                 // masuk ke direktori client
$ npm install               // install module
$ npm run build:css         // install tailwindcss
$ npm start                 // jalankan client localhost:3000
```
#### server
```
$ cd server                 // masuk ke direktori server
$ npm install               // install module
$ npm run devStart          // jalankan server localhost:4000
atau
$ node .                    // jalankan server di port localhost:4000
```

#### router atau endpoint pada server
|Method     |Endpoint                    |kegunaan                                          | 
|-----------|----------------------------|--------------------------------------------------| 
|POST       |/api/user/register          |membuat account baru untuk **user**|
|POST       |/api/user/login             |masuk account untuk **user**|
|GET        |/api/user/:userId           |memberikan informasi **user** dari **id user**|
|POST       |/api/parent/register        |masuk account untuk **parent**|
|POST       |/api/parent/login           |masuk account untuk **parent**|
|GET        |/api/parent/:parentId       |memberikan informasi **parent** dari **id parent**|
