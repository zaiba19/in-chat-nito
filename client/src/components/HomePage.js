import React from "react";

const HomePage = props => (
<div className="login">

	<form onSubmit={props.getUsername}>
		<h4>Login</h4>

		<input id='login_input' type="text" name="name" placeholder="Username..."/>
		<button type="submit" id="getData" className='btn'>Submit</button>
		<p id="login_error"></p>
	</form>
	

	<form className= "SignUponSubmit" onSubmit = {props.createUsername}>
		<h4>Sign Up</h4>

		<input id='login_input' type="text" name="new_username" placeholder="Enter New Username"/>
		<button id="getData" className='SignUpbtn'>Submit</button>
		<p id="signup_error"></p>	
	</form> 
</div>
	);

export default HomePage