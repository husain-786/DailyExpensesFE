import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {

    return (
    <>
        {/* <nav className="navbar navbar-expand-lg bg-body-tertiary" style = {navStyle}> */}
        <nav className="navbar navbar-expand-lg" style = {{background: "#115627"}}>
            <div className="container-fluid" style={{display:"flex", justifyContent:"left"}}>
                {/* <Link className="navbar-brand" to="/"><strong>Home</strong></Link> */}
                <Link className="navbar-brand" to="/user"><strong  style={{color: "#e8f0eb"}}>Add User</strong></Link>
                <Link className="navbar-brand" to="/expense"><strong  style={{color: "#e8f0eb"}}>Your Expenses</strong></Link>
            </div>
            <div><strong  style={{color: "#e8f0eb"}}>Sajjad Husain</strong></div>
        </nav>
    </>
  )
}
