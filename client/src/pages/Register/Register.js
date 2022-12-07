import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


const Register = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        fullname:"",
        password: '',
        email:""
    })

    const submitHander = (e) =>{
        e.preventDefault()

        if(!data.username || !data.password || !data.email || !data.fullname) return alert("please fill all field")

        if(data.password.length < 6) return alert('password must be atleast 6 dgit')
        if(data.username.length < 3) return alert('username must be atleast 3 dgit')

        axios.post("http://localhost:5000/api/auth/register", data)
            .then(res => { 
                navigate("/login");
            }).catch(function (error){
                alert('User Already Exist')
            }
            )

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

                                    <form className="mb-md-5 mt-md-4 " onSubmit={submitHander}>

                                        <h2 className="fw-bold text-uppercase mb-5">Register</h2>

                                        <div className="form-outline form-white mb-4">
                                            <input name='fullname' placeholder='Full Name' type="text" value={data.fullname} className="form-control form-control-lg"  onChange={handleChange}/>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input name='username' placeholder='username' type="text" value={data.username} className="form-control form-control-lg" onChange={handleChange}/>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input name='email' placeholder='Email' type="email" value={data.email} className="form-control form-control-lg" onChange={handleChange}/>
                                        </div>


                                        <div className="form-outline form-white mb-3">
                                            <input name='password' placeholder='Password' type="password" value={data.password} className="form-control form-control-lg" onChange={handleChange}/>
                                        </div>
                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">Register</button>

                                    </form>
                                    <div>
                                        <p className="mb-0">Already have an account? <Link to="/login" className="text-white-50 fw-bold">Login</Link>
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

export default Register
