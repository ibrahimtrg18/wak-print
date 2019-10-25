import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

const Navbar = (props) => {
  if (props.auth) {
    return (
      <nav className="flex fixed top-0 left-0 right-0 justify-between flex-wrap bg-white py-6 px-4 sm:px-10 shadow-md">
        <div className="flex items-center" style={{ width: "100%" }}>
          <div className="flex flex-grow font-bold text-3xl" >
            <div className="text-purple-900">Wak</div>
            <div className="text-purple-400">Print</div>
          </div>
          <div>
            <button
              onClick={() => props.goToRedirect()}
              className="btn btn-primary text-lg text-medium px-12">
              {props.goTo}
            </button>
          </div>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className="flex fixed top-0 left-0 right-0 justify-between flex-wrap bg-white py-6 px-4 sm:px-10 shadow-md">
        <div className="flex items-center" style={{ width: "100%" }}>
          <div className="flex flex-grow font-bold text-3xl" >
            <div className="text-purple-900">Wak</div>
            <div className="text-purple-400">Print</div>
          </div>
          <div>
            <button
              onClick={() => props.goToRedirect()}
              className="btn btn-primary text-lg text-medium px-12">
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