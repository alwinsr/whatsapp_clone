
//importing
import express from 'express';

// app config
const app = express()
const port = process.env.PORT || 9000 

//middleware

//DB config

//????


//api route
app.get('/',(res, req) => {
    res.status(200).send("hello world")
} )

//listen
app.listen(port)