import React,{useState,useEffect} from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import Sider from "./Sider";
import Pesanan from "../dashboard/Pesanan";
import Riwayat from "../dashboard/Riwayat";

const Dashboard = (props) => {
    return (
        <div className="container-full" style={{ height: "100vh" }} >
            <div className="flex">
                <Sider></Sider>
                <div className="w-5/6 bg-purple-500">
                </div>
            </div>
        </div>
    )
}

export default Dashboard;