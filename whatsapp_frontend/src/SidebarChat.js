import React, { useEffect } from 'react'
import "./SidebarChat.css"
import { Avatar  } from '@mui/material';
import db from './firebase';
import { Link } from 'react-router-dom';


function SidebarChat({ id, name, addNewChat }){

  useEffect(() => {
    if(id){}
  })

  const createChat = () => {
    const roomName = prompt('please enter name for chat');

    if(roomName) {
      db.collection('rooms').add({
        name: roomName,
      })
    }
  }
 
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}> 
        <div className='sidebarChat'>
          <Avatar></Avatar>
          <div className="sidebarChat__info">
              <h2>{name}</h2>
              <p>This is the Last message ....</p>
          </div>
        </div>
    </Link>
    
  ) : (
    <div onClick={createChat}
    className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  )
}

export default SidebarChat