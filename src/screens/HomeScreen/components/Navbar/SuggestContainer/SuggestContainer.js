import React from 'react'
import '../HomeContainer/HomeContainer.css';
import Sidebar from '../HomeContainer/Sidebar/Sidebar';
import Suggestion from '../HomeContainer/Suggestion/Suggestion';
import './SuggestContainer.css';



function SuggestContainer() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div>
            <div className="homeContainer">
                <div className="homeContainer__sidebar">
                    <div className="homeContainer__sidebar__container">
                        <Sidebar />
                    </div>
                </div>
                <div className="suggestContainer__suggestion">
                    <Suggestion />
                </div>    
            </div>
        </div>            
    )
}

export default SuggestContainer;
