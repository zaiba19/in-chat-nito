import React from "react";
import Button from 'react-bootstrap/Button';


const ClassList = props => (
<div>

		<h2>&nbsp;&nbsp;&nbsp;Here are the courses you are enrolled in: </h2>
		&nbsp;&nbsp;&nbsp;

	<div className = "courses_sec">
	<center><Button className = "courses_btn" >
Web Development	</Button> </center>
	&nbsp;&nbsp;&nbsp;

	<center><Button className = "courses_btn" variant="primary" size="lg" >
Computer Architecture	</Button> </center>
	&nbsp;&nbsp;&nbsp;

	<center><Button className = "courses_btn" variant="primary" size="lg" >
Spanish	</Button> </center>
	&nbsp;&nbsp;&nbsp;

	<center><Button className = "courses_btn" variant="primary" size="lg" >
Game Design	</Button> </center>
	&nbsp;&nbsp;&nbsp;
	
	<center><Button className = "courses_btn" variant="primary" size="lg" >
Music History	</Button> </center>
	</div>
  </div>


);


// displays users from "/users"
// function ClassList(props) { 
// 	return (
// 		 <div>{props.jinfo.map(user=>{
// 			 return <h2 key={user.id}>{user.username}</h2>
// 		 })}
// 			 {/* <h1>hello</h1> */}
// 		 </div>
// 	);
//   }


export default ClassList;
