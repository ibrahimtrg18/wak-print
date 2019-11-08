import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';

const Order = (props) => {

	useEffect(() => {
		document.title = "Order"
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
					Order
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

export default connect(mapStateToProps)(Order)