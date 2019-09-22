import React from "react";
import Sider from "../layout/Sider"

const Pesanan = () => {
    return (
        <div className="container-full" style={{ height: "100vh" }} >
            <div className="flex">
                <Sider></Sider>
                <div className="w-5/6 bg-purple-500">
                    Pesanan
                </div>
            </div>
        </div>
    )
}

export default Pesanan;