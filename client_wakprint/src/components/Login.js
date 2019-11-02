import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import Navbar from './Navbar'
import { authLogin } from '../redux/actions/authActions';

const Login = (props) => {
  const [values, setValues] = useState({
    email: null,
    password: null,
  })

  const goToRegister = () => {
    props.history.push("/register")
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch("/api/partner/login", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })
    const data = await response.json();
    if (data.success) {
      props.authLogin(data.data);
    } else {
      setValues({ email: "", password: "" })
    }
  }

  useEffect(() => {
    if (props.auth) {
      props.history.push("/")
    }
  })

  return (
    <div className="bg-gray-100" style={{ height: "100%", minHeight: "100vh" }}>
      <Navbar
        goTo="Daftar Disini"
        goToRedirect={() => goToRegister()} />
      <div className="sm:flex sm:pt-32 pt-32">
        <div className="sm:w-1/2 px-4 sm:block hidden">
          <img
            src={process.env.PUBLIC_URL + "/images/wak-print-login.png"}
            className="mx-auto"
            style={{ height: "520px" }} />
        </div>
        <div className="sm:w-1/2 px-8">
          <div className="text-2xl font-medium text-gray-800 text-center">
            Masuk Mitra WakPrint
          </div>
          <form className="items-center" onSubmit={(event) => handleSubmit(event)}>
            <label className="block text-md uppercase font-base text-gray-700 py-2">
              E-Mail
              <input
                type="text"
                name="email"
                id="email"
                value={values.email}
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary" />
            </label>
            <label
              className="block text-md uppercase font-base text-gray-700 py-2">
              Kata Sandi
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={(event) => handleChange(event)}
                className="w-full border-primary rounded-lg py-2 px-3 focus:shadow-outline-primary" />
            </label>
            <div className="flex text-xs font-base text-gray-800 justify-center my-3">
              <p>Belum punya akun?</p>
              <a className="ml-1 text-primary">Daftar</a>
            </div>
            <input
              type="submit"
              value="masuk"
              className="btn btn-primary uppercase text-lg text-medium w-full focus:shadow-outline-primary" />
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
    authLogin: (data) => { dispatch(authLogin(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)