// importing libs
import express from 'express';
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
import Pusher from 'pusher';
import cors from "cors";

// app config
// this contains all the configurations of our app
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1106235",
    key: "a1a222905725ce517ab2",
    secret: "98e32e0671451c3e264e",
    cluster: "ap2",
    useTLS: true
  });

// middleware
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());
app.use(cors());

// database 
// This contains all the database realted stuff like the connecting key and making the connection to our DB which is mongoDB
const connection_url = "mongodb+srv://admin:tWWUwGOiQyPoFQBg@cluster0.yf9nl.mongodb.net/wpdb?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection

db.once('open', () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changestream  = msgCollection.watch();
    const auth = db

    changestream.on('change', (change) => {
        console.log("change content:", change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted",{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("error triggering Pusher")
        }
    });
});

// API routes
// we make API's here
app.get("/" , (req,res) => res.status(200).send('hello world'));

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post("/messages/new", (req, res) => {
    const dbMessages = req.body

    Messages.create(dbMessages, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
        
    });
});            

//listener
app.listen(port,() => console.log('listerning on localhost:${port${port}'));
