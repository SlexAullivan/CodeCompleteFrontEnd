import React, {useState, useEffect} from "react";
import { Navigate, Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";


const Login = () =>{

    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [redirectStudent, setRedirectStudent] = useState(false)
    let [redirectTeacher, setRedirectTeacher] = useState(false)
    let [id, setid] = useState(0);

    useEffect(()=>{
        setRedirectStudent(false)
        setRedirectTeacher(false)
    },[])

    let validate = async() =>{
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                username: username,
                password: password,

            })
        }

        let response = await fetch("http://127.0.0.1:8000/api/validate", requestOptions);
        let data = await response.json()
        
        if (response.ok){
            console.log(data)
            if (data.Success == "Student"){
                console.log("student")
                setid(data.student)
                setRedirectStudent(true);  
                localStorage.setItem('studentID', data.student)
            }else{
                console.log("teacher");
                setid(data.teacher)
                setRedirectTeacher(true);
                localStorage.setItem('teacherID', data.teacher)

            }
        } else {
            console.log("Failure")
        }

    }

    return(

        <div className="flex flex-col justify-center">
            <input
                onChange={event => setUsername(event.target.value)}
                type="text"
                placeholder="Username"
                required={true}
                />
            <input
                onChange={event => setPassword(event.target.value)}
                type="text"
                placeholder="Password"
                required={true}
            />
            <CustomButton type="standard" text="Login" function={validate}/>
            {redirectStudent && <Navigate push to="/student" state={{id:id}}/>}
            {redirectTeacher && <Navigate push to="/teacher"state ={{id:id}}/>}
        </div>
    )

}

export default Login