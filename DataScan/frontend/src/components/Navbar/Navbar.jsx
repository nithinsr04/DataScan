import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [menu, setMenu] = useState("home"); 

  return (
    <>
    <div className='navbar'>
        <ul className='navbar-menu'>
            <Link to='/' onClick={() => setMenu("home")} className={menu ==="home"?"active":""}>Home</Link>
            <Link to='/analyse' onClick={() => setMenu("upload")} className={menu ==="upload"?"active":""}>Upload file</Link>
            <Link to='/scans' onClick={() => setMenu("scans")} className={menu ==="scans"?"active":""}>Scan History</Link>
            <Link to='/delete' onClick={() => setMenu("delete")} className={menu ==="delete"?"active":""}>Delete Scans</Link>
        </ul>
    </div>
    </>
  )
}

export default Navbar
