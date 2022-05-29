import './App.css';

// first import the socket.io-client library 
// usinng the npm install socket.io-client   command 
// this will enable react application or any client to connect to the socket in the server
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:5000');
// connecting the socket to the server socket which is on port number 5000
// the client port number is 3000

// everytime when we refresh the page 
// it disconnects and reconnects

function App() {

  //creating a state 
  const [username , setUsername] = useState("")
  const [room , setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  

  const joinRoom = () => {
    // this will create the conenction between the rooms 
    // the client which wants to join'
    // join the room if the username and the room is not empty 
    if(username!=="" && room !==""){
        // sending the room id to the server 
        socket.emit('join_room' , room );
        
        setShowChat(true);
    }

  }
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
