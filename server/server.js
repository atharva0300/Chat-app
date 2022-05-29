// this file is the endpoint to all the application 
const express = require('express');
const http = require('http');
const cors= require('cors');
// cors helps us to deal with cross origin resources 
const {Server} = require('socket.io');
// importing the socket io library
// importing the interface called server 
// which comes from the socketIO libray


const app = express();
app.use(cors());

// creating an http server 
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const io = new Server(server , {
    cors : {
        // mentioning set of settings for cors 
        origin : 'http://localhost:3000',
        // origin tells which server will be making the calls 
        // for the chat app ( we will run the react app on the port 3000 )
    
        methods : ['GET' , 'POST']
        // telling the cors, which methods will be used 
    }
});
// passign the server in the socketIO server

// when the client ( react app ) connects to the socket
io.on('connection'  , socket => {
    // callback function 
    console.log('New WS connection made...');

    // displayign the socket id 
    // the socket id is automatically created
    console.log('Socket ID : ' , socket.id);

    socket.on('join_room' , (data) => {
        // passing the room id to the client 
        socket.join(data);

        console.log('User with ID : ' , socket.id , ' joined the room : ' , data);
    })

    socket.on('send_message' , messageData => {
        socket.to(messageData.room).emit('receive_message' , messageData);
        // sending/emitting the message or the message object to the client
        // send the data only to the client which has that room id and not to others
    });


    // when the client disconnects 
    socket.on('disconnect' , () => {
        console.log('User Disconnected')
        console.log('Socket ID : ' , socket.id);
        
    })

})





server.listen(PORT, () => {
    console.log('The server is running on port number ' , PORT)
})