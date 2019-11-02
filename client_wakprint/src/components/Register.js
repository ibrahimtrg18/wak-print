import React, { useState } from 'react'
import Navbar from './Navbar'

const Register = (props) => {
  const [values, setValues] = useState({
    nama_usaha: null,
    nama_pemilik_usaha: null,
    alamat_lokasi: null,
    jumlah_printer: null,
    deskripsi: null,
    email: null,
    kata_sandi: null,
    nomor_telepon: null
  })

  const goToLogin = () => {
    props.history.push("/login")
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    authRegister();
  }

  const authRegister = async () => {
    const res = await fetch("http://localhost:4000/api/wakprint/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nama_usaha_wak_print: values.nama_usaha,
        nama_pemilik_usaha_wak_print: values.nama_pemilik_usaha,
        alamat_wak_print: values.alamat_lokasi,
        jumlah_printer_wak_print: values.jumlah_printer,
        deskripsi_wak_print: values.deskripsi,
        email_wak_print: values.email,
        password_wak_print: values.kata_sandi,
        no_telp_wak_print: values.nomor_telepon
      })
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className="bg-gray-100" style={{ height: "100%", minHeight: "100vh" }}>
      <Navbar
        goTo="Masuk Disini"
        goToRedirect={() => goToLogin()}></Navbar>
      <div className="flex pt-24">
        <div className="w-full md:px-64 px-8 mt-8">
          <div className="text-2xl font-medium text-gray-800 text-center">
            Daftar Mitra WakPrint
          </div>
          <form className="items-center" onSubmit={(event) => handleSubmit(event)}>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Nama Usaha
              <input
                type="text"
                name="nama_usaha"
                id="nama_usaha"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Nama Pemilik Usaha
              <input
                type="text"
                name="nama_pemilik_usaha"
                id="nama_pemilik_usaha"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Alamat Lokasi
              <textarea
                type="text"
                name="alamat_lokasi"
                id="alamat_lokasi"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary h-32" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Jumlah Printer
              <input
                type="text"
                name="jumlah_printer"
                id="jumlah_printer"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Deskripsi
              <input
                type="text"
                name="deskripsi"
                id="deskripsi"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              E-mail
              <input
                type="text"
                name="email"
                id="email"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Kata Sandi
              <input
                type="password"
                name="kata_sandi"
                id="kata_sandi"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              No. Telepon
              <input
                type="text"
                name="nomor_telepon"
                id="nomor_telepon"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary" />
            </label>
            <div className="block text-xs font-base text-gray-800 justify-center my-3">
              <label className="flex items-center justify-center text-base">
                <input
                  type="checkbox" />
                Dengan menekan tombol daftar anda akan menyetujui kebijakan privasi dan ketentuan pengguna
              </label>
            </div>
            <input
              type="submit"
              value="daftar"
              className="btn btn-primary uppercase text-lg text-medium w-full mb-8 focus:shadow-outline-primary" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register