import './App.css';
import React from "react" 
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import GetCourses from './pages/GetCourses';
import Assignments from './pages/Assignments';
import Editor from './pages/Code';
import Teacher from './pages/Teacher';
import Submissions from './pages/Submissions';
import Grade from './pages/Grade';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import PlayGround from './pages/Playground';
function App() {
  return (
    <div className="">
    <div className="w-full bg-purple-600">
      <h1 className=" p-3 text-white text-3xl font-bold">CodeComplete</h1>
    </div>
    <div>
    <Router>
      <Routes>
        <Route 
          exact path='/'
          element={<Login/>}
          />
        <Route 
          path='/student' 
          element={<GetCourses/>}
          />
        <Route 
          path="/assignments" 
          element={<Assignments/>}
          />
        <Route 
          path="/code"
          element={<Editor/>}
        />
        <Route
          path="/teacher"
          element={<Teacher/>}/>
        <Route
          path="/submissions"
          element={<Submissions/>}/>
        <Route
          path="/grade"
          element={<Grade/>}/>
        <Route
          path="/dashboard"
          element={<Dashboard/>}/>
        <Route
          path="/playground"
          element={<PlayGround/>}
          />
      </Routes>
    </Router>
    </div>
    </div>
  );
}

export default App;
