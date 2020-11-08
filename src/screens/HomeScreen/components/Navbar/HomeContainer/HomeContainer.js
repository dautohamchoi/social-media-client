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
import InfiniteScroll from 'react-infinite-scroll-component';
// import InfiniteScroll from 'react-infinite-scroller';


function HomeContainer() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [progress, setProgress] = useState(false)

    const { loading, error, data, refetch, fetchMore } = useQuery(GET_POSTS, 
        {
            variables: {
                skip: 0,
                limit: 5
            }
        },
        {
            fetchPolicy: "network-only"
        }
    );

    const [createPost] = useMutation(CREATE_POST, {
            onCompleted: () => {
                refetch();
                setProgress(true);
                setTimeout(() => setProgress(false), 1500);
            },
    });


    const postStatus = (username, contentPost, imagePost) => {
        createPost({ variables: { 
            username: username, 
            contentPost: contentPost,
            imagePost: imagePost
        }});
    }

    const onLoadMore = () => {
        fetchMore({
            variables: {
                skip: data.posts.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                  posts: [...prev.posts, ...fetchMoreResult.posts]
                });
            }
        })
    }


    return (
        <div>
            <div className="homeContainer">
                <div className="homeContainer__sidebar">
                    <div className="homeContainer__sidebar__container">
                        <Sidebar />
                        <Progress progress={progress} />
                    </div>
                </div>
                <div className="homeContainer__newsFeed">
                    <Status userInfo={userInfo} postStatus={postStatus}/>
                    <div className="homeContainer__newsFeed__title">
                        <p>Bảng tin</p>
                        <div className="homeContainer__newsFeed__line">
                            <hr></hr>
                        </div>
                    </div>
                    {
                        loading ? <div>Loading...</div>
                        : error ? <div>{error}</div>
                        : data &&
                        <InfiniteScroll
                            dataLength={data.posts.length} //This is important field to render the next data
                            next={onLoadMore}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            <Posts posts={data.posts} 
                            refetch={refetch} 
                            />
                        </InfiniteScroll>
                    }  
                    {/* {
                        loading ? <div>Loading...</div>
                        : error ? <div>{error}</div>
                        : 
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={onLoadMore}
                            hasMore={true || false}
                            loader={<div className="loader" key={0}>Loading ...</div>}
                            useWindow={false}
                        >
                            <Posts posts={data.posts} 
                            refetch={refetch} 
                            />
                        </InfiniteScroll>
                    }  */}
                </div>
                <div className="homeContainer__suggestion">
                    <Suggestion  />
                </div>
            </div>
        </div>            
    )
}

export default HomeContainer;
