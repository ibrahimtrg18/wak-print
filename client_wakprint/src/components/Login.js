import React from 'react'
import Navbar from './Navbar'

const Login = () => {
    return (
        <div className="bg-gray-100" style={{ height: "100%", minHeight: "100vh" }}>
            <Navbar></Navbar>
            <div className="md:flex mb-4 px-12 sm:py-4 sm:mt-8">
                <div className="md:w-1/2 invisible sm:invisible md:visible">Img</div>
                <div className="md:w-1/2">
                    <div className="text-2xl font-medium text-gray-800 text-center">
                        Masuk Mitra WakPrint
                    </div>
                    <form className="items-center py-8">
                        <label className="block text-md uppercase font-base text-gray-700 py-2">E-Mail</label>
                        <input type="text" name="email" id="email" className="w-full border-primary rounded-lg py-2 px-3" />
                        <label className="block text-md uppercase font-base text-gray-700 py-2">Kata Sandi</label>
                        <input type="password" name="password" id="password" className="w-full border-primary rounded-lg py-2 px-3" />
                        <div className="flex text-xs font-base text-gray-800 justify-center my-3">
                            <p>Belum punya akun?</p>
                            <a className="ml-1 text-primary"> Daftar</a>
                        </div>
                        <input type="submit" value="masuk" className="btn btn-primary uppercase text-lg text-medium w-full" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login