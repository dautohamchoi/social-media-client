import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SuggestContainer from './components/Navbar/SuggestContainer/SuggestContainer'

function SuggestScreen() {
    return (
        <div className="HomeScreen">
            <Navbar />
            <main>
                <SuggestContainer />
            </main>
        </div>
    )
}

export default SuggestScreen
