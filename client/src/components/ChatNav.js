import React from "react";

const ChatNav = props => (
    <div id= "log-btn">
        <form onSubmit = {props.backToCourses}>		
		<button >Courses</button>
	</form>
    <form onSubmit = {props.logOut}>		
        <button >Logout</button>
    </form>
    </div>
	
	

);

export default ChatNav