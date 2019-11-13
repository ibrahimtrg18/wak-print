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
sebelum menlakukan command dibawah, lakukanlah configurasi database mysql.
di dalam folder "./config/key" ada 2 object yang harus diubah.
mysqlUser -> user mysql anda. contoh: "root"
mysqlPassword -> password mysql anda. contoh: "123456" atau ""

```
$ cd server                 // masuk ke direktori server
$ npm install               // install module
$ npm run devStart          // jalankan server localhost:4000
atau
$ node .                    // jalankan server di port localhost:4000
```


## Router atau End-point pada server
|Method     |Endpoint                    |kegunaan                                                  | 
|-----------|----------------------------|----------------------------------------------------------| 
|POST       |/api/user/register          |Membuat Account baru untuk **user**                       |
|POST       |/api/user/login             |Masuk Account untuk **user**                              |
|GET        |/api/user/:userId           |Memberikan Informasi **user** berdasarkan **:userId**     |
|POST       |/api/parent/register        |Membuat Account untuk **parent**                          |
|POST       |/api/parent/login           |Masuk Account untuk **parent**                            |
|GET        |/api/parent/:parentId       |Memberikan Informasi **parent** berdasarkan **:parentId** |
|POST       |/api/order/                 |Membuat order                                             |

### /api/user/register
```
POST http://localhost:4000/api/user/register
Content-Type: application/json

{
    "email":"hell1o@gmail.com",
    "password":"hello123", // password >= 6
    "fullName":"hello",
    "phoneNumber":"hello", // phoneNumber <=15
    "address":"hello"
}
*semua harus terisi
```

### /api/user/login
```
POST http://localhost:4000/api/user/login
Content-Type: application/json

{
    "email":"hello@gmail.com",
    "password":"hello123"
}
*semua harus terisi
```

### /api/partner/register
```
POST http://localhost:4000/api/partner/register
Content-Type: application/json

{
    "email":"asdmaskD21@gmail.com",
    "password":"asdmaa", // password >= 6
    "fullName":"asdmaskD@gmail.com",
    "businessName":"asdmaskD@gmail.com",
    "phoneNumber":"08123456789", // phoneNumber <= 15
    "address":"asdmaskD@gmail.com"
}
*semua harus terisi
```

### /api/partner/login
```
POST http://localhost:4000/api/partner/login
Content-Type: application/json

{
    "email":"hello@gmail.com",
    "password":"hello12"
}
*semua harus terisi
```


