import React, { Component, useState, useEffect, onChange } from 'react'
import AssignmentTable from './AssignmentTable';



export default function Course(props){
    
    let [show, toggleShow] = useState(false)
    
    function handleShowAssignments(){
        toggleShow(!show);
    }
    let deleteCourse = async() => {
        const requestOptions={
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                id: props.courseID
            })
        }
        let response = await fetch("http://127.0.0.1:8000/api/create-course",requestOptions)
        props.refresh()

    }

    

    return(
        <div className="flex-col m-2">
            
            <div className="justify-between border border-purple-600 rounded-lg shadow sm:flex">
                <h1 className="text-purple-600 text-2xl  m-2 p-1 font-bold text-center sm:text-left">{props.courseName}</h1>
                <div className="flex ">
                    <div 
                        onClick={() => handleShowAssignments()}
                        className="font-medium bg-purple-600 hover:bg-purple-500  p-2 m-1 mt-3 text-white rounded-lg shadow-2 flex-grow text-center sm:flex-grow-0 "> 
                        View Assignments 
                    </div>
                    <div
                        onClick={()=>deleteCourse()}
                        className="font-medium bg-red-600 hover:bg-red-500  p-2 m-1 mt-3 text-white rounded-lg shadow-2 flex-grow text-center sm:flex-grow-0 ">
                        Delete
                    </div>
                    <div className="font-medium bg-purple-600 hover:bg-purple-500  p-2 m-1 mt-3 text-white rounded-lg shadow-2 flex-grow text-center sm:flex-grow-0 ">
                        Add Code: {props.code}
                    </div>
                </div>
            </div>
            <div>{show && <AssignmentTable className="p-2" courseID={props.courseID} refresh={props.refresh}/>}</div>
        </div>
    )
    
}