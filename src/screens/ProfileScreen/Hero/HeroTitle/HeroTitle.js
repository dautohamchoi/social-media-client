import React from 'react';
import './HeroTitle.css';


function HeroTitle({ user, handleEditClick }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const username = userInfo.name;


    function HeroTitleButton(props) {
        return (
            <div className="heroTitle__button">
                <button onClick={props.handleClick}>
                    {props.button}
                </button>
            </div>
        )
    }


    return (
        <div className="heroTitle">
            <div className="heroTitle__container">
                <h4>{user.name}</h4>
                {
                    user.name === username ?
                    <div className="heroTitle_buttonList">
                        <HeroTitleButton 
                            button="Chỉnh sửa trang cá nhân"
                            handleClick={handleEditClick}
                        />
                    </div>
                    :
                    <div className="heroTitle_buttonList">
                        <HeroTitleButton button="Theo dõi" />
                        <HeroTitleButton button="Nhắn tin" />
                    </div>
                }
            </div>
        </div>
    )
}

export default HeroTitle
