import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom';
import Login from './Login'
import Dashboard from './Dashboard'
import Portfolio from './Portfolio'
import Livechat from './Livechat'
import Learning from './Learning'

const App = () => {
    let history = useHistory();
    const [isLogin, setLogin] = useState(false);
    return (
        <Router>
            <div className='App'>
                <Switch>
                    <Route path='/' exact><Redirect to='/login' /></Route>
                    <Route path='/login' exact component={() => <Login isLogin = {isLogin} setLogin={setLogin} />} />
                    <Route path='/dashboard' exact component={() => <Dashboard isLogin = {isLogin} setLogin={setLogin} />} />
                    <Route path='/portfolio' exact component={() => <Portfolio isLogin = {isLogin} setLogin={setLogin} />} />
                    <Route path='/livechat' exact component={() => <Livechat isLogin = {isLogin} setLogin={setLogin} />} />
                    <Route path='/learning' exact component={() => <Learning isLogin = {isLogin} setLogin={setLogin} />} />
                </Switch>
            </div>
        </Router>

    )
}

export default App