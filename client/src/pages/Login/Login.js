import React, { useContext, useState } from 'react'
import {  Link , useNavigate } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from '../../context/AuthContext';

const Login = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: '',
    })

    const { dispatch } = useContext(AuthContext)
    

    const submitHandler = (e) => {
        e.preventDefault()

        if(!data.username || !data.password) return alert("please enter email and passowrd")

        loginCall(
            { username: data.username, password: data.password },
            dispatch
          ).then(navigate('/'))
        
    }

    const handleChange = (e) =>{
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    
    return (
        <div className=''>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ "borderRadius": "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <form className="mb-md-5 mt-md-4 pb-5" onSubmit={submitHandler}>

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div className="form-outline form-white mb-4">
                                            <input placeholder='Username' name='username' value={data.username} type="username" className="form-control form-control-lg" onChange={handleChange}/>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input placeholder='Password' name='password' value={data.password} type="password"  className="form-control form-control-lg" onChange={handleChange}/>
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                    </form>
                                    <div>
                                        <p className="mb-0">Don't have an account? <Link to="/register" className="text-white-50 fw-bold">Sign Up</Link>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
