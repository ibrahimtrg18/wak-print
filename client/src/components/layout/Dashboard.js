import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar" style={{ width: "100vh", height: "100vh" }}>
                        <ul className="nav flex-column">
                            <li className="nav-item d-flex align-items-center">
                                <i class="far fa-home" style={{width:"18px"}}></i>
                                <a href="#" className="col-sm nav-link">
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <i class="far fa-file d-flex justify-content-center" style={{width:"18px"}}></i>
                                <a href="#" className="col-sm nav-link">
                                    Pesanan
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;