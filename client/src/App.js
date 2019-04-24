import React from 'react';
import './App.css';
import './SignUp.css'
import HomePage from "./components/HomePage"
import ClassList from "./components/ClassList"
import Logout from "./components/Logout"
import Chat from "./components/Chat"
//import React, { Component } from 'react';



class App extends React.Component {

    state = {
      name: undefined,
      token: undefined,
	  users:[],
	  signup:undefined
    }

  getUsername = async (e) => {
    e.preventDefault();
    const input_username = e.target.elements.name.value;
	console.log(input_username);
	//THIS IS THE SIGNUP CODE
	/*fetch('/signup/${input_username}', {
		  method:'GET',
		  header: input_username
		})
	
		.then(res => console.log(res.text()))
		.then(signup => this.setState({ signup }));
	*/
     
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
	
    if(this.state.token === undefined)
      return (
         <div className="wrapper">
        <HomePage getUsername={this.getUsername} createUsername={this.createUsername}/>
     
		/* <div className="App">
		
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
	  <div className="App">
         <h1>Signup</h1>
        
        
      </div>  */
        </div> 


        );
    else
      return (
      <div>
          <Logout logOut={this.logOut}/>
          <ClassList username={this.state.name} token={this.state.token}/>
      </div>
      );
  }
} 
export default App;