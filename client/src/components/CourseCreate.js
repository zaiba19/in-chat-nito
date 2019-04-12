import React from "react";
import '../App.css';


const CourseCreate = () => (
    <form id="create_form">
        <h4>Create A Course</h4>
        <p>
		<input type="text" name="city" placeholder="School Code..."/>
        </p>

        <p>
		<input type="text" name="country" placeholder="Subject..."/>
        </p>

        <p>
        <input type="text" name="city" placeholder="Course Number..."/>
        </p>

        <p>
        <input type="text" name="city" placeholder="Course Section..."/>
        </p>

        <p>
        <input type="text" name="city" placeholder="Course Name..."/>
        </p>

		<button class="btn">Submit</button>
	</form>
	

);

export default CourseCreate