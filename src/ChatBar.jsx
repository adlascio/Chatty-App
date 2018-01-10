import React, {Component} from 'react';


class ChatBar extends Component {
    constructor(props){
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setUserOnBlur = this.setUserOnBlur.bind(this);
    }

    onKeyPress(event) {
        let message = event.target.value;  
        if (event.key === 'Enter') {
            if(!message) {
                alert('Please insert a message.');
            } else {
                this.props.addMessage(message);
                event.target.value = "";  
            }
        }
    }

    setUser(event) {
        if(event.key === 'Enter'){
            this.setUserOnBlur(event);
        }
    }

    setUserOnBlur(event) {
        let newUser = "";
        if (!event.target.value){
            newUser = 'Anonymous';    
        } else {
            newUser = event.target.value;
        }
        if(this.props.currentUser !== newUser){
            this.props.addNotification(this.props.currentUser, newUser);
            this.props.setCurrentUser(newUser || "Anonymous");
        }
    }
        
   
    render() {
        return (
            <footer className="chatbar">
                <input 
                className="chatbar-username" 
                placeholder="Your Name (Optional)" 
                defaultValue={this.props.currentUser}
                onKeyPress={this.setUser}
                onBlur={this.setUserOnBlur} />
                <input 
                    className="chatbar-message" 
                    placeholder="Type a message and hit ENTER"
                    onKeyPress={this.onKeyPress}
                />
            </footer>
        );
    }
}

export default ChatBar;