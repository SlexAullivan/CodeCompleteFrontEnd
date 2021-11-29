import React,{ useEffect, useState} from "react";
import { Link } from "react-router-dom";


const SubmissionTable = (props) => {
    let[exists, setExists] = useState(false)

    useEffect(()=>{
        if (props.submissions){
            setExists(true);
        }
    },[])

        

    return(
        <>
            
            <div className="table-fixed m-2">
                <table className="text-center w-full bg-purple-50 shadow rounded-lg">
                    <thead className="">
                        <tr className="rounded-lg text-left">
                            <th className="text-purple-600 text-xl font-bold px-2 w-1/2">
                                Student
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { exists && props.submissions.map(submission =>(
                            <tr className="hover:bg-purple-200">
                                
                                <td className="px-2 text-left">{submission.studentName}</td>
                                <td>
                                    <div className="flex flex-row-reverse">
                                    <Link to={'/grade'} state = {{submission: submission}}>
                                        {!submission.graded &&
                                        <div className="my-1 mx-2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500">Grade</div>
                                        }
                                        {submission.graded && 
                                        <div className="my-1 mx-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-500">Graded</div>
                                        }
                                    </Link>
                                    </div>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SubmissionTable