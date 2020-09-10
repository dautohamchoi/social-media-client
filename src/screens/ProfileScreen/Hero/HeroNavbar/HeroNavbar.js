import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faBookmark } from '@fortawesome/free-solid-svg-icons'
import './HeroNavbar.css';

function HeroNavbar() {

    function HeroNavbarItem(props) {
        return (
            <div className="heroNavbar__item">
                <Link to={props.link}>
                    <span>{props.icon}</span>
                    <span>{props.title}</span>
                </Link>
            </div>
        )
    }

    return (
        <div>
            <div className="heroNavbar">
                <HeroNavbarItem 
                    icon={<FontAwesomeIcon icon={faTable} />}
                    title="BÀI VIẾT"
                />
                <HeroNavbarItem 
                    icon={<FontAwesomeIcon icon={faBookmark} />}
                    title="ĐÃ LƯU"
                />
            </div>
        </div>
    )
}

export default HeroNavbar
