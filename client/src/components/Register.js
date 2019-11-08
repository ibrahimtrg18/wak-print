import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import { connect } from 'react-redux';

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

  useEffect(() => {
    document.title = "Register"
  }, [])

  useEffect(() => {
    if (props.auth.data) {
      props.history.push("/")
    }
  }, [props.auth.data])

  const goToLogin = () => {
    props.history.push("/login")
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="bg-gray-100" style={{ height: "100%", minHeight: "100vh" }}>
      <Navbar
        goTo="Masuk Disini"
        goToRedirect={() => goToLogin()}></Navbar>
      <div className="flex pt-24">
        <div className="w-full sm:px-64 px-8 mt-8">
          <div className="text-2xl font-medium text-black text-center">
            Daftar Mitra WakPrint
          </div>
          <form className="items-center" onSubmit={(event) => handleSubmit(event)}>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Nama Usaha
              <input
                type="text"
                name="nama_usaha"
                id="nama_usaha"
                onChange={(event) => handleChange(event)}
                className="w-full border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Nama Pemilik Usaha
              <input
                type="text"
                name="nama_pemilik_usaha"
                id="nama_pemilik_usaha"
                onChange={(event) => handleChange(event)}
                className="w-full border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Alamat Lokasi
              <textarea
                type="text"
                name="alamat_lokasi"
                id="alamat_lokasi"
                onChange={(event) => handleChange(event)}
                className="w-full border-2 rounded-lg py-2 px-3 focus:shadow-outline h-32" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Jumlah Printer
              <input
                type="text"
                name="jumlah_printer"
                id="jumlah_printer"
                onChange={(event) => handleChange(event)}
                className="w-full border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Deskripsi
              <input
                type="text"
                name="deskripsi"
                id="deskripsi"
                onChange={(event) => handleChange(event)}
                className="w-full border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              E-mail
              <input
                type="text"
                name="email"
                id="email"
                onChange={(event) => handleChange(event)}
                className="w-full border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Kata Sandi
              <input
                type="password"
                name="kata_sandi"
                id="kata_sandi"
                onChange={(event) => handleChange(event)}
                className="w-full border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              No. Telepon
              <input
                type="text"
                name="nomor_telepon"
                id="nomor_telepon"
                onChange={(event) => handleChange(event)}
                className="w-full border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <div className="block text-xs font-base text-gray-800 justify-center my-3">
              <label className="flex items-center justify-center text-base">
                <input type="checkbox" className="mr-2" />
                Dengan menekan tombol daftar anda akan menyetujui kebijakan privasi dan ketentuan pengguna
              </label>
            </div>
            <input
              type="submit"
              value="daftar"
              className="bg-primary rounded py-2 px-4 text-white uppercase text-lg text-medium w-full mb-8 focus:shadow-outline cursor-pointer" />
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Register);