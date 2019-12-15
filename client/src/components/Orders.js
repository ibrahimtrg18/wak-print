import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import download from "downloadjs";
import Navbar from './Navbar';
import { getOrders, resetOrders } from '../redux/actions/ordersActions';
// const download = require('downloadjs');

const Order = (props) => {
  const [orders, setOrders] = useState(props.orders.data);
  let orderan = 0;

  useEffect(() => {
    document.title = "Order"
    if (!props.auth.data) {
      props.history.push("/login");
      props.resetOrders();
    }else{
      props.getOrders(props.auth.data.id)
    }
    return () => {
      props.resetOrders();
    }
  }, [])

  useEffect(() => {
    if (!props.auth.data) {
      props.history.push("/login");
      props.resetOrders();
    }
  }, [props.auth.data])

  useEffect(() => {
    setOrders(props.orders.data)
  }, [props.orders])

  const handleDownload = (id, fullName, documentName) => {
    fetch(`/api/order/${id}/download`)
      .then(res => res.blob())
      .then(blob => {
        download(blob, fullName + "-" + documentName)
      })
  }

  const handleDecline = (id) => {
    console.log(id)
    fetch(`/api/order/${id}/decline`,
      { method: "PATCH" })
      .then(res => res.json())
      .then(data => console.log(data))
    props.getOrders(props.auth.data.id)
  }

  const handleConfirm = (id) => {
    fetch(`/api/order/${id}/confirm`,
      { method: "PATCH" })
      .then(res => res.json())
      .then(data => console.log(data))
    props.getOrders(props.auth.data.id)
  }

  const handleProcess = (id) => {
    fetch(`/api/order/${id}/done`,
      { method: "PATCH" })
      .then(res => res.json())
      .then(data => console.log(data))
    props.getOrders(props.auth.data.id)
  }

  const orderStatus = (id, status) => {
    console.log(status)
    switch (status) {
      case 0:
        return (
          <>
            <button className="w-1/2 bg-pink text-white text-center font-black rounded-bl py-4 px-4 hover:bg-pink-secondary"
              onClick={() => handleDecline(id)}>
              Tolak
            </button>
            <button className="w-1/2 bg-primary text-white text-center font-black rounded-br py-4 px-4 hover:bg-secondary"
              onClick={() => handleConfirm(id)}>
              Konfirmasi
            </button>
          </>
        )
      case 1:
        return (
          <>
            <button className="w-full bg-yellow text-black text-center font-black rounded-bl py-4 px-4"
              onClick={() => handleProcess(id)}>
              Process
            </button>
          </>
        )
    }
  }

  console.log(orders)
  if (props.auth.data) {
    return (
      <div className="bg-bg h-screen" style={{ height: "100%", minHeight: "100vh" }}>
        <Navbar goTo={"LogOut"} onNav={2}></Navbar>
        <div className="sm:pt-24 pt-32 px-8">
          <div className="text-3xl ml-2">Order</div>
        </div>
        <div className="flex flex-wrap px-8">
          {props.orders.isLoading ? "Loading" : orders && orders.length > 0 ? orders && orders.map(order => {
            if (order.status_order === 0 || order.status_order === 1) {
              orderan = orderan + 1;
              return (
                <div className="w-full sm:w-1/2 md:w-1/3 p-1" key={order.id}>
                  <div className="rounded shadow bg-white">
                    {order.photo && order.photo ?
                      <img
                        src={`/api/user/${order.user_id}/photo`}
                        className="w-xl" />
                      :
                      <img
                        src={process.env.PUBLIC_URL + "/images/default_photo.svg"}
                        className="w-full" />
                    }
                    <div className="pb-4 px-4">
                      <div className="pt-4 pb-4">
                        <p className="text-text text-sm">Nama</p>
                        <p className="text-black font-medium text-base pb-2">{order.full_name}</p>
                        <p className="text-text text-sm">Nomor Telepon</p>
                        <p className="text-black font-medium text-base">{order.phone_number}</p>
                      </div>
                      <p className="text-black text-base font-semibold border-border border-b-2">Pengaturan File</p>
                      <div className="flex py-2">
                        <div className="w-1/2">
                          <p className="text-text text-xs uppercase">Halaman</p>
                          <p className="border-border border-2 rounded px-2 overflow-y-auto inline-block">
                            {order.pages && order.pages === '0' ? "1,3,4,5,7,8,9,12,2,4" : order.pages}
                          </p>
                        </div>
                        <div className="w-1/2">
                          <p className="text-text text-xs uppercase">Jumlah Rangkap</p>
                          <p className="border-border border-2 rounded px-2 inline-block">
                            {order.copies}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="w-1/2 pb-2">
                          <p className="text-text text-xs uppercase">Product</p>
                          <p className="border-border border-2 rounded px-2 overflow-y-auto inline-block">
                            {order.product_name}
                          </p>
                        </div>
                        <div className="w-1/2 pb-2">
                          <p className="text-text text-xs uppercase">File</p>
                          <button
                            className="border-primary border-2 bg-primary text-white rounded px-2 cursor-pointer inline-block hover:bg-secondary hover:border-secondary"
                            onClick={() => handleDownload(order.id, order.full_name, order.document_name)}>
                            Download
											  </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {
                        orderStatus(order.id, order.status_order)
                      }
                    </div>
                  </div>
                </div>
              )
            }
          }) : ""}
          {props.orders.isLoading ? "" : orderan && orderan > 0 ? "" : "Tidak ada orders"}
        </div>
      </div>
    )
  } else {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (partnerId) => { dispatch(getOrders(partnerId)) },
    resetOrders: () => dispatch(resetOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)