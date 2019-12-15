import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';
import { getOrders, resetOrders } from '../redux/actions/ordersActions';

const Beranda = (props) => {
  const [orders, setOrders] = useState(props.orders.data);
  let orderan = 0;
  let proses = 0;
  let selesai = 0;

  useEffect(() => {
    document.title = "Home"
    if (!props.auth.data) {
      props.history.push("/login");
      props.resetOrders();
    } else {
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

  console.log(orders)
  if (props.auth.data) {
    return (
      <div className="bg-bg h-screen">
        <Navbar goTo={"LogOut"} onNav={1}></Navbar>
        <div className="sm:flex sm:pt-32 pt-32">
          <div className="lg:w-1/2 md:px-8 px-4">
            <p className="text-2xl font-medium mb-2 text-center">
              Analisis Usaha printer Anda
            </p>
            <div className="lg:px-12">
              <div className="flex max-w-full rounded overflow-hidden shadow-lg mb-2 sm:px-16 px-16 py-4 bg-white">
                <div className="flex-grow font-medium text-5xl">
                  {orders && orders ? orders.map(order => {
                    if (order.status_order === 0) {
                      orderan = orderan + 1
                    }
                  })
                    : ""}
                  {orderan && orderan}
                </div>
                <div className="text-base font-medium self-end pb-2">
                  Orderan
                </div>
              </div>
              <div className="flex max-w-full rounded overflow-hidden shadow-lg mb-2 sm:px-16 px-16 py-4 bg-white">
                <div className="flex-grow font-medium text-5xl">
                  {orders && orders ? orders.map(order => {
                    if (order.status_order === 1) {
                      proses = proses + 1
                    }
                  })
                    : ""}
                  {proses && proses}
                </div>
                <div className="text-base font-medium self-end pb-2">
                  Proses
                </div>
              </div>
              <div className="flex max-w-full rounded overflow-hidden shadow-lg mb-2 sm:px-16 px-16 py-4 bg-white">
                <div className="flex-grow font-medium text-5xl">
                  {orders && orders ? orders.map(order => {
                    if (order.status_order === 2) {
                      selesai = selesai + 1
                    }
                  })
                    : ""}
                  {selesai && selesai}
                </div>
                <div className="text-base font-medium self-end pb-2">
                  Selesai
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 px-8 sm:block hidden">
            <img
              src={process.env.PUBLIC_URL + "/images/home.svg"}
              className="mx-auto"
              style={{ height: "410px" }} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Beranda)