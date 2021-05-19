import React from 'react'
import './Header.css'
import GoogleAuth from '../GoogleAuth'
function Header() {
    return (
        <div className="ui secondary pointing menu">
            <div className="right menu">
            <GoogleAuth/>
            </div>
        </div>
    )
}

export default Header
