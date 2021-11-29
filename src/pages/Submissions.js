
import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import SubmissionTable from "../components/SubmissionTable";

const Submissions = () =>{

    const location = useLocation()
    const { assignment } = location.state

    let [submissions, setSubmissions] = useState([]);

    useEffect(()=>{
        getSubmissions()
    },[])

    let getSubmissions = async () => {

        let response = await fetch("http://127.0.0.1:8000/api/submission?assignment=" + assignment);
        if (response.ok){
            let data = await response.json();
            console.log(data)
            setSubmissions(data);
        }
    }

    

    return(
        <div>
            <SubmissionTable submissions={submissions}/>
        </div>
    )
}

export default Submissions