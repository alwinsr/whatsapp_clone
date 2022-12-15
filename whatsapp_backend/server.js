
//importing
import express from 'express';

// app config
const app=express()

//middleware

//DB config

//????


//api route
app.get('/',(res, req) => {
    res.status(200).send("hello world")
} )

//listen