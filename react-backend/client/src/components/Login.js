import React from "react";

const Login = props => (
<div className="login">
		<p id="test"></p>
	<form onSubmit = {props.getUsername}>
		<h4>Login</h4>

		<input id='login_input' type="text" name="name" placeholder="Username..."/>
		<button id="getData" className='btn'>Submit</button>
		<p id="login_issue"></p>
		<p id="test"></p>
		
	</form>
	
 </div>
);

export default Login