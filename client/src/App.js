import React from 'react';
import './App.css';
import './SignUp.css'
import Login from "./components/Login"
import ClassList from "./components/ClassList"
import Logout from "./components/Logout"
import SignUp from "./components/SignUp"



class App extends React.Component {

    state = {
      name: undefined,
      token: undefined,
    }

  getUsername = async (e) => {
    e.preventDefault();
    const input_username = e.target.elements.name.value;

      this.setState({
        name: input_username,
        token: true
      }) 
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
         <center><SignUp getUsername={this.getUsername}/></center>
        <Login getUsername={this.getUsername}/>
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