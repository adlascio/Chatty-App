Chatty App
=====================

A minimal web chatroom application that allows users to communicate with each other without having to register accounts. It uses React on the front end and websocket and webpack on the back end.

### Usage

- In the project root directory install all dependencies using the npm install command.

- In the chatty-server (https://github.com/adlascio/chatty-server) folder install all dependencies needed for websockets using the npm install command.

- Start the web servers in both the root directory and the chatty_server folder using npm start.

- Open http://localhost:3000 in your browser.

```
npm install
npm start
open http://localhost:3000
```

### Screenshot

!['Screenshot of Chatty App'](https://github.com/adlascio/Chatty-App/blob/master/docs/Screenshot%20from%202018-01-15%2011-31-37.png)



### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* UUID
* WS
