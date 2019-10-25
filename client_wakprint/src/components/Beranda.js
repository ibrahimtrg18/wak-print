import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { authLogout } from '../redux/actions/authActions';
import Navbar from './Navbar'

const Beranda = (props) => {

	useEffect(() => {
		console.log(props.auth)
		if (!props.auth) {
			props.history.push("/login");
		}
	})

	return (
		<div className="bg-gray-100" style={{ height: "100%", minHeight: "100vh" }}>
			<Navbar goTo={"LogOut"} goToRedirect={() => props.authLogout()}></Navbar>
			<div className="sm:flex sm:pt-32 pt-32">
				<div className="lg:w-1/2 px-8">
					<p className="text-2xl font-medium mb-2 text-center">
						Analisis Usaha printer Anda
          </p>
					<div className="lg:px-12">
						<div className="flex max-w-full rounded overflow-hidden shadow-xl mb-2 px-10 py-4 bg-white">
							<div class="flex-grow font-medium text-5xl">
								6
              </div>
							<div class="text-base font-medium self-end pb-2">
								Orderan
              </div>
						</div>
						<div className="flex max-w-full rounded overflow-hidden shadow-xl mb-2 px-10 py-4 bg-white">
							<div class="flex-grow font-medium text-5xl">
								1
              </div>
							<div class="text-base font-medium self-end pb-2">
								Proses
              </div>
						</div>
						<div className="flex max-w-full rounded overflow-hidden shadow-xl mb-2 px-10 py-4 bg-white">
							<div class="flex-grow font-medium text-5xl">
								0
              </div>
							<div class="text-base font-medium self-end pb-2">
								Selesai
              </div>
						</div>
					</div>
				</div>
				<div className="lg:w-1/2 px-8">
					<div className="p">
						<p className="text-2xl font-medium">img</p>
					</div>
				</div>
			</div>
		</div>
	)
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

export default connect(mapStateToProps,mapDispatchToProps)(Beranda)