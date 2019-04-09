import React from "react";

const ClassList = props => (
	<div>

		<h2>Welcome back {props.username}. Here are the classes you are enrolled in: </h2>
		<p id="test"></p>
		<li>Web Development</li>
		<li>Computer Architecture</li>
		<li>Operating Systems</li>
	</div>
);

export default ClassList;