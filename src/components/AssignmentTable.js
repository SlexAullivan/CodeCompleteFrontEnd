import React, { useEffect, useState } from "react";
import AssignmentModal from "./AssignmentModal";
import EditModal from "./EditModal";
import {Link} from "react-router-dom";
import CustomButton from "./CustomButton";

const AssignmentTable = (props) => {

    let [assignments, setAssignments] = useState([]);
    let [show, setShow] = useState(false);
    let [editModal, toggleEditModal] = useState(false);
    let [assignmentNumber, setAssignmentNumber]=useState(0);
    

    useEffect(()=>{
        getAssignments()
    },[])

    let getAssignments = async () => {
        console.log(props.courseID);
        const requestOptions ={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                id: props.courseID
            })

        }
        let response = await fetch("http://127.0.0.1:8000/api/get-assignments", requestOptions);
        
        let data = await response.json();
        // console.log(response)
        if( response.ok){
            setAssignments(data);
        }
    }
    function showAssignmentModal(){
        setShow(!show);
    }
    function showEditModal(id){
        toggleEditModal(!editModal);
        setAssignmentNumber(id)
    }

    let deleteAssignment = async(assignmentId) => {
        const requestOptions ={
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                id: assignmentId
            })
        }
        let response = await fetch("http://127.0.0.1:8000/api/assignment",requestOptions);
        getAssignments();
    }




    return(
        <>
        <div>
            <div className="h-0">
                {show && <AssignmentModal  course={props.courseID} close={showAssignmentModal} refresh={getAssignments}/>}
                {editModal && <EditModal close={showEditModal} assignmentid={assignmentNumber} refresh={getAssignments}/> }
            </div>
            
        </div>
        <div className="table-fixed py-2 ">
            <table className="text-center w-full rounded-lg bg-purple-50 shadow">
                <thead className ="">
                    <tr className="rounded-lg text-purple-600">
                  
                        <th className="p-2  rounded-lg w-1/4"> Assignment Name </th>
                        <th className="p-2 w-1/4"> Points Possible </th>
                        <th className="text-right"> <CustomButton type="modify" text="Create Assignment" function={showAssignmentModal}/></th>
                    </tr>
                </thead>
                <tbody className="">
                    { assignments.map(assignment => (
                        <>
                        <tr className="hover:bg-purple-200">
                            
                            <td className="text-left px-2 ">{assignment.name}</td>
                            <td className= "">{assignment.pointsPossible}</td>
            
                            <td className="flex flex-row-reverse"> 
                                <Link to={'/submissions'} state={{assignment: assignment.id}} className="">
                                    <div className="my-1 mx-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-500"> Submissions</div> 
                                </Link>

                                <CustomButton type="standard" text="Edit" function={()=>showEditModal(assignment.id)}/>
                                <CustomButton type="delete" text="delete" function={()=>deleteAssignment(assignment.id)}/>
                            </td>
                        </tr>
                        </>
                    ))} 
                </tbody>
            </table>
        </div>
        </>
    )
}
export default AssignmentTable
