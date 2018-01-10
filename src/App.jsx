import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  socket = new WebSocket("ws://localhost:3001"); 
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous'+ this.randomNumber(),
      messages: [],
      clientCount: 0
    };
    this.addMessage = this.addMessage.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.userColorMap = {};
  }
  
  randomNumber () {
    return Math.random().toString().substring(2,7);
  }

  componentDidMount() {
    this.socket.onmessage = (event) => {
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const data = JSON.parse(event.data);
      switch(data.type) {
        case "incomingMessage":
          // handle incoming message
          let sender = data.username;
          this.userColorMap[sender] = this.userColorMap[sender] || this.randomHexColor();
          data.color = this.userColorMap[sender];
          let newMessages = this.state.messages.concat(data);
          this.setState({messages: newMessages});
          break;
        case "incomingNotification":
          // handle incoming notification
          let oldUser = data.currentUser;
          let newUser = data.newUser;
          if(oldUser === 'Anonymous'){
            this.userColorMap[newUser] = this.randomHexColor();
          } else {
            this.userColorMap[newUser] = this.userColorMap[oldUser];
          }
          let newNotification = this.state.messages.concat(data);
          this.setState({messages: newNotification});
          break;
        case "clientUpdate":
        this.setState({
          clientCount: JSON.parse(event.data).numberOfClients
        });
        break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  randomHexColor() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#"+randomColor.toString();
  }

  setCurrentUser(user) {
    this.setState({
      currentUser: user
    });
  }

  addNotification(currentUser, newUser) {
    const newNotification = {
      currentUser: currentUser,
      newUser: newUser,
      type: 'postNotification',
      content: `${currentUser} changed their name to ${newUser}.`
    }
    this.socket.send(JSON.stringify(newNotification));
  }

  addMessage(content) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser,
      content: content,
      color: this.userColorMap[this.state.currentUser]
    }
    //sending the message to the Socket Server.
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <h2 className="navbar-clients">{this.state.clientCount} Client(s)</h2>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser} 
          setCurrentUser={this.setCurrentUser.bind(this)}
          addNotification={this.addNotification} 
          addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
