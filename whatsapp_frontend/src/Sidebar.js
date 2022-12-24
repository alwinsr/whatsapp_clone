import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {Avatar, IconButton } from '@mui/material';
import avatar from "./images/avatar.png";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';


function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsuscribe = db.collection("rooms").onSnapshot((snapshot) => 
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
      )
    );
    return () => {
      unsuscribe();
    }
  }, []);

  return (
    <div className='sidebar'>
        <div className="sidebar__header">
          <Avatar alt="Johnny Bravo" src={avatar}></Avatar>
            <div className="sidebar__headerRight">
                <IconButton>
                <DonutLargeIcon />
                </IconButton>
                <IconButton>
                  <ChatIcon />
                </IconButton>
                <IconButton>
                  <MoreVertIcon></MoreVertIcon>
                </IconButton>
            </div>
        </div>
        <div className="sidebar__search">
          <div className="sidebar__searchContainer">
            <SearchOutlinedIcon></SearchOutlinedIcon>
            <input type="text" placeholder="Search or start new chat"/>
          </div>
        </div>
        <div className="sidebar__chats">

          <SidebarChat addNewChat />
          {rooms.map( room => (
            <SidebarChat key={room.id} id={room.id}
            name={room.data.name} />
          ))}

           

        </div> 

        

    </div>
  )
}

export default Sidebar