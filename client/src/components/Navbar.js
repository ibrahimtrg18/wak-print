import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = (props) => {
  if (props.auth.data) {
    return (
      <nav className="flex fixed top-0 left-0 right-0 justify-between flex-wrap bg-white py-6 px-4 sm:px-10 shadow-md">
        <div className="flex items-center" style={{ width: "100%" }}>
          <div className="sm:flex block items-center" style={{ width: "100%" }}>
            <div className="block flex-grow font-bold text-3xl">
              <div className="flex">
                <div className="text-primary">Wak</div>
                <div className="text-secondary">Print</div>
              </div>
              <div className="flex">
                <Link className="text-secondary text-base sm:mr-2 mr-10" to="/home">Home</Link>
                <div className="text-primary text-base sm:mx-10 mr-10 sm:block hidden">|</div>
                <Link className="text-secondary text-base sm:mr-2 mr-10" to="/order">Order</Link>
                <div className="text-primary text-base sm:mx-10 mr-10 sm:block hidden">|</div>
                <Link className="text-secondary text-base sm:mr-2 mr-10" to="/history">History</Link>
                <div className="text-primary text-base sm:mx-10 mr-10 sm:block hidden">|</div>
                <Link className="text-secondary text-base sm:mr-2 mr-10" to="/profile">Profile</Link>
              </div>
            </div>
            <div>
              <div className="block px-2">
                <div className="flex">
                  <div className="block text-primary text-base font-bold">Hai {props.auth.data.full_name},&nbsp;</div>
                  <div
                    className="text-secondary text-base font-bold cursor-pointer">
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
          <div className="flex flex-grow font-bold text-3xl" >
            <div className="text-primary">Wak</div>
            <div className="text-secondary">Print</div>
          </div>
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


export default connect(mapStateToProps)(Navbar);