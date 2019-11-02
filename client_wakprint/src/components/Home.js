import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { authLogout } from '../redux/actions/authActions';
import Navbar from './Navbar'

const Beranda = (props) => {

	useEffect(() => {
		if (!props.auth) {
			props.history.push("/login");
		}
	})

	if (props.auth) {
		return (
			<div className="bg-gray-100 h-screen">
				<Navbar goTo={"LogOut"} authLogout={() => props.authLogout()}></Navbar>
				<div className="sm:flex sm:pt-40 pt-48">
					<div className="lg:w-1/2 md:px-8 px-4">
						<p className="text-2xl font-medium mb-2 text-center">
							Analisis Usaha printer Anda
          	</p>
						<div className="lg:px-12">
							<div className="flex max-w-full rounded overflow-hidden shadow-2xl mb-2 sm:px-16 px-10 py-4 bg-white">
								<div class="flex-grow font-medium text-5xl">
									6
              	</div>
								<div class="text-base font-medium self-end pb-2">
									Orderan
              	</div>
							</div>
							<div className="flex max-w-full rounded overflow-hidden shadow-2xl mb-2 sm:px-16 px-10 py-4 bg-white">
								<div class="flex-grow font-medium text-5xl">
									1
              	</div>
								<div class="text-base font-medium self-end pb-2">
									Proses
              	</div>
							</div>
							<div className="flex max-w-full rounded overflow-hidden shadow-2xl mb-2 sm:px-16 px-10 py-4 bg-white">
								<div class="flex-grow font-medium text-5xl">
									0
              	</div>
								<div class="text-base font-medium self-end pb-2">
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

const mapDispatchToProps = (dispatch) => {
	return {
		authLogout: () => { dispatch(authLogout()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Beranda)