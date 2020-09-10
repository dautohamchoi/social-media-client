import React from 'react';
import './MessengerItem.css';

function MessengerItem() {
    return (
        <div className="messengerItem">
            <div className="messengerItem__avatar">
                <img src="/face28.jpg" alt="avatar"/>
            </div>
            <div className="messengerItem__info">
                <h4>Username</h4>
                <p>Messages..........</p>
            </div>
            <div className="messengerItem__time">
                <p>08:30</p>
            </div>
        </div>
    )
}

export default MessengerItem;
