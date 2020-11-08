import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Follower from '../../../../Follower/Follower'

function Recommend({ users,
     title, 
     addFollowClick, 
     removeFollowClick, 
     dataMyFollowingPeople,  }) {
    // const [openFollowing, setOpenFollowing] = useState(false);

    return (
        <div className="suggestion__top">
                <div className="suggestion__top__title">
                    <h3>{title}</h3>
                    <div className="suggestion__title__line">
                        <hr></hr>
                    </div>
                </div>
                <div>
                    {
                        users.map(user => (
                            <div key={user.id}>
                                <Follower 
                                    follower={user}
                                    addFollowClick={addFollowClick} 
                                    removeFollowClick={removeFollowClick}
                                    mutualFollower={dataMyFollowingPeople.find(man => man.follower.name === user.name)}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="suggestion__title__button">
                    <Link to="/suggested" className="link-control">Xem thêm</Link>
                </div>
        </div>
    )
}

export default Recommend
