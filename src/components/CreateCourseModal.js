import React, { useState } from "react";



const CreateCourseModal = (props) => {

    let [courseName, setCourseName] = useState("")

   let createCourse = async() => {
       const requestOptions ={
           method:"POST",
           headers:{"Content-Type":"application/json"},
           body: JSON.stringify({
               teacher: localStorage.getItem("teacherID"),
               courseName: courseName
           })
       }
        let response = await fetch("http://127.0.0.1:8000/api/create-course", requestOptions);
        props.function();
        props.refresh();
       
   }

    return(
        <div className=" border-purple-600 relative top-10 mx-auto p-5 border w-3/4 shadow-lg rounded-lg bg-white"> 
            <h1 className="p-2 text-2xl text-purple-600 font-bold"> Create course </h1>
            <div className="flex">
                <input  type="text"
                    onChange={event => setCourseName(event.target.value)}
                    placeholder="Course Name" 
                    className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-300 "/>
            </div>
            <div className="flex flex-row-reverse m-2">
                <div onClick={() => createCourse()} className=" m-1 p-2 font-medium bg-purple-600 hover:bg-purple-500 text-white rounded-lg shadow-2"> Create </div>
                <div onClick={() => props.function()} className=" m-1 p-2 font-medium bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-2"> Exit </div>
            </div>
        </div>
    )

}
export default CreateCourseModal