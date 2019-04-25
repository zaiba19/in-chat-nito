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
      token: undefined,
      users: [],
      signup: undefined
    }

  // FUNCTION FOR LOGIN BUTTON -- NEEDS MODIFICATION
  getUsername = async(event) => {
    //this prevents the page from reloading when the button is clicked
    event.preventDefault();

    // gets userinput from login field and prints name in console
    const existing_username = event.target.elements.name.value;
    console.log(existing_username);

    // -- MODIFY THIS SECTION LATER --
    fetch(`/signup/${existing_username}`, {
      method:'GET',
      header: existing_username
    })
    .then(res => {
      res.text().then(data => {
        if(data === "Error: Username already exists."){
          this.setState({ name : existing_username })
          console.log(data)
        }
      });
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
  .then(function(res){
    res.text().then(function(data) {
      let error = data;
      document.getElementById('signup_error').innerHTML = error;
    });
  }) 
}

//THIS IS USERS
/*  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  } */
 
logOut = (e) => {
  e.preventDefault();
  this.setState({
    name: undefined,
    token: undefined,
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
          <ClassList jinfo={this.state.users}/>
      </div>
      );
  }
} 
export default App;
