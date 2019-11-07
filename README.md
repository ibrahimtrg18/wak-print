# print-online
clone terlebih dahulu
```
$ git clone "https://github.com/t33rg3/print-online.git"
```
## Installasi
### client
```
$ cd client                 // masuk ke direktori client
$ npm install               // install module
$ npm run build:css         // install tailwindcss
$ npm start                 // jalankan client localhost:3000
```
### server
```
$ cd server                 // masuk ke direktori server
$ npm install               // install module
$ npm run devStart          // jalankan server localhost:4000
atau
$ node .                    // jalankan server di port localhost:4000
```

## Router atau End-point pada serve
|Method     |Endpoint                    |kegunaan                                                  | 
|-----------|----------------------------|----------------------------------------------------------| 
|POST       |/api/user/register          |Membuat Account baru untuk **user**                       |
|POST       |/api/user/login             |Masuk Account untuk **user**                              |
|GET        |/api/user/:userId           |Memberikan Informasi **user** berdasarkan **:userId**     |
|POST       |/api/parent/register        |Membuat Account untuk **parent**                          |
|POST       |/api/parent/login           |Masuk Account untuk **parent**                            |
|GET        |/api/parent/:parentId       |Memberikan Informasi **parent** berdasarkan **:parentId** |
