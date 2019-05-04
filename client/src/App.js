import React from 'react';
import './App.css';
import './SignUp.css'
import HomePage from "./components/HomePage"
import ClassList from "./components/ClassList"
import Logout from "./components/Logout"
import MessageForm from "./components/MessageForm.jsx";
import MessageList from "./components/MessageList.jsx";
import UsersList from "./components/UsersList.jsx";
// import React, { Component } from 'react';


import io from "socket.io-client"; 
const socket = io('/')


class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      name: undefined,
      activeChat: false,
      users: [],
      courses: [],
      messages: [], 
      text: '', 
      //name: ''
    }; 
  }

  componentDidMount(){
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({users}) => this.chatUpdate(users));
  }

  messageReceive(message) {
    const messages = [...this.state.messages, message];
    this.setState({messages})
  }

  chatUpdate(users) {
    this.setState({users});
  }

  handleUserSubmit(name) {
    if(name) {
        this.setState({name});
        socket.emit('join', name);
    }
}

  handleMessageSubmit(message) {
    if (message.text) {
        const messages = [...this.state.messages, message];
        this.setState({messages});
        socket.emit('message', message);
    }
  }

  // FUNCTION FOR LOGIN BUTTON -- NEEDS MODIFICATION
  getUsername = async(event) => {
    //this prevents the page from reloading when the button is clicked
    event.preventDefault();

    // gets userinput from login field and prints name in console
    const existing_username = event.target.elements.name.value;
    console.log(existing_username);

    fetch(`/login/${existing_username}`, {
      method:'GET',
      header: existing_username
    })
    .then(res => {
      console.log(res.status)
      // if user does not exists, print error message on screen
      if(res.status === 404){
        //this.setState({ name : existing_username })
          let error = "Error: no user found";
          // gets element with id 'login_error" and prints the error on the screen
          document.getElementById('login_error').innerHTML = error;
        }; 
      
      // if user exists, store username in state + fetch courses -> redirects to courses page
      if(res.status === 200){
        // setting the state causes the page to be rerendered 
        this.setState({ name : existing_username })
        this.handleUserSubmit(existing_username);
        console.log(this.state.users);

        // fetch list of courses from backend route
        fetch('/courses')
        .then(res => res.json())
        .then(courses => this.setState({ courses }))
        .then(test => console.log(this.state.courses))
      }
    }) 
  }


// FUNCTION FOR SIGNUP BUTTON
createUsername = async(u) => {
  //this prevents the page from reloading when the button is clicked
  u.preventDefault();

  // gets userinput from signup field and prints name in console
  const new_username = u.target.elements.new_username.value;
  console.log(new_username);

  // checks if the new username already exists
  fetch(`/signup/${new_username}`, {
    method:'GET',
    header: new_username
  })
  .then(res=>{
    console.log(res.status)

    if(res.status === 404){
      let message = "Error: Username already exists.";
      // if user exists -> print error message
        // gets element with id 'signup_error" and prints the error message on the screen
        document.getElementById('signup_error').innerHTML = message;
      
    }

    if(res.status === 200){
      let message = "User has been created";

      // fetch list of courses from backend route
      fetch('/courses')
      .then(res => res.json())
      .then(courses => this.setState({ courses }))
      .then(test => console.log(this.state.courses))

         // creates username, store new_username in state + fetch courses -> redirects to courses page
        this.setState({ name : new_username })

        
      }
    })

  }



//THIS IS FOR USERS -- via users route in backend
// NOTE : componentDidMount() is invoked immediately after a component is mounted
/*  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  } */
 
logOut = (e) => {
  e.preventDefault();
  this.setState({
    name: undefined,
    courses: [],
    activeChat : false,
  })
}

switchToChat = (w) => {
  //w.preventDefault();
  this.setState({
    activeChat : true,
  })
}


// let result = condition ? value1 : value2;
// render() {
//   return this.state.name === undefined ? this.renderHomePage() : this.renderChat();
// }

renderHomePage(){
  return(
    <div>
  <HomePage getUsername={this.getUsername} createUsername={this.createUsername}/>
  
      </div>
  )
}

renderChat() {
  return (
    <div>
      <h4>Chat Page</h4>
    <Logout logOut={this.logOut}/>
      <UsersList
        users={this.state.users}
        name = {this.state.name}
        />
    <div className = "MessageWrapper">
      <MessageList
          messages={this.state.messages}
          name = {this.state.name}
          last = {this.state.messages[this.state.messages.length-2]}
      />
      <MessageForm
          onMessageSubmit={message => this.handleMessageSubmit(message)}
          name={this.state.name}
      />
    </div>      
    </div>
  );
}

renderCoursePage() {
  // console.log(this.state)
  return (
    <div>  
    <Logout logOut={this.logOut}/>
    <ClassList switchToChat={this.switchToChat} courses={this.state.courses}/>
    </div>
  );
}

render(){
  if(this.state.name === undefined && this.state.activeChat === false)
    return this.renderHomePage()
  else if(this.state.name !== undefined && this.state.activeChat === false)
    return this.renderCoursePage()
  else
    return this.renderChat()
}






  //  render() {
  //   if(this.state.name === undefined)
  //     return (
  //        <div className="wrapper">
  //       <HomePage getUsername={this.getUsername} createUsername={this.createUsername}/>
  //       {/* <Chat/> */}
  //       </div>


  //       );
  //   else
  //     return (
  //     <div>
  //         <Logout logOut={this.logOut}/>
  //         <ClassList jinfo={this.state.users} courses={this.state.courses}/>
  //     </div>
  //     );
  // }
} 
//    render() {    
//      return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
//   }


// renderLayout(){
//   return(
//     <div className={styles.MessageWrapper}>
//       <MessageList
//           messages={this.state.messages}
//           name = {this.state.name}
//           last = {this.state.messages[this.state.messages.length-2]}
//       />
//       <MessageForm
//           onMessageSubmit={message => this.handleMessageSubmit(message)}
//           name={this.state.name}
//       />
//     </div>      

//   ); 
// }
export default App;
