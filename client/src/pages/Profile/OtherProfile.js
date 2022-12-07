import  { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar.js/Navbar'
import { AuthContext } from '../../context/AuthContext'

const OtherProfile = () => {

    const username = useParams().username
    const {user} = useContext(AuthContext)

    const [newUser,setNewUser] = useState({})

    useEffect(()=>{
        
        const fetchuser = async() => {
            await axios.get(`http://localhost:5000/api/user/profile?username=${username}`)
            .then(res=> setNewUser(res.data))
        }
        fetchuser()

    },[newUser])

    const followHandler = async() => {
        
       await axios.put(`http://localhost:5000/api/user/follow/${username}`,{username:user.username})

    }

    const unfollowHandler = async() =>{
        await axios.put(`http://localhost:5000/api/user/unfollow/${username}`,{username:user.username})
    }


  return (
    <div>
      <Navbar />
            <div className='d-flex justify-content-center p-5'>
                <div className="card">
                    <div className="card-body text-center">
                        <img src={newUser.ProfilePic ? newUser.ProfilePic : "https://i.ibb.co/rmC2JZM/noAvatar.png"} alt="avatar"
                            className="rounded-3 img-fluid" style={{ "width": "150px" }} />
                        <h5 className="my-3">{newUser.username}</h5>
                        <p className="text-muted mb-1">{newUser.email}</p>
                        <p className="text-muted mb-1">Followings : {newUser.followings?.length}</p>
                        <p className="text-muted mb-1">Followers : {newUser.followers?.length}</p>
                         <button className='btn btn-primary' onClick={!newUser.followers?.includes(user.username) ? followHandler : unfollowHandler}>{!newUser.followers?.includes(user.username) ? "Follow" : "UnFollow"}</button>
                    </div>
                </div>
            </div>  
    </div>
  )
}

export default OtherProfile
