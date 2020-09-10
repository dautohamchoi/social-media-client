import React from 'react'
import Follower from './Follower/Follower';
import './Suggestion.css';
import { Link } from 'react-router-dom';

function Suggestion() {
    return (
        <div className="suggestion">
            <div className="suggestion__top">
                <div className="suggestion__top__title">
                    <h3>Người nổi tiếng</h3>
                    <div className="suggestion__title__line">
                        <hr></hr>
                    </div>
                </div>
                <div>
                    <Follower />
                    <Follower />
                </div>
                <div className="suggestion__title__button">
                    <Link to="#" className="link-control">Xem thêm</Link>
                </div>
            </div>
            <div className="suggestion__top">
            <div className="suggestion__top__title">
                    <h3>Gợi ý cho bạn</h3>
                    <div className="suggestion__title__line">
                        <hr></hr>
                    </div>
                </div>
                <div>
                    <Follower />
                    <Follower />
                </div>
                <div className="suggestion__title__button">
                    <Link to="#" className="link-control">Xem thêm</Link>
                </div>
            </div>
            <div className="suggestion__friends">
                <div>
                    <img src="/friends.svg" alt="friends"/>
                </div>
                <div>
                    <button>Kết nối bạn bè</button>
                </div>
            </div>
        </div>
    )
}

export default Suggestion
