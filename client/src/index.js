import React from 'react';
import ReactDOM from 'react-dom';
// import './App.css';
import App from './App';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import Login from './components/Login';
import SignUp from './components/SignUp';
import './index.css';
import ClassList from './components/ClassList';
import CourseCreate from './components/CourseCreate';

ReactDOM.render(
    <Router>
       <div>
       <nav>
          <ul id="navbar">
              <Link class="nav_item" id="text" to="/">Home</Link>
              <Link  class="nav_item" to="/login">Login</Link>
              <Link  class="nav_item" to="/signup">SignUp</Link>
              <Link  class="nav_item" to="/create">Create-Course</Link>
          </ul>
        </nav>

           <Route exact path="/" />
           <Route path="/login" component={Login}/>
           <Route path="/signup" component={SignUp}/>
           {/* <Route path="/courses" component={UserPage}/> */}
           <Route path="/create" component={CourseCreate}/>
           {/* <Route path="/chat" component={CourseChat}/> */}
       </div>
    </Router>,
    document.getElementById('root')
  )


//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




