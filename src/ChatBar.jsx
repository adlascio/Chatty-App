import React, {Component} from 'react';


class ChatBar extends Component {
    render() {
        console.log("Rendering <ChatBar/>");
        return (
            <footer className="chatbar">
                <input 
                className="chatbar-username" 
                placeholder="Your Name (Optional)" 
                defaultValue='Anonymous1'
                onChange={(event) => {
                    this.props.setCurrentUser(event.target.value || "Anonymous1");
                }} />
                <input 
                className="chatbar-message" 
                placeholder="Type a message and hit ENTER"
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        if(!event.target.value) {
                            alert('Please insert a message.');
                        } else {
                            this.props.addMessage(event.target.value);
                        }
                    }
                }}
                />
            </footer>
        );
    }
}

export default ChatBar;