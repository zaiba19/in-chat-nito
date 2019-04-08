import React from "react";

const Logout = props => (
	<form onSubmit = {props.logOut}>		
		<button id="log-btn">Logout</button>
	</form>
	

);

export default Logout