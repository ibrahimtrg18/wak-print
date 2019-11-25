import React, { useState, useEffect,useRef } from 'react'
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { regAccount, regReset, REG_SUCCESS } from '../redux/actions/regActions';

const Register = (props) => {
  const emailRef = useRef()
  const [values, setValues] = useState({
    email: "",
    password: "",
    fullName: "",
    businessName: "",
    phoneNumber: "",
    address: ""
  })

  const [message, setMessage] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    document.title = "Register"
    emailRef.current.focus()
    props.regReset()
  }, [])

  useEffect(() => {
    if (props.auth.data) {
      props.history.push("/")
    }
  }, [props.auth.data])

  useEffect(() => {
    setMessage(props.reg.message)
    window.scrollTo(0, 0)
    if (props.reg.success) {
      setValues({
        email: "",
        password: "",
        fullName: "",
        businessName: "",
        phoneNumber: "",
        address: ""
      })
    }
  }, [props.reg.message])

  const _goToLogin = () => {
    props.history.push("/login")
  }

  const _handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const _handleSubmit = (event) => {
    event.preventDefault()
    props.regAccount(values)
  }

  return (
    <div className="bg-gray-100" style={{ height: "100%", minHeight: "100vh" }}>
      <Navbar
        goTo="Masuk Disini"
        goToRedirect={() => _goToLogin()}></Navbar>
      <div className="flex pt-24">
        <div className="w-full sm:px-16 md:px-32 lg:px-32 xl:px-64 px-8 mt-8">
          <div className="text-2xl font-medium text-black text-center">
            Daftar Mitra WakPrint
          </div>
          <p className={
            props.reg.success ?
              "text-base font-medium text-success text-center"
              :
              "text-base font-medium text-danger text-center"
          }>{message}</p>
          <form className="items-center" onSubmit={(event) => _handleSubmit(event)}>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              E-Mail
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                value={values.email}
                onChange={(event) => _handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Password
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={(event) => _handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Nama Lengkap
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={values.fullName}
                onChange={(event) => _handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Nama Usaha
              <input
                type="text"
                name="businessName"
                id="businessName"
                value={values.businessName}
                onChange={(event) => _handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Nomor Telepon
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                value={values.phoneNumber}
                onChange={(event) => _handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Alamat
              <textarea
                type="text"
                name="address"
                id="address"
                value={values.address}
                onChange={(event) => _handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline h-32" />
            </label>
            <div className="block text-xs font-base text-gray-800 justify-center my-3">
              <label className="flex items-center justify-center text-base">
                <input type="checkbox" className="mr-2" defaultChecked={checkBox} onClick={() => checkBox ? setCheckBox(false) : setCheckBox(true)} />
                Dengan menekan tombol daftar anda akan menyetujui kebijakan privasi dan ketentuan pengguna
              </label>
            </div>
            <input
              type="submit"
              value="daftar"
              disabled={!checkBox}
              className={
                checkBox ?
                  "bg-primary rounded py-2 px-4 text-white uppercase text-lg text-medium w-full mb-8 focus:shadow-outline cursor-pointer"
                  :
                  "bg-secondary rounded py-2 px-4 text-white uppercase text-lg text-medium w-full mb-8 focus:shadow-outline cursor-not-allowed"
              } />
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    reg: state.reg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    regAccount: (data) => dispatch(regAccount(data)),
    regReset: () => dispatch(regReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);