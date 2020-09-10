import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faMoon, faCog } from '@fortawesome/free-solid-svg-icons';
import NavbarItem from './NavbarItem/NavbarItem';
import './Navbar.css';
import Avatar from '../Avatar/Avatar';


function Navbar() {
    const [search, setSearch] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    
    return (
        <div className="navbar">
            <div className="navbar__logo">
                <img src="/logo_instagram.png" alt="logo" />
            </div>
            <div className="navbar__search">
                <div className="navbar__search__container">
                    <button className="navbar__search__button" >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <input
                        type="text"
                        onChange={(e) => e.target.value}
                        name="search"
                        placeholder="Tìm kiếm ..." 
                    />
                </div>
            </div>
            <div className="navbar__nav">
                <NavbarItem item={<FontAwesomeIcon icon={faMoon}/>}  />
                <NavbarItem item={<FontAwesomeIcon icon={faBell}/>}  />
                <NavbarItem item={
                        userInfo &&
                        <Avatar user={userInfo} bigPhoto={false} />   
                 }/>
                <NavbarItem item={<FontAwesomeIcon icon={faCog}/>}  />
            </div>
        </div>
    )
}

export default Navbar
