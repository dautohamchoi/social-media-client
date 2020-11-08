import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faBookmark } from '@fortawesome/free-solid-svg-icons'
import './HeroNavbar.css';

function HeroNavbar({ openPosts, username }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const name  = userInfo.name;

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
                <div style={openPosts ? { color: "#ff8686", borderTop: ".3rem solid #ff8686" } : { color: "#969696" } }>
                    <HeroNavbarItem 
                        icon={<FontAwesomeIcon icon={faTable} />}
                        title="BÀI VIẾT"
                        link={`/${username}`}
                    />
                </div>
                {
                    username === name ?
                    <div style={!openPosts ? { color: "#ff8686", borderTop: ".3rem solid #ff8686" } : { color: "#969696" } }>
                        <HeroNavbarItem 
                            icon={<FontAwesomeIcon icon={faBookmark} />}
                            title="ĐÃ LƯU"
                            link={`/${name}/saved`}
                        />
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default HeroNavbar
