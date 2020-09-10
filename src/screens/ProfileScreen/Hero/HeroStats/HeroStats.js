import React from 'react';
import { Link } from 'react-router-dom';
import './HeroStats.css';


function HeroStats({ user }) {
    return (
        <div className="heroStats">
            <ul>
                <li>
                    <span>{user.posts.length}</span>
                    <span> bài viết</span>
                </li>
                <li>
                    <Link>
                        <span>6789 </span>
                        người theo dõi
                    </Link>
                </li>
                <li>
                    <Link>
                        Đang theo dõi
                        <span> 999 </span>
                        người dùng
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default HeroStats
