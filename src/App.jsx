import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous1',
      messages: [{
        id: 0,
        type: 'chat',
        username: 'Anonymous1',
        content: "I won't be impressed with technology until I can download food."
      }, {
        id: 1,
        type:'system',
        username: 'system',
        content: "Anonymous1 changed their name to nomnom."
      }]
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  setCurrentUser(user) {
    this.setState({
      currentUser: user
    });
  }

  addMessage(content) {
    const newMessage = {
      id: this.state.messages.length,
      type: 'chat',
      username: this.state.currentUser,
      content: content,

    }
    this.setState({
      messages: this.state.messages.concat(newMessage)
    });
    console.log(this.state.messages);
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar 
        setCurrentUser={this.setCurrentUser.bind(this)} 
        addMessage={this.addMessage.bind(this)}/>
      </div>
    );
  }
}
export default App;
