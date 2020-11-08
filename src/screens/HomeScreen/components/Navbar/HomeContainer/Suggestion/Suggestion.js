import React, { useEffect, useState } from 'react'
import './Suggestion.css';
import Recommend from './Recommend/Recommend';
import { ADD_FOLLOWER, REMOVE_FOLLOWER } from '../../../../../../queries/followQuery';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MY_FOLLOWING_PEOPLE, GET_RECOMMENDED_USERS } from '../../../../../../queries/userQuery';

function Suggestion(props) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { pathname } = window.location;
    const [openSuggestion, setOpenSuggestion] = useState(pathname === '/suggested');
   
    
    const { loading, error, data } = useQuery(GET_RECOMMENDED_USERS, 
        {
            variables: {
                userId: userInfo.id
            }
        },
        {
            fetchPolicy: "network-only"
        }
    );

    const { loading: loadingMyFollowingPeople, 
        error: errorMyFollowingPeople, 
        data: dataMyFollowingPeople,
    refetch: refetchMyFollowingPeople } = useQuery(GET_MY_FOLLOWING_PEOPLE, {
        variables: { name: userInfo.name }
    }, { fetchPolicy: "network-only" });

    const [addFollower] = useMutation(ADD_FOLLOWER, {
        onCompleted: () => {
            refetchMyFollowingPeople();
        }
    })
    const [removeFollower] = useMutation(REMOVE_FOLLOWER, {
        onCompleted: () => {
            refetchMyFollowingPeople();
        }
    });

    // followerName: username
    const addFollowClick = (userId, followerName) => {
        addFollower({ variables: { 
            userId, 
            followerName 
        }});
    }
    const removeFollowClick = (followId) => {
        removeFollower({ variables: { 
            followId
        }});
    }

   

    if (loading) return <h4>Loading...</h4>;
    if (error) return <div>{error}</div>;
    return (
        <div className="suggestion">
            {
                loadingMyFollowingPeople ? <h4>Loading...</h4>
                : errorMyFollowingPeople ? <div>{errorMyFollowingPeople}</div>
                :
                <Recommend 
                    users={openSuggestion ? data.recommendedUsers : data.recommendedUsers.slice(0, 3)} 
                    title="Gợi ý cho bạn" 
                    addFollowClick={addFollowClick}
                    removeFollowClick={removeFollowClick}
                    dataMyFollowingPeople={dataMyFollowingPeople.user.followingPeople}
                />
            }
            {
                !openSuggestion && 
                <div className="suggestion__friends">
                    <div>
                        <img src="/friends.svg" alt="friends"/>
                    </div>
                    <div>
                        <button>Kết nối bạn bè</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Suggestion
