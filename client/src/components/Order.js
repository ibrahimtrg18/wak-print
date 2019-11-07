import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';

const Order = (props) => {

	useEffect(() => {
		if (!props.auth.data) {
			props.history.push("/login");
		}
	})

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

export default (Order)