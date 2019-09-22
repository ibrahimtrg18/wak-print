import React from "react";
import Navbar from "./Navbar";
import Sider from "./Sider";
import Octicon, { Home, File, History } from "@githubprimer/octicons-react"

const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="container-full" style={{ height: "100vh" }} >
                <div className="flex">
                    <Sider></Sider>
                    <div className="w-5/6 bg-purple-500">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;