import React from "react";
import { Link } from "react-router-dom";
import Octicon, { Home, File, History } from "@githubprimer/octicons-react"

const Sider = () => {
    return (
        <div className="w-1/6 bg-green-500" style={{ height: "100vh" }}>
            <div className="flex items-center text-white hover:text-black">
                <Octicon icon={Home} width="18" height="18" className="ml-4"></Octicon>
                <Link to="/dashboard/" className="flex-auto p-4">Dashboard</Link>
            </div>
            <div className="flex items-center text-white hover:text-black">
                <Octicon icon={Home} width="18" height="18" className="ml-4"></Octicon>
                <Link to="/dashboard/pesanan" className="flex-auto p-4">Pesanan</Link>
            </div>
            <div className="flex items-center text-white hover:text-black">
                <Octicon icon={Home} width="18" height="18" className="ml-4"></Octicon>
                <Link to="/dashboard/riwayat" className="flex-auto p-4">Riwayat</Link>
            </div>
        </div>
    )
}

export default Sider;