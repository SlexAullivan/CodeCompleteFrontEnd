import React, {useState, useEffect} from "react";

const EditModal = (props) => {
    let [assignment, setAssignment] = useState({})
    let [description, setDescription] = useState("")
    let [points, setPoints] = useState()
    let [name, setName] = useState("")

    useEffect(()=>{
        getAssignment();
    },[]);

    let getAssignment = async() =>{
        let response = await fetch("http://127.0.0.1:8000/api/assignment?id=" + props.assignmentid)
        let data = await response.json();
        setDescription(data.description);
        setPoints(data.pointsPossible);
        setName(data.name);


    }
    let modify = async() => {
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                pointsPossible: points,
                description: description,
                name: name,
                id: props.assignmentid
            })
        }
        
        let response = await fetch("http://127.0.0.1:8000/api/assignment", requestOptions)
        props.refresh();
        props.close();
        console.log(response);
        
    }

    return(
        <div className=" border-purple-600 relative top-10 mx-auto p-5 border w-3/4 shadow-lg rounded-lg bg-white">
            <h1 className="font-bold text-2xl">Edit Assignment</h1>
            {/* Div for the inputs */}
            <div className="flex flex-col">
                <label className="font-bold">Name:</label>
                <input type="text"
                    className="m-2 flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                    onChange={event => setName(event.target.value)}
                    placeholder={name}
                    maxLength="50"/>
                
                <label className="font-bold">Description</label>
                <input type="text-area"
                    className="m-2 flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                    onChange={event => setDescription(event.target.value)}
                    placeholder={description}/>

                <label className="font-bold">Points Possible:</label>
                <input type="number"
                    className="m-2 flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                    onChange={event => setPoints(event.target.value)}
                    placeholder={points}/>
                

            </div>
            {/* Div for the buttons */}
            <div className="flex flex-row-reverse">
                <button 
                    onClick={() => props.close(0)}
                    className="mx-2 p-2 bg-red-600 rounded-lg text-white hover:bg-red-500"
                    >
                    close
                </button>
                <button
                    onClick={() => modify()}
                    className="mx-2 p-2 bg-green-600 rounded-lg text-white hover:bg-green-500" 
                    >
                    Modify Assignment
                </button>
            </div>
        </div>
    )



}

export default EditModal