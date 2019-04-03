import React from "react";

// <p>Your id is {props.id}</p>
// 		<p>Your token is {props.token}</p>


const Todos = props => (
	<div className="todopage">

		<h2>Welcome back {props.username}. Here are the classes you are enrolled in: </h2>
		<p id="test"></p>
		<li>Web Development</li>
		<li>Computer Architecture</li>
		<li>Operating Systems</li>
	</div>
);

export default Todos;