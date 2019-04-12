import React from "react";
import Button from 'react-bootstrap/Button';


const ClassList = props => (
	<div>

		<h2>Welcome back {props.username}. Here are the courses you are enrolled in: </h2>
		<p id="test"></p>

	<center><Button variant="primary" size="lg" block>
Web Development	</Button> </center>
	&nbsp;&nbsp;&nbsp;

	<center><Button variant="primary" size="lg" block>
Computer Architecture	</Button> </center>
	&nbsp;&nbsp;&nbsp;

	<center><Button variant="primary" size="lg" block>
Spanish	</Button> </center>
	&nbsp;&nbsp;&nbsp;

	<center><Button variant="primary" size="lg" block>
Game Design	</Button> </center>
	&nbsp;&nbsp;&nbsp;
	
	<center><Button variant="primary" size="lg" block>
Music History	</Button> </center>
  </div>
);

export default ClassList;