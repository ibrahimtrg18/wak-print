import React from 'react'

const Navbar = () => {
    return (
        <nav class="flex justify-between flex-wrap bg-white p-6 shadow-md">
            <div className="flex items-center" style={{width:"100%"}}>
                <div className="flex flex-grow font-bold text-3xl" >
                    <div className="text-purple-900">Wak</div>
                    <div className="text-purple-400">Print</div>
                </div>
                <div>
                    <button className="btn btn-primary text-lg text-medium px-12">Daftar Disini</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;