import React from "react";
import Button from 'react-bootstrap/Button';


const ClassList1 = props => (
	<div className="classContainer">
	<h2>Here are the courses you are enrolled in: </h2>

	<div className = "courses-classContainer">
	<center><Button className = "courses_btn" onClick={() => { props.switchToChat() }}>
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

// used for inline styling below -- specifically for jsx
let styles = {
    margin: '10px',
  };

//displays courses from "/courses"
function ClassList(props) { 
	return (
		 <div  >
			<h2>Here are the courses you are enrolled in: </h2>
			<div className = "courses_sec">
				{props.courses.map(course=>{
					return <Button className="courses_btn" onClick={() => { props.switchToChat(); props.handleRoomClick(course.courseID) }} key={course.courseID} >{course.courseName}</Button>
				})}
			</div>
		 </div>
	);
  }


export default ClassList;
