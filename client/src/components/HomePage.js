import React from "react";

const HomePage = props => (
<div className="login">
		<p id="test"></p>
	<form onSubmit = {props.getUsername}>
		<h4>Login</h4>

		<input id='login_input' type="text" name="name" placeholder="Username..."/>
		<button id="getData" className='btn'>Submit</button>
		<p id="login_issue"></p>
		<p id="test"></p>	
	</form>


	<form className= "SignUponSubmit" onSubmit = {props.getUsername}>
		<h4>Sign Up</h4>

		<input id='login_input' type="text" name="name" placeholder="Enter New User"/>
		<button id="getData" className='SignUpbtn'>Submit</button>
	</form> 
</div>
	);

export default HomePage