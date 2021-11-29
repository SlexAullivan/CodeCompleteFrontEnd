import { PreviousMap } from "postcss";
import React, { Component, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import Dashboard from "../components/Dashboard";
import StudentAssignments from "../StudentViews/StudentAssignments";
const Assignments = () => {
    let [assignments, setAssignments] = useState([])
    let [showDash, toggleShowDash] = useState(false)

    const location = useLocation()
    const { courseId } = location.state

    useEffect(()=>{
        getAssignments()
    },[])

    let getAssignments = async () => {
        console.log(location.state.courseId)
        const requestOptions ={
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                id: location.state.courseId,
                student: location.state.studentid
            }),
        };
        console.log(requestOptions)
        let response = await fetch("http://127.0.0.1:8000/api/get-assignments", requestOptions);
        let data = await response.json();
        console.log(data)
        setAssignments(data)
        console.log(assignments)
    }
    function showDashboard(){
        toggleShowDash(!showDash)
    }
    function handleCodeClick(assignment){
        localStorage.setItem('assignmentID', assignment)
    }
    return(
        <div>
            <StudentAssignments assignments={assignments} studentid={location.state.studentid}/>
        </div>
    )


}

export default Assignments