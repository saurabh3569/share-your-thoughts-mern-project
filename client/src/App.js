import React, { useContext } from "react";
import './app.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home/Home'
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthContext } from "./context/AuthContext";
import MyPost from "./pages/MyPost.js/MyPost";
import OtherProfile from "./pages/Profile/OtherProfile";


function App() {

  const {user} = useContext(AuthContext)

  return (
    <div className="className">
    <Router>
      <Routes>
       <Route path='/'  element={user ? <Home /> : <Login />}/>
       <Route path='/profile'  element={user ? <Profile /> : <Login />}/>
       <Route path='/login'  element={<Login />}/>
       <Route path='/register'  element={ <Register /> }/>
       {user && <Route path={`/mypost/${user.username}`}  element={<MyPost />}/>}
       <Route path='/profile/:username'  element={user && <OtherProfile />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
