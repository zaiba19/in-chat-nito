import React from 'react';
import './App.css';
import './SignUp.css'
import HomePage from "./components/HomePage"
import ClassList from "./components/ClassList"
import Logout from "./components/Logout"
import Chat from "./components/Chat"
<<<<<<< HEAD
// import React, { Component } from 'react';
=======
//import React, { Component } from 'react';
>>>>>>> 70b02082736a2d48887efa9a7ee63f0858206565



class App extends React.Component {

    state = {
      name: undefined,
      token: undefined,
<<<<<<< HEAD
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
    
		
=======
	  users:[],
	  signup:undefined
    }

  getUsername = async (e) => {
    e.preventDefault();
    const input_username = e.target.elements.name.value;
	console.log(input_username);
	//THIS IS THE SIGNUP CODE
	fetch(`/signup/${input_username}`, {
		  method:'GET',
		  header: input_username
		})
	
		.then(res => console.log(res.text()))
		.then(signup => this.setState({ signup }));
	
     
>>>>>>> 70b02082736a2d48887efa9a7ee63f0858206565
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
<<<<<<< HEAD
        {/* <Chat/> */}
        </div>
=======
     
		/* <div className="App">
		
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div> */
	  <div className="App">
         <h1>Signup</h1>
        
        
      </div>  
        </div> 
>>>>>>> 70b02082736a2d48887efa9a7ee63f0858206565


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