import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import CustomButton from "../components/CustomButton"
import Dashboard from "../components/Dashboard"


const StudentAssignments = (props) => {

    let [showDashBoard, setShowDashboard] = useState(false)


    let viewGrade = async() =>{

    }

    function loadAssignmentID(assignment){
        localStorage.setItem('AssignmentID', assignment)
    }
    function dash(){
        setShowDashboard(!showDashBoard)
    }
    function calculateGrade(points, pointsPossible){
        const grade = points/pointsPossible * 100
        
        return grade.toString() + "%"
    }

    return(
        <>
            <table className="m-2 table-fixed py-2 text-center w-full rounded-lg bg-purple-50 shadow">
                <thead>
                    <tr className="rounded-lg text-purple-600">
                        <th className="p-2 rounded-lg w-1/5"> Assignment Name</th>
                        <th className="w-1/5"> Points Possible </th>
                        <th className="w-1/5"> Grade </th>
                        <th className="w-1/5">Description</th>
                    </tr>
                </thead>
                <tbody>
                    { props.assignments.map( assignment => (
                        <>
                        <tr key={assignment.id} className="hover:bg-purple-200">
                            <td className="text-left">{assignment.name}</td>
                            <td>{assignment.pointsPossible}</td>
                            {assignment.graded && 
                                <td>
                                    <Link to={'/code'} state={{assignmentId: assignment.id, studentid: props.studentid}}>
                                        <CustomButton type="modify" text={calculateGrade(assignment.points, assignment.pointsPossible)} function={viewGrade}/>
                                    </Link>
                                </td> }
                            {!assignment.graded && <td> N/A </td>}
                            <td className="text-left p-2">{assignment.description}</td>
                            <td>
                                <div className="flex flex-col sm:flex-row-reverse">
                                    <Link to={'/dashboard'}>
                                        <CustomButton type="modify" text="Dashboard" function={()=>loadAssignmentID(assignment.id)}/>
                                    </Link>

                                    {!assignment.graded &&
                                    <Link to={'/code'} state={{ assignmentId: assignment.id, studentid: props.studentid }}>
                                        <CustomButton type="standard" text="Code" function={()=>loadAssignmentID(assignment.id)}/>
                                    </Link>}
                                </div>
                            </td>
                        </tr>
                        
                        </>
                    ))}
                    
                </tbody>
            </table>
        </>
    )
}

export default StudentAssignments