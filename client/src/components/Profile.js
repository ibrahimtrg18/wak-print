import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar';
import { getProfile, resetProfile } from "../redux/actions/profileActions";

const Profile = (props) => {

	const [message, setMessage] = useState(null);
	const [profile, setProfile] = useState({});

	useEffect(() => {
		document.title = "Profile"
		props.resetProfile()
	}, [])

	useEffect(() => {
		if (!props.auth.data) {
			props.history.push("/login");
		}
	}, [props.auth.data])

	useEffect(() => {
		setMessage(props.auth.message)
		setProfile(props.auth.data)
	}, [props.auth])

	if (props.auth.data) {
		return (
			<div className="bg-gray-100 h-screen">
				<Navbar goTo={"LogOut"} ></Navbar>
				<div className="sm:pt-32 pt-40 px-8">
					<div className="text-3xl ml-2">Profile</div>
					<div className="">{profile.full_name}</div>
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
		profile: state.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getProfile: (partnerId) => { dispatch(getProfile(partnerId)) },
		resetProfile: () => { dispatch(resetProfile()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)