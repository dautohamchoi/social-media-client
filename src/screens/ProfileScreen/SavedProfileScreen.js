import React from 'react'
import Navbar from '../HomeScreen/components/Navbar/Navbar'
import HeroSaved from './Hero/HeroSaved';
import './ProfileScreen.css';

function SavedProfileScreen() {

    return (
        <div className="profileScreen">
            <Navbar />
            <div className="profile__hero">
                <HeroSaved />
            </div>
        </div>
    )
}

export default SavedProfileScreen;
