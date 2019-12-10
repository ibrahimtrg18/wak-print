# print-online
clone terlebih dahulu
```
$ git clone "https://github.com/t33rg3/print-online.git"
```

## Installasi / Set Up

### database
buka database mysql kalian dan import sql query didalam wak_print_backup.sql dan 
pastikan nama databasenya wak_print

### server
sebelum melakukan command dibawah, lakukanlah configurasi database mysql.
di dalam folder "./config/key" ada 2 object yang harus diubah.    
**mysqlUser** -> user mysql anda.  
**mysqlPassword** -> password mysql anda.  
pastikan anda sudah melakukan tahap **database**
```
$ cd server                 // masuk ke direktori server
$ npm install               // install module
$ npm start                 // jalankan server localhost:4000
atau
$ node .                    // jalankan server di port localhost:4000
```

### client
```
$ cd client                 // masuk ke direktori client
$ npm install               // install module
$ npm run build:css         // jalankan script mensalin tailwindcss.config ke folder ./public/style.css
$ npm start                 // jalankan client localhost:3000
```

## Router atau End-point pada server
| Method    | Endpoint                      | kegunaan                                                  |
|-----------|-------------------------------|-----------------------------------------------------------|
| POST      | /api/user/register            | Membuat Account baru untuk **user**                       |
| POST      | /api/user/login               | Masuk Account untuk **user**                              |
| GET       | /api/user/:userId             | Memberikan Informasi **user** berdasarkan **:userId**     |
| POST      | /api/parent/register          | Membuat Account untuk **parent**                          |
| POST      | /api/parent/login             | Masuk Account untuk **parent**                            |
| GET       | /api/parent/:parentId         | Memberikan Informasi **parent** berdasarkan **:parentId** |
| GET       | /api/parent/:parentId/order   | Melihat semua orderan berdasarkan :partnerId              |
| POST      | /api/order/                   | Membuat order                                             |
| POST      | /api/order/:id                | Detail order                                              |
| POST      | /api/order/:id/download       | Membuat order                                             |
| GET       | /api/search?s=print trg       | Mencari Nama Toko berdasarkan isi dari s                  |

### /api/user/register
```
POST http://localhost:4000/api/user/register
Content-Type: application/json
{
    "email":"ibrahimtarigan@gmail.com",                                 // wajib
    "password":"test123",                                               // wajib & password >= 6
    "fullName":"ibrahim tarigan",                                       // wajib
    "phoneNumber":"081260086777",                                       // wajib & phoneNumber <=15
    "address":"Jln. Jend Jamin Ginting No.273, Padang Bulan, Medan"     // wajib
}
```

### /api/user/login
```
POST http://localhost:4000/api/user/login
Content-Type: application/json
{
    "email":"ibrahimtarigan@gmail.com",                                 // wajib
    "password":"test123"                                                // wajib
}
```

### /api/partner/register
```
POST http://localhost:4000/api/partner/register
Content-Type: application/json
{
    "email":"ibrahimtarigan@gmail.com",                                 // wajib
    "password":"test123",                                               // wajib password >= 6
    "fullName":"ibrahim tarigan",                                       // wajib
    "businessName":"print trg",                                         // wajib
    "phoneNumber":"081260086777",                                       // wajib phoneNumber <= 15
    "address":"Jln. Jend Jamin Ginting No.273, Padang Bulan, Medan"     // wajib 
}
```

### /api/partner/login
```
POST http://localhost:4000/api/partner/login
Content-Type: application/json
{
    "email":"ibrahimtarigan@gmail.com",                                 // wajib 
    "password":"test123"                                                // wajib 
}
```
