import React from 'react';
import './App.css';
import './SignUp.css'
import HomePage from "./components/HomePage"
import ClassList from "./components/ClassList"
import Logout from "./components/Logout"
import Chat from "./components/Chat"
// import React, { Component } from 'react';


class App extends React.Component {

    state = {
      name: undefined,
      users: [],
      courses: []
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
        res.text().then(function(data) {
          console.log(data)
          let error = data;
          // gets element with id 'login_error" and prints the error on the screen
          document.getElementById('login_error').innerHTML = error;
        }); 
      }
      // if user exists, store username in state + fetch courses -> redirects to courses page
      if(res.status === 200){
        // setting the state causes the page to be rerendered 
        this.setState({ name : existing_username })

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
    res.text().then(data=> {
      console.log(data)
      let message = data;

      // if user exists -> print error message
      if(message === "Error: Username already exists."){
        // gets element with id 'signup_error" and prints the error message on the screen
        document.getElementById('signup_error').innerHTML = message;
      }
      
      // creates username, store new_username in state + fetch courses -> redirects to courses page
      if(message === "User has been created"){
        this.setState({ name : new_username })

        // fetch list of courses from backend route
        fetch('/courses')
        .then(res => res.json())
        .then(courses => this.setState({ courses }))
        .then(test => console.log(this.state.courses))
      }
    });
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
    courses: []
  })
}


   render() {
	
    if(this.state.name === undefined)
      return (
         <div className="wrapper">
        <HomePage getUsername={this.getUsername} createUsername={this.createUsername}/>
        {/* <Chat/> */}
        </div>


        );
    else
      return (
      <div>
          <Logout logOut={this.logOut}/>
          <ClassList jinfo={this.state.users} courses={this.state.courses}/>
      </div>
      );
  }
} 
export default App;
