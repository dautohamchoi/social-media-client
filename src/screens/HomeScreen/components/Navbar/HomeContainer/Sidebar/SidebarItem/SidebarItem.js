import React from 'react'
import './SidebarItem.css';
import { Link, NavLink } from 'react-router-dom';

function SidebarItem(props) {
    return (
        <div className="sidebarItem">
            <Link className={
                props.chosen 
                ? "sidebarItem__content chosen"
                : "sidebarItem__content"
                }
                to={props.link}
            >
                <span className="sidebarItem__content__icon">
                    {props.icon}
                </span>
                <span className="sidebarItem__content__title">
                    {props.title}
                </span>
            </Link>
            
        </div>
    )
}

export default SidebarItem
