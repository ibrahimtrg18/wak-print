import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <span class="navbar-brand mb-0 h1">Wak Print</span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">SignOut</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}


export default Navbar;