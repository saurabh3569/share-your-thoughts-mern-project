import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './postcard.css'
import {format} from 'timeago.js'
import { AuthContext } from '../../context/AuthContext'

const PostCard = ({post}) => {

  const { user } = useContext(AuthContext)

  const [newUser, setNewUser] = useState({})
    useEffect(() => {

        const fetchuser = async () => {
            await axios.get(`http://localhost:5000/api/user/profile?username=${user.username}`)
                .then(res => setNewUser(res.data))
        }
        fetchuser()

    }, [newUser])

  const likeHandler = async(id) => {
    await axios.put(`http://localhost:5000/api/post/like/${id}`,{username:user.username})
  }

  const DislikeHandler = async(id) => {
    await axios.put(`http://localhost:5000/api/post/dislike/${id}`,{username:user.username})
  }

  
  return (
    <div>
      <div className="card mx-5 my-3 postcard" style={{"width": "18rem"}}>
        <div className="card-body">
          <h5 className="card-title"><Link to={user.username === post.username ? `/profile` : `/profile/${post.username}`} className={newUser.followings?.includes(post.username) ? 'text-decoration-none text-warning' : 'text-decoration-none text-white'}>{post.username}</Link> 
          <span className='text-secondary'> {(format(post.createdAt))}</span></h5>
          <p className="card-text p-3">{post.desc}</p>
          <hr />
          <button className='btn postBtnLike w-50' onClick={()=>likeHandler(post._id)} ><i className={post.likes.includes(user.username) ? 'text-info fa-solid fa-thumbs-up' : "fa-solid fa-thumbs-up"}><span className="badge badge-light">{post.likes.length}</span></i></button>
          <button className='btn postBtnDisLike w-50' onClick={()=>DislikeHandler(post._id)}><i className={post.dislikes.includes(user.username) ? "fa-solid fa-thumbs-down text-danger" : "fa-solid fa-thumbs-down"}><span className="badge badge-light">{post.dislikes.length}</span></i></button>
        </div>
      </div>
    </div>
  )
}

export default PostCard
