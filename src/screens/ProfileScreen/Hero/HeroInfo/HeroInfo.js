import React from 'react'
import './HeroInfo.css';

function HeroInfo({ user }) {
    return (
        <div className="heroInfo">
            <div>
                <h4>{user.nickname}</h4>
                {
                    user.status ?
                    <p>{user.status}</p>
                    : 
                    <p>Hãy chỉnh sửa trang cá nhân để thêm phần mô tả ở đây.</p>
                }
            </div>
        </div>
    )
}

export default HeroInfo
