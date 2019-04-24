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
      fetchData: [],
      users: []
    }

  // function for Login button
  getUsername = async(event) => {
    event.preventDefault();

    // gets userinput and prints name in console
    const input_username = event.target.elements.name.value;
    console.log(input_username);

    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ 
        users: users,
        token: "somevalue"
      }));

    // var auth_url = '/users';
    // fetch(auth_url, {
    //   method: 'POST', // or 'PUT'
    //   body: input_username
    // }).then(response => {
    //   console.log(response.status)
    //   console.log(response)
    // })


}

createUsername = async(u) => {
 // u.preventDefault();
  var url = 'https://reqres.in/api/users';
  fetch(url, {
   
    method: "POST",
    headers: {
        name: "paul rudd",
        movies: ["I Love You Man", "Role Models"]
    }
  }).then(response => console.log(response))
    
		
}


logOut = (e) => {
  e.preventDefault();
  this.setState({
    name: undefined,
    token: undefined,
  })
}


    render() {

    if(this.state.token === undefined)
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
          <ClassList contacts={this.state.fetchData} jinfo={this.state.users}/>
      </div>
      );
  }
}
export default App;