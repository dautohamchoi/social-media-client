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
import { useQuery } from '@apollo/client';
import { GET_USER_DETAIL } from '../../../queries/userQuery';
import Posts from '../../HomeScreen/components/Navbar/HomeContainer/Posts/Posts';
import PageNotFound from '../../../component/PageNotFound/PageNotFound';
import EmptyPost from '../../../component/EmptyPost/EmptyPost';
import HeroEdit from './HeroEdit/HeroEdit';
import OutsideClickHandler from 'react-outside-click-handler';


function Hero() {
    const { pathname } = window.location;
    const username = pathname.slice(1);
    
    const [openEdit, setOpenEdit] = useState(false)
    
    const { loading, error, data, refetch } = useQuery(GET_USER_DETAIL, {
        variables: { name: username }
    }, { fetchPolicy: "network-only" });

    const handleEditClick = () => {
        setOpenEdit(!openEdit);
    }

    return (
        <div className="homeContainer">
            <div className="homeContainer__sidebar">
                <div className="homeContainer__sidebar__container">
                    <Sidebar />
                    <Messenger />
                </div>
            </div>
            {
                loading ? <div>Loading...</div>
                : error ? <div>{error}</div>
                : data.user ?
                <div className="hero__wrap">
                    <div className="homeContainer__newsFeed">
                        <div className="hero__container">
                            <div className="hero__container__header">
                                <div className="hero__avatar">
                                    <Avatar user={data.user} bigPhoto={!!(pathname.length > 4)} />
                                </div>
                                <div className="hero__detail">
                                    <HeroTitle user={data.user} handleEditClick={handleEditClick}/>
                                    <HeroStats user={data.user} />
                                    <HeroInfo user={data.user} />
                                </div>
                            </div>
                            <div className="hero__container__navbar">
                                <HeroNavbar />
                            </div>
                        </div>
                        <div>
                            {
                                data.user.posts.length > 1 ?
                                <Posts posts={data.user.posts} 
                                    refetch={refetch} 
                                />
                                :
                                <EmptyPost />
                            }
                        </div>
                    </div>
                    {
                        openEdit &&
                        <aside className="hero__edit">
                            <OutsideClickHandler onOutsideClick={() => setOpenEdit(false)}>
                                <HeroEdit user={data.user} handleEditClick={handleEditClick} />
                            </OutsideClickHandler>
                        </aside>
                    }
                </div>    
                : 
                <div className="homeContainer__newsFeed">
                    <PageNotFound />
                </div>
            }
        </div>
    )
}

export default Hero
