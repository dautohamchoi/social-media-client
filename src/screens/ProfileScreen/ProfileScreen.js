import React from 'react'
import Navbar from '../HomeScreen/components/Navbar/Navbar'
import Hero from './Hero/Hero'
import './ProfileScreen.css';

function ProfileScreen() {
    return (
        <div className="profileScreen">
            <Navbar />
            <div className="profile__hero">
                <Hero />
            </div>
        </div>
    )
}

export default ProfileScreen
