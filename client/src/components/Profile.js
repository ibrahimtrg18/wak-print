import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';

const Profile = (props) => {

	useEffect(() => {
		document.title = "Profile"
	}, [])

	useEffect(() => {
		if (!props.auth.data) {
			props.history.push("/login");
		}
	}, [props.auth.data])


	if (props.auth) {
		return (
			<div className="bg-gray-100 h-screen">
				<Navbar goTo={"LogOut"} ></Navbar>
				<div className="sm:flex sm:pt-40 pt-48">
					<div className="lg:w-1/2 md:px-8 px-4">
						Profile
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

export default connect(mapStateToProps)(Profile)