import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Follower from '../../../HomeScreen/components/Follower/Follower'
import './HeroFollowers.css';


function HeroFollowers({ followers, followingPeople, handleClick, dataMyFollowingPeople, removeFollowClick, addFollowClick }) {

    return (
        <div className="heroFollowers">
            <div className="heroFollowers__container">
                <div className="heroFollowers__header">
                    <h4>
                        { followers ? "Người theo dõi" : "Đang theo dõi"}
                    </h4>
                    <aside className="heroFollowers__cancel">
                        <button onClick={handleClick}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </aside>
                </div>
                <ul className="heroFollowers__list">
                    {
                        followers &&
                        followers.map(follower => 
                            (<li key={follower.id}>
                                <Follower 
                                    handleClick={handleClick}
                                    addFollowClick={addFollowClick}
                                    removeFollowClick={removeFollowClick}
                                    follower={follower.user}
                                    mutualFollower={dataMyFollowingPeople.find(man => man.follower.name === follower.user.name)}
                                />
                            </li>)
                        )
                    }
                    {
                        followingPeople &&
                        followingPeople.map(follower => 
                            (<li key={follower.id}>
                                <Follower 
                                    handleClick={handleClick}
                                    addFollowClick={addFollowClick}
                                    removeFollowClick={removeFollowClick}
                                    follower={follower.follower} 
                                    mutualFollower={dataMyFollowingPeople.find(man => man.follower.name === follower.follower.name)}
                                />
                            </li>)
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default HeroFollowers
