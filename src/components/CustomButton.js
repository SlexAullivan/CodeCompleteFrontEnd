import React, { useEffect, useState } from "react";


const CustomButton = (props) => {

    let[deleteType, setDelete] = useState(false)
    let[modifyType, setModify] = useState(false)
    let[createType, setCreate] = useState(false)
    let[standardType, setStandard] = useState(false)



    useEffect(()=>{
        let type = props.type;
        switch(type) {
            case "delete":
                setDelete(true);
                break;
            case "modify":
                setModify(true);
                break;
            case "create":
                setCreate(true);
                break;
            default:
                setStandard(true);
                break;
          }
    },[])


    return(
        <div>
            <div>
            {deleteType && <button 
                onClick={()=>props.function()}
                className="my-1 mx-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-500">{props.text}</button>}
            </div>
            <div>
            {modifyType && <button 
                onClick={()=>props.function()}
                className="my-1 mx-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-500">{props.text}</button>}
            </div>
            <div className="align-middle">
            {createType && <button 
                onClick={()=>props.function()}
                className=" my-1 mx-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">{props.text}</button>}
            </div>
            <div>
            {standardType && <button 
                onClick={()=>props.function()}
                className="my-1 mx-2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500">{props.text}</button>}
            </div>
        </div>
    )
}

export default CustomButton