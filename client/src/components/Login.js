import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';

import Navbar from './Navbar'
import { _login, _reset } from '../redux/actions/authActions';

const Login = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [message, setMessage] = useState("");
  const emailRef = useRef()

  useEffect(() => {
    document.title = "Login"
    emailRef.current.focus()
    props._reset()
  }, [])

  useEffect(() => {
    if (props.auth.data) {
      props.history.push("/")
    }
  }, [props.auth.data])

  useEffect(() => {
    setMessage(props.auth.message)
  }, [props.auth.message])

  const _goToRegister = () => {
    props.history.push("/register")
  }

  const _handleChange = (event) => {
    const {name,value} = event.target
    setValues({ ...values, [name]: value })
  }

  const _handleSubmit = async (event) => {
    event.preventDefault()
    props._login(values)
  }

  return (
    <div className="bg-grayBg" style={{ height: "100%", minHeight: "100vh" }}>
      <Navbar
        goTo="Daftar Disini"
        goToRedirect={() => _goToRegister()} />
      <div className="sm:flex sm:pt-32 pt-32">
        <div className="sm:w-1/2 px-4 sm:block md:block hidden">
          <img
            src={process.env.PUBLIC_URL + "/images/wak-print-login.png"}
            className="mx-auto"
            style={{ height: "520px" }} />
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="text-2xl font-medium text-black text-center">
            Masuk Mitra WakPrint
          </div>
          <p className="text-base font-medium text-danger text-center">{message}</p>
          <form className="items-center" onSubmit={(event) => _handleSubmit(event)}>
            <label className="block text-md uppercase font-base text-grayText py-2">
              E-Mail
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                value={values.email}
                placeholder="example@example.com"
                onChange={(event) => _handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline placeholder-secondary" />
            </label>
            <label
              className="block text-md uppercase font-base text-grayText py-2">
              Kata Sandi
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                placeholder="******"
                onChange={(event) => _handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline placeholder-secondary" />
            </label>
            <div className="flex text-xs font-base text-gray-800 justify-center my-2">
              <p>Belum punya akun?</p>
              <div
                onClick={() => _goToRegister()}
                className="ml-1 text-primary cursor-pointer">Daftar</div>
            </div>
            <input
              type="submit"
              value={props.auth.isLoading && props.auth.isLoading ? "Loading..." : "masuk"}
              className="rounded bg-primary text-white py-2 px-4 uppercase text-lg text-medium w-full focus:shadow-outline cursor-pointer" />
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

const mapDispatchToProps = (dispatch) => {
  return {
    _login: (data) => { dispatch(_login(data)) },
    _reset: () => { dispatch(_reset()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)