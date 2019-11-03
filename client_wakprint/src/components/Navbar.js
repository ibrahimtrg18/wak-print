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
              <button
                onClick={() => props.authLogout()}
                className="btn btn-primary text-lg text-medium md:px-8 mt-3">
                {props.goTo}
              </button>
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
              className="btn btn-primary text-lg text-medium px-12 focus:shadow-outline-primary">
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