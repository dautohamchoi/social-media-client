import React from 'react'
import PropTypes from 'prop-types'
import './NavbarItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCog } from '@fortawesome/free-solid-svg-icons';

function NavbarItem(props) {

    function NavbarButton(props) {
        return (
            <div className="navbarButton">
                <button onClick={props.handleLogOut}>
                    <span className="navbarButton__icon">{props.icon}</span>
                    <span className="navbarButton__title">{props.title}</span>
                </button>
            </div>
        )
    }

    return (
        <div className="navbarItem">
            <button 
                onClick={props.handleClick}
                style={props.settings ? { color: "#0093f5"} : null }
            >
                {props.item}
            </button>
            {
                props.settings &&
                <aside className="navbarItem__dropdown">
                    <div>
                        <NavbarButton 
                            icon={<FontAwesomeIcon icon={faUserCog} />}
                            title="Đổi mật khẩu"
                        />
                        <NavbarButton 
                            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                            title="Đăng xuất"
                            handleLogOut={props.handleLogOut}
                        />
                    </div>
                </aside>
            }
        </div>
    )
}

NavbarItem.propTypes = {
    
}

export default NavbarItem;

