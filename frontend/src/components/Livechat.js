import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom';
import '../css/Livechat.css'
import '../css/Dashboard.css'
import './Sidebar'
import Sidebar from './Sidebar';
import Header from './Header';

const LiveChat = (props)=>{
    let history = useHistory();
    if (Cookies.get('user') == '' || Cookies.get('user') == undefined) {
        history.push('/login')
    }
    const [toogle, setToogle] = useState(true)
    return(
        <div className='livechat-container'>
            <Header toogle={toogle} setToogle={setToogle} setLogin={props.setLogin} />
            <div className={`${toogle ? 'sidebar-open' : 'sidebar-close'}`}>
                <Sidebar section='livechat'/>
            </div>
            <div className={`${toogle ? 'main-container-open' : 'main-container-close'}`}>
                
            </div>
        </div>
    )
}

export default LiveChat