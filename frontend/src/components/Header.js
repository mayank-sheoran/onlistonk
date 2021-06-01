import React from 'react'
import Cookies from 'js-cookie'
import '../css/Header.css'
import { useHistory } from 'react-router-dom';

const Header = (props) => {

    let history = useHistory();
    const onLogout = (e) => {
        e.preventDefault()
        props.setLogin(false)
        Cookies.set('user', '')
        history.push('/login')
    }
    return (
        <div className='header'>
            <button onClick={() => props.setToogle(!props.toogle)} class="ui icon button mini red">
                <i class="bars icon big"></i>
            </button>
            <div className='logo'>
                <div>
                    <h1>Onli <span>Stonk</span></h1>
                </div>
            </div>
            <div className='ui inverted huge'>
                <button onClick={onLogout} class="ui button red">
                    Logout
                </button>
            </div>
        </div>
    )
}



export default Header