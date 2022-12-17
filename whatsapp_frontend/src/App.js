  import React,  { useEffect, useState } from 'react';
  import './App.css';
  import Chat from './Chat';
  import Sidebar from './Sidebar';
  import Pusher from 'pusher-js';
  import axios from './axios.js';


  function App() {
    const [messages, setMessage] = useState([]);

    useEffect(function(){
      axios.get('/messages/sync').then(respose => {
          console.log(respose);
          setMessage(respose.data);

        });
    }, []);

    useEffect(function(){
      const pusher = new Pusher('01e3b5dd56f63912b996', {
        cluster: 'ap2'
      });

      const channel = pusher.subscribe('messages');
      channel.bind('inserted', function(newMessage) {  
        setMessage([...messages, newMessage])

        return ()=>{
          channel.unbind_all();
          channel.unsubscribe();
        };
        
      });
    },[messages]);

    

    console.log(messages);

    return (
      <div className="app">
        <div className="app__body">
          <Sidebar />
          <Chat messages={messages} />
        </div>
      </div>
    );
  }

  export default App;
    