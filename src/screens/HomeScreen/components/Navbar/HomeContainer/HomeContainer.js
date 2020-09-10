import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar';
import './HomeContainer.css';
import Messenger from './Messenger/Messenger';
import Status from './Status/Status';
import Posts from './Posts/Posts';
import Suggestion from './Suggestion/Suggestion';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS, CREATE_POST } from '../../../../../queries/postQuery';
import Progress from './Progress/Progress';

function HomeContainer() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [progress, setProgress] = useState(false)

    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        fetchPolicy: "network-only"
    });

    const [createPost, { 
            loading: loadingCreatePost, 
            error: errorCreatePost 
            }
        ] = useMutation(CREATE_POST, {
            onCompleted: () => {
                refetch();
                setProgress(true);
                setTimeout(() => setProgress(false), 1500);
            }
    });

    const postStatus = (userId, contentPost) => {
        createPost({ variables: { userId: userId, contentPost: contentPost }});
    }


    return (
        <div className="homeContainer">
            <div className="homeContainer__sidebar">
                <div className="homeContainer__sidebar__container">
                    <Sidebar />
                    <Messenger />
                    <Progress progress={progress} />
                </div>
            </div>
            <div className="homeContainer__newsFeed">
                <Status userInfo={userInfo} postStatus={postStatus}/>
                <div className="homeContainer__newsFeed__title">
                    <p>Bảng tin</p>
                    <div className="homeContainer__newsFeed__line">
                        <span>&nbsp;</span>
                        <hr></hr>
                    </div>
                </div>
                {
                    loading ? <div>Loading...</div>
                    : error ? <div>{error}</div>
                    : <Posts posts={data.posts} 
                        refetch={refetch} 
                        />
                }  
            </div>
            <div className="homeContainer__suggestion">
                <Suggestion />
            </div>
        </div>
    )
}

export default HomeContainer;
