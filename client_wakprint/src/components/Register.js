import React, { useState } from 'react'
import Navbar from './Navbar'
import { Redirect } from 'react-router-dom'

const Register = (props) => {
  const [values, setValues] = useState({
    nama_usaha: '',
    nama_pemilik_usaha: '',
    alamat_lokasi: '',
    jumlah_printer: '',
    deskripsi: '',
    email: '',
    kata_sandi: '',
    nomor_telepon: ''
  })
  const goToRedirect = () => {
    props.history.push("/")
  }

  const handleChange = (event) =>{
    setValues({...values, [event.target.name]: event.target.value})
    console.log(values)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(values)
    console.log("submit register")
  }
  return (
    <div className="bg-gray-100" style={{ height: "100%", minHeight: "100vh" }}>
      <Navbar
        goTo="Masuk Disini"
        goToRedirect={() => goToRedirect()}></Navbar>
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
                className="w-full border-primary rounded-lg py-2 px-3" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Nama Pemilik Usaha
              <input
                type="text"
                name="nama_pemilik_usaha"
                id="nama_pemilik_usaha"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Alamat Lokasi
              <textarea
                type="text"
                name="alamat_lokasi"
                id="alamat_lokasi"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 h-32" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Jumlah Printer
              <input
                type="text"
                name="jumlah_printer"
                id="jumlah_printer"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Deskripsi
              <input
                type="text"
                name="deskripsi"
                id="deskripsi"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              E-mail
              <input
                type="text"
                name="email"
                id="email"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Kata Sandi
              <input
                type="password"
                name="kata_sandi"
                id="kata_sandi"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              No. Telepon
              <input
                type="text"
                name="nomor_telepon"
                id="nomor_telepon"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3" />
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
              className="btn btn-primary uppercase text-lg text-medium w-full mb-8" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register