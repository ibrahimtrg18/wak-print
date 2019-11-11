import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';
import { orderData } from '../redux/actions/orderActions';

const Order = (props) => {

	const [partner, setPartner] = useState(props.auth.data);
	const [orders, setOrders] = useState(props.order.data);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		document.title = "Order"
	}, [])

	useEffect(() => {
		if (!props.auth.data) {
			props.history.push("/login");
		} else if (partner && partner.id) {
			props.orderData(partner.id)
		}
	}, [props.auth.data])


	console.log(orders)
	if (props.auth.data) {
		return (
			<div className="bg-grayBg h-screen">
				<Navbar goTo={"LogOut"}></Navbar>
				<div className="sm:pt-32 pt-40 px-8">
					<div className="text-3xl ml-2">Order</div>
				</div>
				<div className="flex flex-wrap px-8">
					{orders.map(order => {
						return (
							<div className="w-full sm:w-1/2 md:w-1/3 p-1">
								<div className="rounded shadow bg-white p-4" key={order.id}>
									<div className="pt-2 pb-2">
										<div className="">
											<div className="text-grayText text-sm">Nama</div>
											<div className="text-black font-medium text-base">{order.full_name}</div>
										</div>
										<div className="">
											<div className="text-grayText text-sm">Nomor Telepon</div>
											<div className="text-black font-medium text-base">{order.phone_number}</div>
										</div>
									</div>
									<div className="text-black text-base font-semibold border-grayBorder border-b-2">Pengaturan File</div>
									<div className="flex pb-2">
										<div className="w-1/2">
											<div className="text-grayText text-xs uppercase">Halaman</div>
											<div className="border-grayBorder border-2 rounded px-2 inline">
												{order.pages}
											</div>
										</div>
										<div className="w-1/2">
											<div className="text-grayText text-xs uppercase">Jumlah Rangkap</div>
											<div className="border-grayBorder border-2 rounded px-2 inline">
												{order.copies}
											</div>
										</div>
									</div>
									<div className="flex">
										<div className="w-1/2 pb-2">
											<div className="text-grayText text-xs uppercase">Product yang diminta</div>
											<div className="border-grayBorder border-2 rounded px-2 inline">
												{order.product_name}
											</div>
										</div>
										<div className="w-1/2 pb-2">
											<div className="text-grayText text-xs uppercase">Download File</div>
											<div className="border-primary border-2 bg-primary text-white rounded px-2 inline cursor-pointer">
												Download
											</div>
										</div>
									</div>
								</div>
							</div>
						)
					})}
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
		order: state.order
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		orderData: (partnerId) => { dispatch(orderData(partnerId)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)