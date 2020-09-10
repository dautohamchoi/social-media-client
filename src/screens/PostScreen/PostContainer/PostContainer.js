import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import '../../HomeScreen/components/Navbar/HomeContainer/HomeContainer.css';
import Sidebar from '../../HomeScreen/components/Navbar/HomeContainer/Sidebar/Sidebar';
import Suggestion from '../../HomeScreen/components/Navbar/HomeContainer/Suggestion/Suggestion';
import Messenger from '../../HomeScreen/components/Navbar/HomeContainer/Messenger/Messenger';
import { GET_POST_DETAIL } from '../../../queries/postQuery'; 
import PostItem from '../../HomeScreen/components/Navbar/HomeContainer/Posts/PostItem/PostItem';


function PostContainer(props) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const postId = window.location.pathname.slice(7);


    const { loading, error, data, refetch } = useQuery(GET_POST_DETAIL, {
        variables: { id: postId }
    }, { fetchPolicy: "network-only" });



    return (
        <div className="homeContainer">
            <div className="homeContainer__sidebar">
                <Sidebar />
                <Messenger />
            </div>
            <div className="homeContainer__newsFeed">
                {
                    loading ? <div>Loading...</div> :
                    error ? <div>{error}</div>
                    :
                    <PostItem post={data.post} refetch={refetch} />
                }
            </div>
            <div className="homeContainer__suggestion">
                <Suggestion />
            </div>
        </div>
    )
}

export default PostContainer;
