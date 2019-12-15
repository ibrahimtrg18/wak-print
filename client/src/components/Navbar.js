import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Navbar = (props) => {
  const onNav = () => {
    switch (props.onNav) {
      case 1:
        return (
          <>
            <Link className="text-white bg-primary rounded underline text-base sm:px-4 px-2" to="/home">Home</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/order">Order</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/history">History</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/profile">Profile</Link>
          </>
        )
      case 2:
        return (
          <>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/home">Home</Link>
            <Link className="text-white bg-primary rounded underline text-base sm:px-4 px-2" to="/order">Order</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/history">History</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/profile">Profile</Link>
          </>
        )
      case 3:
        return (
          <>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/home">Home</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/order">Order</Link>
            <Link className="text-white bg-primary rounded underline text-base sm:px-4 px-2" to="/history">History</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/profile">Profile</Link>
          </>
        )
      case 4:
        return (
          <>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/home">Home</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/order">Order</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/history">History</Link>
            <Link className="text-white bg-primary rounded underline text-base sm:px-4 px-2" to="/profile">Profile</Link>
          </>
        )
      default:
        return (
          <>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/home">Home</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/order">Order</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/history">History</Link>
            <Link className="text-primary rounded underline text-base sm:px-4 px-2" to="/profile">Profile</Link>
          </>
        )
    }
  }
  if (props.auth.data) {
    return (
      <nav className="flex fixed top-0 left-0 right-0 justify-between flex-wrap bg-white py-3 px-1 sm:px-10 px-4 shadow-md">
        <div className="flex items-center" style={{ width: "100%" }}>
          <div className="sm:flex block items-center" style={{ width: "100%" }}>
            <div className="block flex-grow font-bold text-3xl">
              <Link className="flex" to="/home">
                <div className="text-primary">Wak</div>
                <div className="text-secondary">Print</div>
              </Link>
              <div className="flex">
                {onNav()}
              </div>
            </div>
            <div className="sm:inline-block block">
              <div className="sm:flex inline-flex">
                <div className="sm:inline-block text-primary text-base font-bold">Hai {props.auth.data.full_name},&nbsp;</div>
                <div
                  className="sm:inline-block text-secondary text-base font-bold cursor-pointer"
                  onClick={() => props.logout()}>
                  Logout?
                </div>
              </div>
              <div className="flex items-center float-right">
                <img
                  src={process.env.PUBLIC_URL + "/images/icon_saldo.svg"}
                  className="mr-1"
                  style={{ height: "18px" }} />
                <div className="block text-black text-base font-bold">Rp. {props.auth.data.balance ? props.auth.data.balance : "0"}</div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className="flex fixed top-0 left-0 right-0 justify-between flex-wrap bg-white py-6 px-4 sm:px-10 shadow-md">
        <div className="flex items-center" style={{ width: "100%" }}>
          <Link className="flex mr-auto font-bold text-3xl cursor-pointer" to="/home">
            <div className="text-primary">Wak</div>
            <div className="text-secondary">Print</div>
          </Link>
          <div>
            <button
              onClick={() => props.goToRedirect()}
              className="rounded py-2 px-6 bg-primary text-white text-lg text-medium px-12 focus:shadow-outline outline-none hover:bg-secondary">
              {props.goTo}
            </button>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);