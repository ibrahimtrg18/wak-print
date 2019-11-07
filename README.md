# print-online
<<<<<<< HEAD
=======

## Installasi
>>>>>>> 52c96748e026a2ef89857f0f66ef79234752aae8
clone terlebih dahulu
```
$ git clone "https://github.com/t33rg3/print-online.git"
```
<<<<<<< HEAD
## Installasi
=======
>>>>>>> 52c96748e026a2ef89857f0f66ef79234752aae8
#### client
```
$ cd client
$ npm install // install module
$ npm start // jalankan client localhost:3000
```
#### server
```
$ cd server
$ npm install // install module
$ npm run devStart // jalankan server localhost:4000
atau
$ node . // jalankan server di port localhost:4000
```

#### router atau endpoint pada server
Endpoint                    |kegunaan                                          | 
----------------------------|--------------------------------------------------| 
/api/user/register          |membuat account baru untuk **user**|
/api/user/login             |masuk account untuk **user**|
/api/user/:userId           |memberikan informasi **user** dari **id user**|
/api/parent/register        |masuk account untuk **parent**|
/api/parent/login           |masuk account untuk **parent**|
/api/parent/:parentId       |memberikan informasi **parent** dari **id parent**|
