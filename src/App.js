import React from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/LoginScreen/RegisterScreen';
import PostScreen from './screens/PostScreen/PostScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import SavedProfileScreen from './screens/ProfileScreen/SavedProfileScreen';
import SuggestScreen from './screens/HomeScreen/SuggestScreen';


function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = localStorage.getItem('token');


  return (
    <div className="App">
      <Switch>
        <Route path="/accounts/login" >
          {
            token ? <Redirect to="/" /> : <LoginScreen /> 
          }
        </Route>
        <Route path="/accounts/register" >
          {
            token ? <Redirect to="/" /> : <RegisterScreen /> 
          }
        </Route>
        {
          userInfo &&
          <Route path="/posts/:id" exact component={PostScreen} />
        }  
        {
          userInfo &&
          <Route path={`/suggested`} exact component={SuggestScreen} />
        }
        {
          userInfo &&
          <Route path={`/${userInfo.name}/saved`} exact component={SavedProfileScreen} />
        }
        {
          userInfo &&
          <Route path="/:username" exact component={ProfileScreen} />
        }
        <Route path="/" exact >
          { token ? <HomeScreen /> : <Redirect to="/accounts/login" /> }
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
