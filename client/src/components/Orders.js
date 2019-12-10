import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';
import { getOrders, resetOrders } from '../redux/actions/ordersActions';

const Order = (props) => {
  const [orders, setOrders] = useState(props.orders.data);

  useEffect(() => {
    document.title = "Order"
    props.getOrders(props.auth.data.id)
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

  console.log(orders)
  if (props.auth.data) {
    return (
      <div className="bg-bg h-screen">
        <Navbar goTo={"LogOut"}></Navbar>
        <div className="sm:pt-32 pt-40 px-8">
          <div className="text-3xl ml-2">Order</div>
        </div>
        <div className="flex flex-wrap px-8">
          {props.orders.isLoading ? "Loading" : orders && orders.length > 0 ? orders && orders.map(order => {
            return (
              <div className="w-full sm:w-1/2 md:w-1/3 p-1" key={order.id}>
                <div className="rounded shadow bg-white">
                  <img
                    src={order.photo ? process.env.PUBLIC_URL + "/images/default_photo.svg" : process.env.PUBLIC_URL + "/images/default_photo.svg"}
                    className="w-full" />
                  <div className="pb-4 px-4">
                    <div className="pt-4 pb-4">
                      <div className="text-text text-sm">Nama</div>
                      <div className="text-black font-medium text-base pb-2">{order.full_name}</div>
                      <div className="text-text text-sm">Nomor Telepon</div>
                      <div className="text-black font-medium text-base">{order.phone_number}</div>
                    </div>
                    <div className="text-black text-base font-semibold border-border border-b-2">Pengaturan File</div>
                    <div className="flex py-2">
                      <div className="w-1/2">
                        <div className="text-text text-xs uppercase">Halaman</div>
                        <div className="border-border border-2 rounded px-2 inline">
                          {order.pages}
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="text-text text-xs uppercase">Jumlah Rangkap</div>
                        <div className="border-border border-2 rounded px-2 inline">
                          {order.copies}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/2 pb-2">
                        <div className="text-text text-xs uppercase">Product</div>
                        <div className="border-border border-2 rounded px-2 inline">
                          {order.product_name}
                        </div>
                      </div>
                      <div className="w-1/2 pb-2">
                        <div className="text-text text-xs uppercase">File</div>
                        <div className="border-primary border-2 bg-primary text-white rounded px-2 inline cursor-pointer">
                          Download
											</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <button className="w-1/2 bg-accent text-white text-center rounded-bl py-4 px-4">
                      Tolak
										</button>
                    <button className="w-1/2 bg-primary text-white text-center rounded-br py-4 px-4">
                      Konfirmasi
										</button>
                  </div>
                </div>
              </div>
            )
          }) : "Tidak ada orders"}
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