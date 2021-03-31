import React from "react";
import {
    Link
  } from "react-router-dom";

import './Nav.scss'

const Nav = props => {
    return (
        <div className="navbar">
            <div className="container nav">
                <ul>
                    <li><Link to="/">Trainer</Link></li>
                    <li><Link to="/lesson/1">Vocabulary Lists</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Nav;