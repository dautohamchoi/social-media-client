import React from 'react'
import PropTypes from 'prop-types'
import './NavbarItem.css';

function NavbarItem(props) {
    return (
        <div className="navbarItem">
            <button>
                {props.item}
            </button>
        </div>
    )
}

NavbarItem.propTypes = {
    
}

export default NavbarItem;

