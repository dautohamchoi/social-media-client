import React from 'react';
import { Link } from 'react-router-dom';
import './Follower.css';

function Follower() {
    return (
        <div className="follower">
            <div className="follower__avatar">
                <Link to="#">
                    <img src="/face28.jpg" alt="avatar" />
                </Link>
            </div>
            <div className="follower__info">
                <Link href="#" className="link-control">Buddy</Link>
                <p>Có 30 người theo dõi</p>
            </div>
            <div className="follower__button">
                <button>
                    Theo dõi
                </button>
            </div>
        </div>
    )
}

export default Follower
