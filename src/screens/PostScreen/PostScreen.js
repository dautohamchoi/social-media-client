import React, { useEffect } from 'react';
import Navbar from '../HomeScreen/components/Navbar/Navbar';
import PostContainer from './PostContainer/PostContainer';


function PostScreen(props) {
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            props.history.push('/login');
        }
    }, [token])

    return (
        <div className="HomeScreen">
            <Navbar />
            <main>
                <PostContainer />
            </main>
        </div>
    )
}

export default PostScreen
