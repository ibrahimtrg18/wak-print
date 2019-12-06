import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';

const History = (props) => {
  useEffect(() => {
    document.title = "Hitory"
  }, [])

  useEffect(() => {
    if (!props.auth.data) {
      props.history.push("/login");
    }
  }, [props.auth.data])

  if (props.auth) {
    return (
      <div className="bg-gray-100 h-screen">
        <Navbar goTo={"LogOut"}></Navbar>
        <div className="sm:flex sm:pt-40 pt-48">
          <div className="lg:w-1/2 md:px-8 px-4">
            History
					</div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(History)