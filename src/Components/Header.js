import React from 'react';
import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";

export default function Header(props) {
    return (
        <div className="header">
            <span className={props.selected==="vote" ? "header-selected" : ""}>Vote</span>
            <span className={props.selected==="home" ? "header-selected" : ""}>Home</span>
            <span>About</span>
            <span>Login</span>
            <span>Signup</span>
        </div>
    )
}
