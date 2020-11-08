import React from 'react'
import Navbar from './components/Navbar/Navbar';
import HomeContainer from './components/Navbar/HomeContainer/HomeContainer';



function HomeScreen() {
    // const token = localStorage.getItem('token');

    // useEffect(() => {
    //     if (!token) {
    //         props.history.push('/accounts/login');
    //     }
    // }, [token])

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
