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
        <Navbar goTo={"LogOut"} onNav={3}></Navbar>
        <div className="sm:flex sm:pt-24 pt-32 px-8">
          <div className="text-3xl ml-2">History</div>
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