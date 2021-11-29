import React, {useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import CustomButton from "../components/CustomButton";


const GetCourses = (props) =>{
    let [courses, setCourses] = useState([])
    let [courseCode, setCourseCode] = useState("")

    const location = useLocation();
    const { id } = location.state;

    useEffect(()=>{
        getCourse()
    },[]);

    let getCourse = async() =>{
        console.log(id)
        let response = await fetch("http://127.0.0.1:8000/api/get-courses?id=" + id);
        let data = await response.json();
        setCourses(data)

    }
    
    let addCourse = async() => {
       let response = await fetch("http://127.0.0.1:8000/api/create-course?id=" + courseCode + "&studentid="+ id);
       let data = await response.json()
       console.log(response)
       console.log(data)
       getCourse()
    }


    return(
        <div>
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold p-3">Your Courses</h1>
                <div className="flex inline-block align-baseline">
                    <CustomButton type="create" text="Join Course" function={addCourse}/>
                    <input
                        className="m-2 flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-purple-300"
                        type="text"
                        placeholder="Course Code"
                        onChange={event => setCourseCode(event.target.value)}  
                    />
                </div>
            </div>

            {
                courses.map(course =>(
                    <div className="p-1">
                    <div key={course.id} className="flex flex-col border border-purple-600 rounded-lg p-1 shadow hover:bg-purple-50">
                        <h1 className=" text-purple-600 text-2xl p-1 font-bold">{course.courseName}</h1>
                        <div className="justify-between p-1 sm:flex">
                            <p className="p-1 font-medium">{course.teacher} </p>
                            <Link to={'/assignments'} state={{ courseId: course.id, studentid: id}}>
                                <button id={course.id} className=" font-medium bg-purple-600 hover:bg-purple-500 p-1 text-white rounded-lg shadow-2">Show Assignments</button>
                            </Link>
                        </div>
                    </div>
                    </div>
                ))
            }
        </div> 
    )
}
export default GetCourses

// export default class GetCourses extends Component{

//     constructor(props){
//         super(props);

//         this.state ={
//             courses: []
//         };

//        const location = useLocation()
//        const { id } = location.state

       
//     }

//     async componentDidMount(){
        
//         const response = await fetch("http://127.0.0.1:8000/api/get-courses?id=" + localStorage.getItem('studentID'));
//         const data = await response.json();
//         this.setState({courses: data});
        
//     }
//     render(){

//         return (
//             <div>
//                 <h1 className="text-4xl font-bold p-3">Your Courses</h1>
//                 {
//                     this.state.courses.map(course =>(
//                         <div className="p-1">
//                         <div key={course.id} className="flex flex-col border border-purple-600 rounded-lg p-1 shadow hover:bg-purple-50">
//                             <h1 className=" text-purple-600 text-2xl p-1 font-bold">{course.courseName}</h1>
//                             <div className="justify-between p-1 sm:flex">
//                                 <p className="p-1 font-medium">{course.teacher} </p>
//                                 <Link to={'/assignments'} state={{ courseId: course.id}}>
//                                     <button id={course.id} className=" font-medium bg-purple-600 hover:bg-purple-500 p-1 text-white rounded-lg shadow-2">Show Assignments</button>
//                                 </Link>
//                             </div>
//                         </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         );
//     }
// }