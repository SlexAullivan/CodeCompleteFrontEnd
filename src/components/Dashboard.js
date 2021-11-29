import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import CustomButton from "./CustomButton"

const Dashboard = () =>{
    let [submissions, setSubmissions] = useState([])
    let [exists, setExists] = useState(false)

    useEffect(()=>{
        getSubmissions();
    },[]);

    let getSubmissions = async () =>{
        let response = await fetch("http://127.0.0.1:8000/api/dashboard?id=" + localStorage.getItem('AssignmentID'))
        let data = await response.json()
        console.log(data)
        if( response.ok){
            setSubmissions(data)
            setExists(true)
            
        } else{
            setExists(false)
        }
    };

    function clickPlayground(){

    }

    return(
        <>
            
            <div className="table-fixed m-2 ">
                {/* Table */}
                <table className="text-center w-full rounded-lg bg-purple-50 shadow">
                    {/* Tabel Head */}
                    <thead>
                        <tr className="rounded-lg">
                            <th className="w-1/4"> Student </th>
                            <th className="w-1/4"> Score </th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        { exists && submissions.map(submission =>(
                            <tr className="hover:bg-purple-200">
                                <td className="px-2 text-left">{submission.studentName}</td>
                                <td><button className="my-1 mx-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-500">{submission.points}</button></td>
                                {/* Button */}
                                <td className="text-right">
                                    <Link to={"/playground"} state={{submission: submission}}>
                                        <CustomButton type="standard" text="View code in PlayGround" function={clickPlayground}/>
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default Dashboard