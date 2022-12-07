import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Share = () => {

  const [post,setPost] = useState({
    desc : ""
  })

  const { user } =  useContext(AuthContext)


  
    const submitHandler = async(e) => {
      e.preventDefault()

      if(post.desc.length === 0) return alert("Pls type something ...")

      const res = await axios.post("http://localhost:5000/api/post",{
        desc:post.desc,
        username : user.username
      }).then(
        alert("post created Successfully ..."),
        post.desc = ""
      )

    }


  const handleChange = (e) => {
   const { name , value } = e.target
   setPost({
    ...post,
    [name] : value
  })
}


  return (
    <div className='container'>
      <form onSubmit={submitHandler}>
        <div className="form-group mt-5">
          <textarea name='desc' placeholder='write something ...' className="form-control" rows="3" value={post.desc} onChange={handleChange}></textarea>
        </div>
        <button className='btn btn-primary mt-2' type='submit'>Post</button>
      </form>
    </div>
  )
}

export default Share
