import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar.js/Navbar'
import MyPostCard from '../../components/PostCard/MyPostCard'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

const MyPost = () => {

    const {user} = useContext(AuthContext)

    const [Post,setPost] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/post/mypost/${user.username}`)
            .then(res => setPost(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })))
    }, [Post])

    return (
        <div>
            <Navbar />
            <div className="container">
            {Post.length > 0 ?
            <div className="row">
                 {Post.map((p) => (
                    <div key={p._id} className="col-sm-4">
                        <MyPostCard post={p} />
                    </div>
                ))}
            </div>
                : <h1 className='text-center mt-5 text-secondary'>You Post Nothing ...</h1>
            }
            </div>
        </div>
    )
}

export default MyPost
