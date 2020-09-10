import React from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/LoginScreen/RegisterScreen';
import PostScreen from './screens/PostScreen/PostScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';


function App(props) {

  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact={true} component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/posts/:id" component={PostScreen} />
        <Route path="/:username" exact={true} component={ProfileScreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
