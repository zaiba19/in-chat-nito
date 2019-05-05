import React from "react";
import "../App.css";

const HomePage = props => (
	<div className="container">
		<h3 className="title">IN CHAT NITO</h3>
		<div className="row">

			<div className="col-xs-5 image-container"></div>

			<div className="col-xs-7 form-container">
				<form onSubmit={props.getUsername}>
					<h4>Login</h4>
					<input id='login_input' type="text" name="name" className="login-button" placeholder="ENTER USERNAME"/>
					<button type="submit" id="getData" className='btn'>Submit</button>
					<p id="login_error"></p>
				</form>
				<form className= "SignUponSubmit" onSubmit = {props.createUsername}>
					<h4>Sign Up</h4>
					<input id='login_input' type="text" name="new_username" className="login-button" placeholder="ENTER NEW USERNAME"/>
					<button id="getData" className='SignUpbtn'>Submit</button>
					<p id="signup_error"></p>
				</form>
			</div>

		</div>

	</div>
	);

export default HomePage
