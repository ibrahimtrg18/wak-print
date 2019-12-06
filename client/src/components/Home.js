import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar'

const Beranda = (props) => {

	useEffect(() => {
		document.title = "Beranda"
	}, [])

	useEffect(() => {
		if (!props.auth.data) {
			props.history.push("/login");
		}
	}, [props.auth.data])

	if (props.auth.data) {
		return (
			<div className="bg-bg h-screen">
				<Navbar goTo={"LogOut"} ></Navbar>
				<div className="sm:flex sm:pt-40 pt-48">
					<div className="lg:w-1/2 md:px-8 px-4">
						<p className="text-2xl font-medium mb-2 text-center">
							Analisis Usaha printer Anda
          				</p>
						<div className="lg:px-12">
							<div className="flex max-w-full rounded overflow-hidden shadow-lg mb-2 sm:px-16 px-16 py-4 bg-white">
								<div className="flex-grow font-medium text-5xl">
									6
              					</div>
								<div className="text-base font-medium self-end pb-2">
									Orderan
              					</div>
							</div>
							<div className="flex max-w-full rounded overflow-hidden shadow-lg mb-2 sm:px-16 px-16 py-4 bg-white">
								<div className="flex-grow font-medium text-5xl">
									1
              					</div>
								<div className="text-base font-medium self-end pb-2">
									Proses
              					</div>
							</div>
							<div className="flex max-w-full rounded overflow-hidden shadow-lg mb-2 sm:px-16 px-16 py-4 bg-white">
								<div className="flex-grow font-medium text-5xl">
									0
              					</div>
								<div className="text-base font-medium self-end pb-2">
									Selesai
              					</div>
							</div>
						</div>
					</div>
					<div className="lg:w-1/2 px-8 sm:block hidden">
						<img
							src={process.env.PUBLIC_URL + "/images/wak-print-home.png"}
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
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Beranda)