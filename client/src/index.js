import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker'; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ClassList from './components/ClassList';
import HomePage from './components/HomePage';
import CourseCreate from './components/CourseCreate';
import JoinCourse from './components/JoinCourse';
//import Chat from '../../public/Chat';


// ReactDOM.render(
//     <Router>
//        <div>
//        <nav>
//           <ul id="navbar">
//               <Link className="nav_item" id="text" to="/">Home</Link>
//               <Link  className="nav_item" to="/courses">Courses</Link>
//               {/* <Link  className="nav_item" to="/join">JoinCourse</Link>
//               <Link  className="nav_item" to="/create">CreateCourse</Link> */}
//               <Link  className="nav_item" to="/chat">Chat</Link>
//           </ul>
//         </nav>

//            <Route exact path="/" component={App}/>
//            <Route path="/courses" component={ClassList}/>
//            {/* <Route path="/join" component={JoinCourse}/> */}
//            {/* <Route path="/create" component={CourseCreate}/> */}
//            {/* <Route path="/chat"  component={Chat}/>  */}
//        </div>
//     </Router>,
//     document.getElementById('root')
//   )

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




