import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faMoon, faCog } from '@fortawesome/free-solid-svg-icons';
import NavbarItem from './NavbarItem/NavbarItem';
import './Navbar.css';
import Avatar from '../Avatar/Avatar';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SEARCHING_USERS } from '../../../../queries/userQuery';
import SearchResult from './SearchResult/SearchResult';


function Navbar(props) {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [openSettings, setOpenSettings] = useState(false);
    const { onSubmit } = props;
    const typingTimeoutRef = useRef(null);

    const [searchingUsers, { loading, error, data }] = useMutation(SEARCHING_USERS, {
        // onCompleted: () => {
        //     setSearch('');
        // }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        searchingUsers({ variables: { keyword: searchTerm } });
    }

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
        const formValues = e.target.value;
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            if (formValues) {
                searchingUsers({ variables: { keyword: formValues }});
            }
        }, 500);
    }

    const handleSettingsClick = () => {
        setOpenSettings(!openSettings);
    }

    const handleLogOut = () => {
        localStorage.clear();
        history.push('/accounts/login');
        window.location.reload();
    }

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <img src="/logo_instagram.png" alt="logo" />
            </div>
            <div className="navbar__search">
                <OutsideClickHandler onOutsideClick={() => setSearchTerm('')}>
                    <form 
                        className="navbar__search__container"
                        onSubmit={handleSearch}
                    >
                        <button 
                            type="submit"
                            className="navbar__search__button" 
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <input
                            type="text"
                            onChange={handleSearchTermChange}
                            name="search"
                            placeholder="Tìm kiếm ..."
                            value={searchTerm} 
                            required
                        />
                    </form>
                    <ul className="navbar__searchContainer" style={searchTerm ? {display: "block"} : {display: "none"} }>
                    {
                        data &&
                        data.searchingUsers.length ?
                        data.searchingUsers.map(user => ( 
                            <li key={user.id}>
                                <Link to={`/${user.name}`} className="navbar__link">
                                        <SearchResult user={user} />
                                </Link>
                            </li>
                        ))
                        : 
                        <div className="navbar__search__nothing">Không tìm thấy kết quả</div>
                    }
                    </ul>
                </OutsideClickHandler>
            </div>
            <div className="navbar__nav">
                <NavbarItem item={<FontAwesomeIcon icon={faMoon}/>}  />
                <NavbarItem item={<FontAwesomeIcon icon={faBell}/>}  />
                <NavbarItem item={
                        userInfo &&
                        <NavLink to={userInfo.name} activeClassName="navbar__nav__active">
                            <Avatar user={userInfo} bigPhoto={false} /> 
                        </NavLink>  
                 }/>
                <OutsideClickHandler onOutsideClick={() => setOpenSettings(false)}>
                    <NavbarItem 
                        item={<FontAwesomeIcon icon={faCog}/>} 
                        settings={openSettings}
                        handleClick={handleSettingsClick}
                        handleLogOut={handleLogOut}  
                    />
                </OutsideClickHandler>
            </div>
        </div>
    )
}

export default Navbar
