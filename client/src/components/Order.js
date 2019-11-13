import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';
import { getOrders } from '../redux/actions/orderActions';

const Order = (props) => {

	const [message, setMessage] = useState(null);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		document.title = "Order"
	}, [])

	useEffect(() => {
		if (!props.auth.data) {
			props.history.push("/login");
		} else {
			props.getOrders(props.auth.data.id)
		}
	}, [props.auth.data])

	useEffect(() => {
		setOrders(props.order.data)
	}, [props.order.data])

	if (props.auth.data) {
		return (
			<div className="bg-grayBg h-screen">
				<Navbar goTo={"LogOut"}></Navbar>
				<div className="sm:pt-32 pt-40 px-8">
					<div className="text-3xl ml-2">Order</div>
				</div>
				<div className="flex flex-wrap px-8">
					{orders && orders.length > 0 ? orders.map(order => {
						return (
							<div className="w-full sm:w-1/2 md:w-1/3 p-1">
								<div className="rounded shadow bg-white" key={order.id}>
									<img
										src={order.photo ? process.env.PUBLIC_URL + "/images/default_photo.svg" : process.env.PUBLIC_URL + "/images/default_photo.svg"}
										className="w-full" />
									<div className="pb-4 px-4">
										<div className="pt-4 pb-4">
											<div className="text-grayText text-sm">Nama</div>
											<div className="text-black font-medium text-base pb-2">{order.full_name}</div>
											<div className="text-grayText text-sm">Nomor Telepon</div>
											<div className="text-black font-medium text-base">{order.phone_number}</div>
										</div>
										<div className="text-black text-base font-semibold border-grayBorder border-b-2">Pengaturan File</div>
										<div className="flex py-2">
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
												<div className="text-grayText text-xs uppercase">Product</div>
												<div className="border-grayBorder border-2 rounded px-2 inline">
													{order.product_name}
												</div>
											</div>
											<div className="w-1/2 pb-2">
												<div className="text-grayText text-xs uppercase">File</div>
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
					}):"Null"}
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
		getOrders: (partnerId) => { dispatch(getOrders(partnerId)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)