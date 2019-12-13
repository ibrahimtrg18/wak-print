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
| Method    | U/P | Endpoint                      | Kegunaan                                                    |
|-----------|-----|-------------------------------|-------------------------------------------------------------|
| POST      |  U  | /api/user/register            | Membuat Account baru untuk **user**                         |
| POST      |  U  | /api/user/login               | Masuk Account untuk **user**                                |
| GET       |  U  | /api/user/:userId             | Memberikan Informasi **user** berdasarkan **:userId**       |
| PUT       |  U  | /api/user/:userId             | Mengubah Informasi **user** berdasarkan **:userId**         |
| GET       |  U  | /api/user/:userId/photo       | Memberikan Photo **user** berdasarkan **:userId**           |
| PUT       |  U  | /api/user/:userId/photo       | Mengubah Photo **user** berdasarkan **:userId**             |

| POST      |  P  | /api/partner/register         | Membuat Account untuk **partner**                           |
| POST      |  P  | /api/partner/login            | Masuk Account untuk **partner**                             |
| GET       |  P  | /api/partner/:partnerId       | Memberikan Informasi **partner** berdasarkan **:partnerId** |
| PUT       |  P  | /api/partner/:partnerId       | Mengubah Informasi **partner** berdasarkan **:partnerId**   |
| GET       |  P  | /api/partner/:partnerId/photo | Memberikan Photo **partner** berdasarkan **:partnerId**     |
| PUT       |  P  | /api/partner/:partnerId/photo | Mengubah Photo **partner** berdasarkan **:partnerId**       |

| GET       |  P  | /api/partner/:partnerId/order | Melihat semua orderan berdasarkan **:partnerId**            |
| POST      |  U  | /api/order/                   | Membuat **order**                                           |
| GET       | U P | /api/order/:id                | Detail **order**                                            |
| GET       |  P  | /api/order/:id/download       | Mendownload **order**                                       |

| GET       |  U  |/api/search?s=print trg        | Mencari Nama Toko berdasarkan isi dari **s**                |
| POST      |  U  |/api/balance/deposit           | Untuk membuat permintaan penambahan wallet                  |
| POST      |  P  |/api/balance/withdraw          | Untuk membuat permintaan pengeluaran wallet                 |

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
