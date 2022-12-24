import React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import "./Login.css";
import Img from './images/27473336.jpg';
import { auth, provider } from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';

function Login(){
  const [{}, dispatch] = useStateValue();

  const signIn = ()=>{
    auth.signInWithPopup(provider).then(result =>{
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      })
    })
    .catch((error)=> alert(error.message));
  };
  
  

  return (
    
    <div className="login">
      <div className="login_container">
        <img src={Img} alt="" />
        <div className="login text">
          <h1>Sign in to Whatsapp</h1>
        </div>

        <Button onClick={signIn}> <GoogleIcon/>  <p>Sign in with Google</p></Button>
      </div>
    </div>
        

  )
}

export default Login;
