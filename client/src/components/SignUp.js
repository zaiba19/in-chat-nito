import React from "react"; 

const SignUp = props => (
<div className= "SignUp">
<form onSubmit = {props.getUsername}>
		<h4>Sign Up</h4>

		<input id='login_input' type="text" name="name" placeholder="Enter New User"/>
		<button id="getData" className='SignUpbtn'>Submit</button>
</form> 

</div>
); 

export default SignUp; 