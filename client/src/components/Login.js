import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';

import Navbar from './Navbar'
import { login, reset } from '../redux/actions/authActions';

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
    props.reset()
  }, [])

  useEffect(() => {
    if (props.auth.data) {
      props.history.push("/")
    }
  }, [props.auth.data])

  useEffect(() => {
    setMessage(props.auth.message)
  }, [props.auth.message])

  const goToRegister = () => {
    props.history.push("/register")
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    props.login(values)
  }

  return (
    <div className="bg-bg" style={{ height: "100%", minHeight: "100vh" }}>
      <Navbar
        goTo="Daftar Disini"
        goToRedirect={() => goToRegister()} />
      <div className="sm:flex sm:pt-24 pt-24">
        <div className="sm:w-1/2 sm:block md:block hidden px-1">
          <img
            src={process.env.PUBLIC_URL + "/images/login.svg"}
            className="mx-auto"/>
        </div>
        <div className="sm:w-1/2 w-full px-8 pt-12">
          <div className="text-2xl font-medium text-black text-center">
            Masuk Mitra WakPrint
          </div>
          <p className="text-base font-medium text-danger text-center">{message}</p>
          <form className="items-center" onSubmit={(event) => handleSubmit(event)}>
            <label className="block text-md uppercase font-base text-text py-2">
              E-Mail
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                value={values.email}
                placeholder="example@example.com"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline placeholder-secondary"
                required />
            </label>
            <label
              className="block text-md uppercase font-base text-text py-2">
              Kata Sandi
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                placeholder="******"
                onChange={(event) => handleChange(event)}
                className="w-full border-primary border-2 rounded-lg py-2 px-3 focus:shadow-outline placeholder-secondary"
                required />
            </label>
            <div className="flex text-xs font-base text-gray-800 justify-center my-2">
              <p>Belum punya akun?</p>
              <div
                onClick={() => goToRegister()}
                className="ml-1 text-primary cursor-pointer">Daftar</div>
            </div>
            <input
              type="submit"
              value={props.auth.isLoading && props.auth.isLoading ? "Loading..." : "masuk"}
              className={props.auth.isLoading && props.auth.isLoading ?
                "rounded bg-secondary text-white py-2 px-4 uppercase text-lg text-medium w-full focus:shadow-outline cursor-not-allowed"
                :
                "rounded bg-primary text-white py-2 px-4 uppercase text-lg text-medium w-full focus:shadow-outline cursor-pointer hover:bg-secondary"} />
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
    login: (data) => { dispatch(login(data)) },
    reset: () => { dispatch(reset()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)