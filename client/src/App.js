import React from 'react';
import './App.css';
import './SignUp.css'
import HomePage from "./components/HomePage"
import ClassList from "./components/ClassList"
import Logout from "./components/Logout"




class App extends React.Component {

    state = {
      name: undefined,
      token: undefined,
    }

  getUsername = async(event) => {
    event.preventDefault();

    // gets userinput and prints name in console
    const input_username = event.target.elements.name.value;
    console.log(input_username);

    // reads local json file and prints content to console
    var customData = require('./sampledata.json');  
    //console.log(customData)

    // prints contents of the student "william" - courses + token
    //console.log(customData.students.william)


      var data = customData.find(input_username);
      if(data) {
          console.log('found');
      }
 


      // this.setState({
      //   name: input_username,
      //   token: undefined
      // }) 
  

}

// createUsername = async(u) => {
//   u.preventDefault();
//   const new_username = u.target.elements.name.value;
//   console.log(new_username);
// }


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
        <HomePage getUsername={this.getUsername}/>
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