import React from 'react'
import './Avatar.css';

function Avatar({ user, bigPhoto }) {

    return (
        <div className={bigPhoto ? "avatar-profile" : "avatar"}>
            {
                user.imageUser 
                ? 
                <div className="avatar__circle">
                    <img src={user.imageUser} alt="avatar" /> 
                </div>    
                :
                <div className="avatar__circle">
                    <span className={bigPhoto ? "avatar__initials bigSize" : "avatar__initials smallSize"}>
                        {user.name.slice(0, 1)}
                    </span>
                </div> 
            }
        </div>
    )
}

export default Avatar
