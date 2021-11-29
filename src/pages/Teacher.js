import React, { Component, useEffect, useState } from "react";
import Course from "../components/Course";
import CreateCourseModal from "../components/CreateCourseModal";
import CustomButton from "../components/CustomButton";
import { useLocation } from "react-router-dom";
const Teacher = () =>{

    const location = useLocation()
    let [courses, setCourses] = useState([])
    let [show, toggleShow] = useState(false)

    useEffect(() =>{
        getClasses();
    },[])

    let getClasses = async() => {
        let response = await fetch("http://127.0.0.1:8000/api/get-courses?teacherID=" + location.state.id);
        let data = await response.json();
        console.log(data)
        setCourses(data)
    }

    function showCreateCourseModal(){
        toggleShow(!show);
    }


    return(
        <div>
            
            <div className="flex justify-between">
            <h1 className="m-2 text-2xl font-bold"> Your Courses </h1>
            <CustomButton type="create" text="Create Course" function={showCreateCourseModal}/>
            </div>
            <div className="h-0">{ show && <CreateCourseModal function={showCreateCourseModal} refresh={getClasses}/> }</div>
            <div>
                { courses.map(course =>(
                    <Course courseName={course.courseName} courseID={course.id} code={course.code}refresh={getClasses}></Course>
                ))}
            </div>
        </div>
    )

}

export default Teacher