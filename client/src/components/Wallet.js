import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from './Navbar';
import { getProfile, resetProfile, changeStatus } from "../redux/actions/profileActions";

const Wallet = (props) => {

  useEffect(() => {
    document.title = "Saldo"
    if (!props.auth.data) {
      props.history.push("/login");
    }
  }, [])

  useEffect(() => {
    if (!props.auth.data) {
      props.history.push("/login");
    }
  }, [props.auth.data])

  const handleRemoveProduct = (partnerId, productId) => {
    fetch(`/api/partner/${partnerId}/product/${productId}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  console.log(props.auth)
  if (props.auth.data)
    return (
      <div className="bg-bg h-screen" style={{ height: "100%", minHeight: "100vh" }}>
        <Navbar goTo={"LogOut"}></Navbar>
        <div className="sm:pt-24 pt-32 px-8">
          <div className="text-3xl ml-2">Info Saldo</div>
          <div className="px-4 py-2 text-center">
            <div className="inline-flex justify-center items-center px-4 py-2 border-border border">
              <img
                src={process.env.PUBLIC_URL + "/images/icon_saldo.svg"}
                className="mr-4"
                style={{ height: "64px" }} />
              <p className="block text-black text-base font-bold text-3xl">
                Rp. {props.auth.data.balance && props.auth.data.balance ? props.auth.data.balance : "0"}
              </p>
            </div>
          </div>
          <h1 className="text-black text-base font-semibold border-border border-b-2 mt-2">Penarikan Saldo</h1>
          <form>
            <label
              className="text-sm text-text">
              Input Nominal
              <input
                type="number"
                name="nominal"
                id="nominal"
                min="0"
                defaultValue="0"
                className="w-full border-primary border-2 rounded-lg py-1 px-2 focus:shadow-outline placeholder-secondary"
                required />
            </label>
            <label
              className="text-sm text-text">
              No. Rekening
              <p className="w-full text-xl focus:shadow-outline">
                {props.auth.data.bank_number && props.auth.data.bank_number ? props.auth.data.bank_number : "-"}
              </p>
            </label>
            <div className="pt-2 mt-2 border-border border-t-2">
              <input
                type="submit"
                value="Tarik"
                className="rounded bg-primary text-white py-2 px-4 uppercase text-lg text-medium w-full focus:shadow-outline cursor-pointer hover:bg-secondary" />
            </div>
          </form>
        </div>
      </div >
    )
  else
    return null
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Wallet)