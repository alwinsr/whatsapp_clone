            
    //importing
    import express from "express";
    import mongoose from "mongoose";
    import Messages from "./dbMessages.js";
    import Pusher from "pusher";
    import cors from "cors";
    

    mongoose.set("strictQuery", false);

    // app config
    const app = express();
    const port = process.env.PORT || 9000;

    const pusher = new Pusher({
        appId: "1525948",
        key: "01e3b5dd56f63912b996",
        secret: "2ff2dad6f7efc19d3552",
        cluster: "ap2",
        useTLS: true
      })

    //middleware
    app.use(express.json());

    //Allow request form any endpoint
    app.use(cors());

    /*app.use((req, res, next) => {
        res.setHeader("Accesss-Control-Allow-Orgin", "*");
        res.setHeader("Accesss-Control-Allow-Headers", "*");
        next();
    });*/

    //DB config
    const connection_url ="mongodb+srv://admin:dy4XcRJAo7aFNkdr@atlascluster.jmgfjfk.mongodb.net/?retryWrites=true&w=majority";

    const db = mongoose.connection;

    db.once('open', function(){
        console.log("DB isconnected");

        const msgCollection = db.collection("messagecontents");
        const changeStream = msgCollection.watch();

        changeStream.on('change', (change)=> {
            console.log('A change occured',change);

            if(change.operationType === 'insert'){
                const messageDetails = change.fullDocument;
                pusher.trigger('messages', 'inserted',
                    {
                        name: messageDetails.name,
                        message: messageDetails.message,
                        timestamp: messageDetails.timestamp,
                        received: messageDetails.received
                    }
                );
            }else{
                console.log('Error triggering Pusher');
            }
        });
    })



    mongoose.connect(connection_url);

    //????

    //api route
    //app.get("/", (req, res) => res.status(200).send("hello world"));

    app.get("/messages/sync", function (req, res) {
        Messages.find(function (err, data) {
            if (err) {
            res.status(500).send(err);
            } else {
            res.status(200).send(data);
            }
        });
    });

    app.post("/messages/new", function (req, res) {
        const dbMessage = req.body;

        Messages.create(dbMessage, function (err, data) {
            if (err) {
            res.status(500).send(err);
            } else {
            res.status(201).send(data);
            }
        });
    });

    //listen
    app.listen(port, () => console.log("Listening in localhost:", { port }));
