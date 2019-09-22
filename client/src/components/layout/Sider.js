import React from "react";
import Octicon, { Home, File, History } from "@githubprimer/octicons-react"

const Sider = () => {
    return (
        <div className="w-1/6 bg-green-500" style={{ height: "100vh" }}>
            <div className="flex items-center text-white hover:text-black">
                <Octicon icon={Home} width="18" height="18" className="ml-4"></Octicon>
                <a href="#" className="flex-auto p-4">Dashboard</a>
            </div>
            <div className="flex items-center text-white hover:text-black">
                <Octicon icon={Home} width="18" height="18" className="ml-4"></Octicon>
                <a href="#" className="flex-auto p-4">Pesanan</a>
            </div>
            <div className="flex items-center text-white hover:text-black">
                <Octicon icon={Home} width="18" height="18" className="ml-4"></Octicon>
                <a href="#" className="flex-auto p-4">Riwayat</a>
            </div>
        </div>
    )
}

export default Sider;