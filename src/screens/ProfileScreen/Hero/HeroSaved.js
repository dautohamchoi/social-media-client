import React, { useState } from 'react'
import Avatar from '../../HomeScreen/components/Avatar/Avatar'
import HeroTitle from './HeroTitle/HeroTitle'
import './Hero.css';
import HeroStats from './HeroStats/HeroStats';
import HeroInfo from './HeroInfo/HeroInfo';
import '../../HomeScreen/components/Navbar/HomeContainer/HomeContainer.css';
import Sidebar from '../../HomeScreen/components/Navbar/HomeContainer/Sidebar/Sidebar';
import Messenger from '../../HomeScreen/components/Navbar/HomeContainer/Messenger/Messenger';
import HeroNavbar from './HeroNavbar/HeroNavbar';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MY_FOLLOWING_PEOPLE, GET_USER_INFO } from '../../../queries/userQuery';
import Posts from '../../HomeScreen/components/Navbar/HomeContainer/Posts/Posts';
import PageNotFound from '../../../component/PageNotFound/PageNotFound';
import EmptyPost from '../../../component/EmptyPost/EmptyPost';
import HeroEdit from './HeroEdit/HeroEdit';
import OutsideClickHandler from 'react-outside-click-handler';
import { ADD_FOLLOWER, REMOVE_FOLLOWER } from '../../../queries/followQuery';
import HeroFollowing from './HeroFollowing/HeroFollowing';
import HeroFollowers from './HeroFollowers/HeroFollowers';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GET_SAVED_POSTS } from '../../../queries/postQuery';



function HeroSaved() {
    const { pathname } = window.location;
    const username = pathname.slice(1).replace("/saved", "");

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const [openEdit, setOpenEdit] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false)
    const [openFollowers, setOpenFollowers] = useState(false)
    const [openFollowingPeople, setOpenFollowingPeople] = useState(false)

    const { loading: loadingInfo, error: errorInfo, data: dataInfo, refetch: refetchInfo} = useQuery(GET_USER_INFO, {
        variables: {  
            name: username,
        }
    }, { fetchPolicy: "network-only" });

    const { loading, error, data, refetch, fetchMore } = useQuery(GET_SAVED_POSTS, {
        variables: {  
            userId: userInfo.id,
            skip: 0,
            limit: 4,
        }
    }, { fetchPolicy: "network-only" });


    const { loading: loadingMyFollowingPeople, 
        error: errorMyFollowingPeople, 
        data: dataMyFollowingPeople,
    refetch: refetchMyFollowingPeople } = useQuery(GET_MY_FOLLOWING_PEOPLE, {
        variables: { name: userInfo.name }
    }, { fetchPolicy: "network-only" });

    
    const [addFollower] = useMutation(ADD_FOLLOWER, {
        onCompleted: () => {
            refetch();
            refetchInfo();
            refetchMyFollowingPeople();
        }
    })
    const [removeFollower] = useMutation(REMOVE_FOLLOWER, {
        onCompleted: () => {
            refetch();
            refetchInfo();
            refetchMyFollowingPeople();
            setOpenFollowing(false);
        }
    })

    const handleEditClick = () => {
        if (openEdit) return setOpenEdit(false);
        if (!openEdit) return setOpenEdit(true);
    }

    const handleFollowingClick = () => {
        setOpenFollowing(!openFollowing);
    }

    const handleFollowingPeopleClick = () => {
        setOpenFollowingPeople(!openFollowingPeople);
    }

    const handleFollowersClick = () => {
        setOpenFollowers(!openFollowers);
    }
    
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

    const onLoadMore = () => {
        fetchMore({
            variables: {
                skip: data.savedPosts.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                console.log(prev);
                return Object.assign({}, prev, {
                    savedPosts: [...prev.savedPosts, ...fetchMoreResult.savedPosts]
                });

            }
        })
    }

  

    return (
        <div className="homeContainer">
            <div className="homeContainer__sidebar">
                <div className="homeContainer__sidebar__container">
                    <Sidebar />
                </div>
            </div>
            <div className="hero__wrap">
                <div>
                    <div className="hero__container">
                        {
                            loadingInfo ? <div>Loading...</div>
                            : errorInfo ? <div>{errorInfo}</div>
                            : dataInfo.user ?
                            <div className="hero__container__header">
                                <div className="hero__avatar">
                                    <Avatar user={dataInfo.user} bigPhoto={!!(pathname.length > 4)} />
                                </div>
                                <div className="hero__detail">
                                    <HeroTitle 
                                        user={dataInfo.user}
                                        follow={dataInfo.user.followers.find(follower => follower.user.name === userInfo.name)}  
                                        handleEditClick={handleEditClick}
                                        addFollowClick={addFollowClick}
                                        handleFollowingClick={handleFollowingClick}
                                    />
                                    <HeroStats 
                                        user={dataInfo.user}
                                        handleFollowersClick={handleFollowersClick}
                                        handleFollowingPeopleClick={handleFollowingPeopleClick}
                                    />
                                    <HeroInfo user={dataInfo.user} />
                                </div>
                                {
                                    openEdit &&
                                    <aside className="hero__edit">
                                        <OutsideClickHandler onOutsideClick={() => setOpenEdit(false)}>
                                            <HeroEdit user={dataInfo.user} handleEditClick={handleEditClick} />
                                        </OutsideClickHandler>
                                    </aside>
                                }
                                {
                                    openFollowing &&
                                    <aside className="hero__edit">
                                        <OutsideClickHandler onOutsideClick={() => setOpenFollowing(false)}>
                                            <HeroFollowing 
                                                user={dataInfo.user}
                                                follow={dataInfo.user.followers.find(follower => follower.user.name === userInfo.name)} 
                                                bigPhoto={true} 
                                                handleFollowingClick={handleFollowingClick} 
                                                removeFollowClick={removeFollowClick}
                                            />
                                        </OutsideClickHandler>
                                    </aside>
                                }
                                {
                                    openFollowingPeople &&
                                    <aside className="hero__edit">
                                        <OutsideClickHandler onOutsideClick={() => setOpenFollowingPeople(false)}>
                                            <HeroFollowers 
                                                followingPeople={dataInfo.user.followingPeople}
                                                dataMyFollowingPeople={dataMyFollowingPeople.user.followingPeople}
                                                handleClick={handleFollowingPeopleClick} 
                                                removeFollowClick={removeFollowClick}
                                                addFollowClick={addFollowClick}
                                            />
                                        </OutsideClickHandler>
                                    </aside>
                                }
                                {
                                    openFollowers &&
                                    <aside className="hero__edit">
                                        <OutsideClickHandler onOutsideClick={() => setOpenFollowers(false)}>
                                            <HeroFollowers 
                                                followers={dataInfo.user.followers}
                                                dataMyFollowingPeople={dataMyFollowingPeople.user.followingPeople}
                                                handleClick={handleFollowersClick}
                                                removeFollowClick={removeFollowClick} 
                                                addFollowClick={addFollowClick}
                                            />
                                        </OutsideClickHandler>
                                    </aside>
                                }
                            </div>
                            :
                            <div className="homeContainer__newsFeed">
                                <PageNotFound />
                            </div>
                        } 
                        <div className="hero__container__navbar">
                            <HeroNavbar openPosts={false} username={username} />
                        </div>
                    </div>

                    <div className="hero__posts">
                        <div className="hero__posts__container">
                            {
                                loading ? <div>Loading...</div>
                                : error ? <div>{error}</div>
                                : data.savedPosts.length >= 1 ?
                                <InfiniteScroll
                                    dataLength={data.savedPosts.length} //This is important field to render the next data
                                    next={onLoadMore}
                                    hasMore={true}
                                    loader={<h4>Loading...</h4>}
                                    endMessage={
                                        <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    <Posts posts={data.savedPosts} 
                                        refetch={refetch} 
                                    />
                                </InfiniteScroll>
                                :
                                <EmptyPost />
                            }
                            </div>    
                        </div>
                    </div>
                </div>    
 
        </div>
    )
}

export default HeroSaved
