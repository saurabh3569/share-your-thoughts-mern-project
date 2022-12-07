import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar.js/Navbar'
import { AuthContext } from '../../context/AuthContext'
import './profile.css'

const Profile = () => {

    const { user } = useContext(AuthContext)

    const [newUser, setNewUser] = useState({})
    const [switchhome, setSwitch] = useState("profile")

    useEffect(() => {

        const fetchuser = async () => {
            await axios.get(`http://localhost:5000/api/user/profile?username=${user.username}`)
                .then(res => setNewUser(res.data))
        }
        fetchuser()

    }, [newUser])

    const Followings = () => {
        setSwitch("followings")
    }

    const Followers = () => {
        setSwitch("followers")
    }

    const Back = () => {
        setSwitch("profile")
    }


    return (
        <div>
            <Navbar />
            {switchhome === "profile"
                && <div className='d-flex justify-content-center p-5'>
                    <div className="card">
                        <div className="card-body text-center">
                            <img src={newUser.ProfilePic ? newUser.ProfilePic : "https://i.ibb.co/rmC2JZM/noAvatar.png"} alt="avatar"
                                className="rounded-3 img-fluid" style={{ "width": "150px" }} />
                            <h5 className="my-3">{newUser.username}</h5>
                            <p className="text-muted mb-1">{newUser.email}</p>
                            <p className="btn text-muted mb-1" onClick={Followings}>Followings : {newUser.followings?.length}</p>
                            <p className="btn text-muted mb-1" onClick={Followers}>Followers : {newUser.followers?.length}</p>
                        </div>
                    </div>
                </div>
            }
            {switchhome === "followings" &&
                <>
                    <div className='container mt-5 w-50'>
                    <button className='btn btn-primary mb-2 ' onClick={Back}>Back</button>
                    {newUser.followings.length > 0 
                    ?<div className="list-group">
                            {newUser.followings.map((f) => (

                                <Link key={f} to={`/profile/${f}`} className="list-group-item list-group-item-action">{f}</Link>
                            ))}
                        </div>
                        : <h2>No Followings</h2>}
                    </div>
                </>
            }
            {switchhome === "followers" &&
                <>
                    <div className='container mt-5 w-50'>
                    <button className='btn btn-primary mb-2' onClick={Back}>Back</button>
                        {newUser.followers.length > 0 ?<div className="list-group">
                            {newUser.followers.map((f) => (

                                <Link key={f} to={`/profile/${f}`} className="list-group-item list-group-item-action">{f}</Link>
                            ))}
                        </div>
                        : <h2>No Followers</h2>}
                    </div>
                </>
            }
        </div>
    )
}

export default Profile
