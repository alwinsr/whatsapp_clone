import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios.js";
import Login from "./Login.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  const [messages, setMessage] = useState([]);
  const [user, setUser] = useState(null);
  

  useEffect(function () {
    axios.get("/messages/sync").then((respose) => {
      console.log(respose);
      setMessage(respose.data);
    });
  }, []);

  useEffect(
    function () {
      const pusher = new Pusher("01e3b5dd56f63912b996", {
        cluster: "ap2",
      });

      const channel = pusher.subscribe("messages");
      channel.bind("inserted", function (newMessage) {
        setMessage([...messages, newMessage]);

        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      });
    },
    [messages]
  );

  console.log(messages);

  return (
    <div className="app">

      {!user ? (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
        
      ): (
        <div className="app__body">
          <BrowserRouter>
            <Sidebar />
            <Routes>
              
              <Route path="/" element= {<h1>Home</h1>} >
              </Route>
              <Route path="/rooms/:roomId" element={[<Chat messages={messages} />]}/>
            </Routes>
          </BrowserRouter>
        </div>
      
      )}
      </div>

      
  );
}

export default App;
