import React, {useState, useEffect} from "react";
import CustomButton from "./CustomButton";

const AssignmentModal = (props) => {
    let [assignmentName, setName] = useState("");
    let [description, setDescription] = useState("");
    let [points, setPoints] = useState();
    let [error, setError] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    function closeModal(){
        props.close();
    }

    useEffect(()=>{

        if (assignmentName === "" || description ===""){
            setError(true);
            setErrorMessage("Empty Field")
        } else {
            setError(false);
            setErrorMessage("")
        }
    },[assignmentName, description]);

  

    

    let createCourse = async() => {
        
        

        if (!error){

            const requestOptions={
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    pointsPossible: points,
                    description: description,
                    name: assignmentName,
                    course: props.course
                })
            }
            let response = await fetch("http://127.0.0.1:8000/api/assignment", requestOptions);
            console.log(response);
            closeModal();
            props.refresh();
            
        }
        // closeModal();
    }

    return(
        <div className="border-purple-600 relative mx-auto p-5 border w-3/4 shadow-lg rounded-lg bg-white">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <p className="font-bold text-l">Assignment Name:</p>
                    <input  type="text"
                            onChange={event => setName(event.target.value)}
                            maxLength="50"
                            placeholder="Assignment Name" 
                            className="m-2 flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-300 "/>
               </div>
               <div className="flex flex-col">
                <label className="align-middle font-bold text-l">Description:</label>
                    <input  type="text"
                            onChange={event => setDescription(event.target.value)}
                            placeholder="Description" 
                            className="m-2 flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-300 "/>
                </div>
                <div className="font-bold text-l">
                    Points Possible:
                </div>
                <div className="flex justify-between">
                    <input type="number"
                    onChange={event => setPoints(event.target.value)}
                    placeholder="points"
                    className="m-2 flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-300"/>
                    <CustomButton type="create" text="Create" function={createCourse}/>
                    <CustomButton type="delete" text="Exit" function={closeModal}/>
                </div>
                <div>{error && <p className=" rounded-lg w-full text-red-500 text-center m-1 p-2 bg-red-100"> Error:{errorMessage}</p>}</div>
            </div>
        </div>
    )

}
export default AssignmentModal