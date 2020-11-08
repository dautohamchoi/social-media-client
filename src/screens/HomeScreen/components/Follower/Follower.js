import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import HeroFollowing from '../../../ProfileScreen/Hero/HeroFollowing/HeroFollowing';
import Avatar from '../Avatar/Avatar';
import './Follower.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;



// DEFINE ARGUMENTS
// follower - the object data of follower
// following - boolean to decide content of button


function Follower({ follower, 
    mutualFollower , 
    handleClick, 
    removeFollowClick, 
    addFollowClick }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    const [openFollowing, setOpenFollowing] = useState(false);
    const [processAdding, setProcessAdding] = useState(false);
    
    // prevent users double click "follow" button, it causes send two http request to server
    useEffect(() => {
           setProcessAdding(false);
    }, [mutualFollower])

    return (
        <div className="follower">
            <div className="follower__avatar">
                <Avatar  user={follower} /> 
            </div>
            <div className="follower__info">
                <Link 
                    to={`/${follower.name}`} 
                    className="link-control"
                    onClick={handleClick}
                >
                    {follower.name}
                </Link>
                <p>{follower.nickname}</p>
            </div>
            {
                userInfo.name !== follower.name &&
                <div className="follower__button">
                    {
                        processAdding ?
                        <button 
                            className="follower__btn__follow"
                        >
                            <ClipLoader
                                css={override}
                                size={20}
                                color={"#123abc"}
                                loading={processAdding}
                                />
                        </button>
                        :
                        mutualFollower ?
                        <button 
                            className="follower__btn__following"
                            onClick={() => {
                                setOpenFollowing(true);
                                setProcessAdding(true);
                            }}
                        >
                            Đang theo dõi
                        </button>
                        :
                        <button 
                            className="follower__btn__follow"
                            onClick={() => {
                                addFollowClick(userInfo.id, follower.name);
                                setProcessAdding(true);
                            }}
                        >
                            Theo dõi
                        </button>
                    }
                </div>
            }
            {
                openFollowing &&
                <aside className="hero__edit">
                    <OutsideClickHandler 
                        onOutsideClick={() => {
                            setOpenFollowing(false);
                            setProcessAdding(false);
                        }}
                    >
                        <HeroFollowing 
                                    user={follower} 
                                    follow={follower}
                                    bigPhoto={true} 
                                    handleFollowingClick={() => {
                                        setOpenFollowing(false);
                                        
                                    }} 
                                    removeFollowClick={() => {
                                        removeFollowClick(mutualFollower.id);
                                        setOpenFollowing(false);
                                    }}
                        />
                    </OutsideClickHandler>
                </aside>
            }
        </div>
    )
}

export default Follower
