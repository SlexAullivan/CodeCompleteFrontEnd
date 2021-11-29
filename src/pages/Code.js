import React, { Component, useState, useEffect, onChange } from 'react'
import {useLocation} from "react-router-dom";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/python/python'
import { Controlled as CodeMirror } from 'react-codemirror2'
import { Resizable } from 're-resizable';



export default function Editor (props){
    

    const location = useLocation()
    const { assignmentID } = location.state
    const [value, setValue] = useState('')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [submission, setSubmission] = useState({})
    const [notes, setNotes] = useState("")

    useEffect(()=>{
        getSubmission()
    },[])

    let getSubmission= async () => {
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                student: location.state.studentid,
                assignment: location.state.assignmentId,
                source: value,
            }),
        };
        console.log(requestOptions);
        let response = await fetch("http://127.0.0.1:8000/api/createSubmission", requestOptions);
        let data = await response.json();
        // console.log(data['source'])
        setValue(data['source'])
        setNotes(data['notes'])
        setSubmission(data)
    }

    

    let executeCode = async () => {
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

        console.log(data['stderr'])
        console.log(data['stdout'])
        if(data['stderr'] != null){
            setOutput(data['stderr'])
        } else {
            setOutput(data['stdout'])
        }

    }
    const changeSubmission = (value) => {
        const newSource = value;
        setSubmission((prevState)=>{
            return{
                ...prevState,
                source: value
            };
        });
    };

    

    return(
        <div className=" p-3">
            
            <div className=" border border-purple-600 rounded-lg h-1/2">
                <div>
                    <div className="p-2 bg-gray-800  rounded-t-lg flex justify-between">
                        <p className=" p-2 font-semibold text-white">Editor</p>
                        <div>
                            {!submission.graded && <button onClick={() => getSubmission()} className="font-medium bg-blue-600 hover:bg-blue-500 p-1 text-white rounded-lg shadow-2">Save</button>}
                            <button onClick={() => executeCode()} className="font-medium bg-purple-600 hover:bg-purple-500 p-1 m-1 text-white rounded-lg shadow-2">Execute</button>
                        </div>
                    </div>
                </div>
                <Resizable>
                <CodeMirror
                    value={value}
                    onBeforeChange={(editor, data, value) => {
                        setValue(value);
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
            </div>
            
            <div className=" flex pt-2 h-1/2">
                
                <div className="flex flex-col w-1/2 border-2 border-purple-600 rounded-lg mr-2">
                    <h2 className="font-semibold p-2 bg-gray-800 text-white">Input</h2>
                    
                    <CodeMirror
                        value={input}
                        onBeforeChange={(editor, data, value) => {
                            setInput(value);
                        }}
                        options={{
                            lineWrapping: true,
                            lineNumbers: true,
                            theme: 'material'
                        }}
                    />
                    
                </div>
                
                
                <div className="flex flex-col w-1/2 border-2 border-purple-600 rounded-lg ml-2">    
                    <h2 className="font-semibold p-2 bg-gray-800 text-white">Output</h2>
                    <CodeMirror
                        value={output}
                        options={{
                            lineWrapping: true,
                            lineNumbers: true,
                            theme: 'material'
                        }}
                        
                    />
                </div>
                
            </div>
            {submission.notes !== "" && <div className="border-2 border-purple-600 rounded-lg mt-2">
            <h2 className="font-semibold p-2 bg-gray-800 text-white">Professor Notes</h2>
                    <CodeMirror
                        value={notes}
                        options={{
                            lineWrapping: true,
                            lineNumbers: true,
                            theme: 'material'
                        }}
                        
                    />
            </div>}
           
                
        </div>
    )
}
