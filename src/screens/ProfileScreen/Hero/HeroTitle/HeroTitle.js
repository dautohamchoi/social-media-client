import React from 'react';
import './HeroTitle.css';

// user represents for person who log in the web
// username represents for Name of person in URL, equals to followerName

function HeroTitle({ user, follow, handleEditClick, addFollowClick, handleFollowingClick }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const name = userInfo.name;
    // const follow = user.followers.find(follower => follower.user.name === name);
    const { pathname } = window.location;
    const username = pathname.slice(1);

    function HeroTitleButton(props) {
        return (
            <div className="heroTitle__button" >
                <button 
                    onClick={props.handleClick}
                    style={props.colored ? { backgroundColor: "#0093f5" } : { backgroundColor: "#c0c0c0", color: "#111" } }
                >
                    {props.button}
                </button>
            </div>
        )
    }


    return (
        <div className="heroTitle">
            <div className="heroTitle__container">
                <h4>@{user.name}</h4>
                {
                    user.name === name ?
                    <div className="heroTitle_buttonList">
                        <HeroTitleButton 
                            button="Chỉnh sửa trang cá nhân"
                            handleClick={handleEditClick}
                            colored={true}
                        />
                    </div>
                    :
                    <div className="heroTitle_buttonList">
                        {
                            follow ?
                            <HeroTitleButton 
                                button="Đang theo dõi" 
                                colored={false}
                                handleClick={handleFollowingClick}
                            />
                            :
                            <HeroTitleButton 
                                button="Theo dõi" 
                                colored={true}
                                handleClick={() => addFollowClick(userInfo.id, username)}
                            />
                        }
                        <HeroTitleButton button="Nhắn tin" colored={true} />
                    </div>
                }
            </div>
        </div>
    )
}

export default HeroTitle
