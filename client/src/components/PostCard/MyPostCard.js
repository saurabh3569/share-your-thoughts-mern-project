import axios from 'axios'
import React, { useContext } from 'react'
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext'
import './postcard.css'

const MyPostCard = ({post}) => {

  const {user} = useContext(AuthContext)

    const deleteHandler = (id) => {

        axios.delete(`http://localhost:5000/api/post/${id}`)

    }

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
          <button className='btn text-info position-absolute top-0 end-0' onClick={()=>deleteHandler(post._id)}><i className="fa-solid fa-trash"></i></button>
          <h5 className="card-title text-warning ">{post.username} 
          <span className='text-secondary'> {format(post.createdAt)}</span></h5>
          <p className="card-text p-3">{post.desc}</p>
          <hr />
          <button className='btn postBtnLike w-50' onClick={()=>likeHandler(post._id)} ><i className={post.likes.includes(user.username) ? 'text-info fa-solid fa-thumbs-up' : "fa-solid fa-thumbs-up"}><span className="badge badge-light">{post.likes.length}</span></i></button>
          <button className='btn postBtnDisLike w-50' onClick={()=>DislikeHandler(post._id)}><i className={post.dislikes.includes(user.username) ? "fa-solid fa-thumbs-down text-danger" : "fa-solid fa-thumbs-down"}><span className="badge badge-light">{post.dislikes.length}</span></i></button>
        </div>
      </div>
    </div>
  )
}

export default MyPostCard
