import React from 'react';
import './App.css';
import Login from "./components/Login"
import Todos from "./components/Todos"
import Logout from "./components/Logout"



class App extends React.Component {

    state = {
      id: undefined,
      name: undefined,
      token: undefined,
      fetchData: []
    }


  getUsername = async (e) => {
    e.preventDefault();
    const input_username = e.target.elements.name.value;
    
    const username = await fetch(`https://hunter-todo-api.herokuapp.com/user?username=${input_username}`);
    const data = await username.json();

      this.setState({
        id: data[0]["id"],
        name: data[0]["username"],
      });

        fetch('data.json')
        .then(res => { return res.json()})
            .then((data) => { 
              this.setState({
              fetchData: data});
        })



    var url = 'https://hunter-todo-api.herokuapp.com/auth';
    var auth_username = {"username" : input_username};

      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(auth_username),
      }).then(res => res.json())
      .then(response => {
        // const roken = JSON.stringify(response);
        // const parser = JSON.parse(roken);
        // var toke = parser.token;
        this.setState({
          token: true
        })        
      })

      
}


logOut = (e) => {
  e.preventDefault();
  this.setState({
    id: undefined,
    name: undefined,
    token: undefined,
    fetchData: []
  })
}



    render() {

    if(this.state.token === undefined)
      return (
         <div className="wrapper">
        <Login getUsername={this.getUsername}/>
        </div>
        );
    else
      return (
    <div>
        <Logout logOut={this.logOut}/>
          <Todos id={this.state.id} username={this.state.name} token={this.state.token}/>
      </div>
      );
  }
}
export default App;






