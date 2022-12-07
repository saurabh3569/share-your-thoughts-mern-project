import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar.js/Navbar'
import PostCard from '../../components/PostCard/PostCard'
import axios from 'axios'
import Share from '../../components/Share/Share'

const Home = () => {

    const [Post, setPost] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/post')
            .then(res => setPost(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })))
    }, [Post])


    return (
        <>
            <Navbar />
            <div className="container">
                <Share />
                <h3 className='mt-3 text-secondary'>All post From All Over World ......</h3>
                {Post.length > 0 ?
                <div className="row">
                    {Post.map((p)=>(
                        <div key={p._id} className="col-sm-4">
                        <PostCard post={p}/>
                    </div>
                        ))}
                </div>
                : <h1 className='text-center mt-5 text-secondary'>No one Post Anything ...</h1>
                }
            </div>
        </>
    )
}

export default Home
