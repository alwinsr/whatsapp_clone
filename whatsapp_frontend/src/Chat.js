import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css' 

function Chat() {
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar></Avatar>
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined></SearchOutlined>
          </IconButton>
          <IconButton>
            <AttachFile></AttachFile>
          </IconButton>
          <IconButton>
          <MoreVert ></MoreVert>
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className='chat__message'>
        
          <span className="chat__name">Sonny</span>

        This is a message
        
        <span className="chat__timestamp">
           {new Date().toUTCString()}
        </span>
        
        </p>

        <p className='chat__message'>
        
          <span className="chat__name">Sonny</span>

        This is a message
        
        <span className="chat__timestamp">
           {new Date().toUTCString()}
        </span>
        
        </p>

        <p className='chat__message chat__reciever' >
        
          <span className="chat__name">Sonny</span>

        This is a message
        
        <span className="chat__timestamp">
           {new Date().toUTCString()}
        </span>
        
        </p>
      </div>
      <div className="chat__footer">
        <EmojiEmotionsIcon></EmojiEmotionsIcon>
        <form action="">
          <input type="text" placeholder='Type a message' />
          <button type='submit'>Send a message</button>
        </form>
        <MicIcon></MicIcon>
      </div>
    </div>
  )
}

export default Chat