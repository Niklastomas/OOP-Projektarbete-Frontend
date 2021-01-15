import React from 'react'
import './User.css'
import AddIcon from '@material-ui/icons/Add';

function User({id, name, onClick}) {
    return (
        <div className='user'>
        <div className='user__content'>
        <h3>{name}</h3>
            <AddIcon onClick={() => onClick()} fontSize='large' style={{color: 'green'}} cursor='pointer' />
        </div>
           
            <hr />
        </div>
    )
}

export default User
