import React from 'react'
import SidebarItem from './SidebarItem/SidebarItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faComment } from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';

function Sidebar() {
    const { pathname } = window.location;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));


    return (
        <div className="sideBar">
            <div>
                <SidebarItem 
                    icon={<FontAwesomeIcon icon={faHome} />} 
                    title="Bảng tin" 
                    chosen={pathname === '/' ? true : false}
                    link="/"
                />
                <SidebarItem 
                    icon={<FontAwesomeIcon icon={faUser} />} 
                    title="Thông tin"
                    chosen={pathname.length > 1 ? true : false}
                    link={`/${userInfo.name}`}
                />
                <SidebarItem 
                    icon={<FontAwesomeIcon icon={faComment} />} 
                    title="Tin nhắn"
                    link="/messages" 
                />
            </div>
        </div>
    )
}

export default Sidebar
