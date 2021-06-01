import React from 'react'
import '../css/Popup.css'


const Popup = (props) => {

    return(
        <div className='popup-container'>
            <div className='popup-inner'>
                <div className='popup-header'>
                    <div className='title'>
                        <h3>{props.title}</h3>
                    </div>
                    <div className='close-btn'>
                        <button onClick={() => props.close(false)} class="ui red inverted icon button">
                            <i class="icon close large"></i>
                        </button>
                    </div>
                </div>
                <div className='popup-content'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}         



export default Popup