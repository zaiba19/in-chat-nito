import React from "react";

const ChatNav = props => (
    
    // <div id= "log-btn">
    //     <form onSubmit = {props.backToCourses}>		
	// 	<button className='btn'>Courses</button>
	// </form>
    // <form onSubmit = {props.logOut}>		
    //     <button className='btn'>Logout</button>
    // </form>
    // </div>

     <div className='navbtn' >
     <form >		
        <button className='navbtn' onClick = {props.backToCourses} >Courses</button>
        <button className='navbtn' onClick = {props.logOut} >Logout</button>
    </form>
        </div> 

    

/* <div className="container">
<div className="row">

<h3 className="title">Chat Page</h3>

    <div className="col-xs-5 image-container"></div>

    <div className="col-xs-7 form-container-nav">
        <form onSubmit = {props.backToCourses}>		
	 	    <button className='navbtn'>Courses</button>
	    </form>
        <form onSubmit = {props.logOut}>		
            <button className='navbtn'>Logout</button>
      </form>
    </div>

</div>

</div> */
);

export default ChatNav