import React from 'react'
import './Friend.css'
import CloseIcon from '@material-ui/icons/Close';

function Friend({id, name, onClick}) {
    return (
        <div className='friend'>
        <div className='friend__content'>
        <h3 onClick={() => onClick()}>{name}</h3>
            <CloseIcon cursor='pointer' />
        </div>
           
            <hr />
        </div>
    )
}

export default Friend
