import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { _logout } from '../redux/actions/authActions';

const Navbar = (props) => {
  if (props.auth.data) {
    return (
      <nav className="flex fixed top-0 left-0 right-0 justify-between flex-wrap bg-white py-6 px-4 sm:px-10 shadow-md">
        <div className="flex items-center" style={{ width: "100%" }}>
          <div className="sm:flex block items-center" style={{ width: "100%" }}>
            <div className="block flex-grow font-bold text-3xl">
              <Link className="flex" to="/home">
                <div className="text-primary">Wak</div>
                <div className="text-secondary">Print</div>
              </Link>
              <div className="flex">
                <Link className="text-secondary text-base sm:pr-10 pr-2 sm:border-r-2" to="/home">Home</Link>
                <Link className="text-secondary text-base sm:px-10 px-2 sm:border-r-2" to="/order">Order</Link>
                <Link className="text-secondary text-base sm:px-10 pr-2 sm:border-r-2" to="/history">History</Link>
                <Link className="text-secondary text-base sm:px-10 pr-2 sm:border-r-2" to="/profile">Profile</Link>
              </div>
            </div>
            <div>
              <div className="block px-2">
                <div className="flex">
                  <div className="block text-primary text-base font-bold">Hai {props.auth.data.full_name},&nbsp;</div>
                  <div
                    className="text-secondary text-base font-bold cursor-pointer"
                    onClick={() => props._logout()}>
                    Logout?
                </div>
                </div>
                <div className="flex items-center float-right">
                  <img
                    src={process.env.PUBLIC_URL + "/images/icon_saldo.png"}
                    className="mr-1"
                    style={{ height: "18px" }} />
                  <div className="block text-black text-base font-bold">Rp. {props.auth.data.balance ? props.auth.data.balance : "0"}</div>
                </div>
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
              className="rounded py-2 px-6 bg-primary text-white text-lg text-medium px-12 focus:shadow-outline outline-none">
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
    _logout: () => dispatch(_logout())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);