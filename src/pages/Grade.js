import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import CustomButton from "../components/CustomButton";

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/python/python'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { Resizable } from 're-resizable';



const Grade = (props) => {

    useEffect(()=>{
        setSource(submission.source)
        setPoints(submission.points)
        setNotes(submission.notes)
        setOnDashBoard(submission.onDashboard)
    },[])

    let [source, setSource] = useState("\n\n\n")
    let [input, setInput] = useState("\n\n\n")
    let [output, setOutput] = useState("\n\n\n")
    let [notes, setNotes] = useState("\n\n\n")
    let [points, setPoints] = useState()
    let [onDashBoard, setOnDashBoard] = useState()

    const location = useLocation()
    const { submission } = location.state

    let execute = async() =>{
        setOutput("RUNNING CODE")
        const requestOptions={
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                submission,
                input,
            })
        }
        console.log(requestOptions.body);
        let response = await fetch("http://127.0.0.1:8000/api/execute",requestOptions);
        let data = await response.json();

        if(data['stderr'] != null){
            setOutput(data['stderr'])
        } else {
            setOutput(data['stdout'])
        }
    }

    let grade = async() =>{

        submission.notes = notes;
        submission.points = points;

        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(submission)
        }

        let response = await fetch("http://127.0.0.1:8000/api/grade", requestOptions)
        console.log(response)

    }

    let push = async() =>{
        const requestOptions = {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                id: submission.assignment,
                submissionid: submission.id
            })
        }
        console.log(requestOptions)
        let response = await fetch("http://127.0.0.1:8000/api/dashboard",requestOptions)
        setOnDashBoard(true)

    }

    const changeSubmission = (value) => {
        submission.source = value;
    }


    
    return(
            
            <div className="p-3">

                
                <div className=" flex justify-between p-2 p-2 bg-gray-800 rounded-t-lg ">
                    <p className="p-2 font-semibold text-white">Now Grading: {submission.studentName}</p>
                    <CustomButton className="w-1/2"type="standard" text="execute" function={execute}/>
                </div>
                    <Resizable enable={{top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
                        <CodeMirror
                            value={source}
                            onBeforeChange={(editor, data, value) => {
                                setSource(value)
                                changeSubmission(value);
                            }}
                            options={{
                                lineWrapping: true,
                                lint: true,
                                mode: 'python',
                                theme: 'material',
                                lineNumbers: true
                            }}
                        />
                    </Resizable>
                    {/* Div for input and Output */}
                    <div className="p-2 p-2 bg-gray-800 ">
                    
                    </div>
                    <div className=" bg-gray-800 flex">
                        <div className=" p-1 w-1/2 bg-gray-800">
                        <div className="font-bold text-white">Input</div>
                        <Resizable enable={{top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
                        <CodeMirror
                            value={input}
                            onBeforeChange={(editor, data, value) => {
                                setInput(value);
                            }}
                            options={{
                                lineWrapping: true,
                                theme: 'material',
                                lineNumbers: true
                            }}
                        /> 
                        </Resizable>
                        </div>
                        <div className=" p-1 w-1/2 bg-gray-800">
                            <p className="font-bold text-white">Output</p>
                            <Resizable enable={{top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
                            <CodeMirror
                                value={output}
                                onBeforeChange={(editor, data, value) => {
                                }}
                                options={{
                                    lineWrapping: true,
                                    theme: 'material',
                                    lineNumbers: true
                                }}
                            />
                            </Resizable>
                        </div> 
                    </div> 
                    <div className="p-2 p-2 bg-gray-800">
                        <p className="p-2 font-semibold text-white">Notes</p>
                    </div>
                    <div className="flex"> 
                        <div className="w-3/4 p-2 bg-gray-800">
                        <Resizable enable={{top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}}>
                            <CodeMirror
                                value={notes}
                                onBeforeChange={(editor, data, value) => {
                                    setNotes(value);
                                }}
                                options={{
                                    lineWrapping: true,
                                    theme: 'material',
                                    lineNumbers: true
                                }}
                            />
                        </Resizable>
                        </div>
                        <div className="flex flex-col w-1/4 p-2 p-2 bg-gray-800">
                            <div className="flex">
                                <CustomButton type="create" text="Grade" function={grade}/>
                                {!onDashBoard && <CustomButton type="modify" text="Push to DashBoard" function={push}/>}
                                {onDashBoard && <button className="my-1 mx-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-500">Pushed</button>}
                            </div>
                            <input type="number"
                                onChange={event => setPoints(event.target.value)}
                                className="m-2 p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                                placeholder={submission.points}
                                max={submission.pointsPossible}
                                min="0"/>
                        </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-b-lg"></div>
                    
                    
                    
            </div>
           
            
    )
}

export default Grade