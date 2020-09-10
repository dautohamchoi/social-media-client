import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import HomeContainer from './components/Navbar/HomeContainer/HomeContainer';



function HomeScreen(props) {
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
                <HomeContainer />
            </main>
        </div>
    )
}

export default HomeScreen
