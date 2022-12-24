import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, {useEffect, useState} from 'react'
import {  useParams } from "react-router-dom";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css' 
import axios from "./axios";
import db from './firebase';
import { useStateValue } from './StateProvider';

function Chat({ messages }) {
  
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    if(roomId){
      db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
      setRoomName(snapshot.data().name))
    }
  },[roomId]);

  const sendMessage = async (e) =>{
    e.preventDefault();  //stops refresh

    await axios.post('/messages/new', {
      message: input,
      name: user.displayName,
      timestamp: "Just now! ",
      received: false,
      roomid: roomId,
    });
    
    setInput('');
  };

  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar></Avatar>
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
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
        {messages.map((message) => (
          <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}` } >
            <span className="chat__name">{message.name}</span>

            
            {message.message}
            
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
           

        ))}
      </div>

      <div className="chat__footer">
        <EmojiEmotionsIcon></EmojiEmotionsIcon>
        <form action="">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)}
            type="text" 
            placeholder='Type a message' 
          />
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicIcon></MicIcon>
      </div>
    </div>
  )
}

export default Chat;