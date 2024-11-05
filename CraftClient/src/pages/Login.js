import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export default function Login() {

    const [logintext, setLogintext] = useState({
        email: '',
        password: '',
    });

    console.log('logintext====>', logintext);

    const [error, setError] = useState({})

    const logintextChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setLogintext({ ...logintext, [name]: value })
    }

    const navigate = useNavigate()

    const submit = (event) => {

        event.preventDefault()

        if (!validation()) {
            console.log('error===>',error);
            return;
        }

        axios.post('http://localhost:3005/api/auth/login_check', logintext).then((res) => {
            console.log('res====>', res.data);
            toast.success(res.data.message)
            localStorage.setItem('loginId', res.data.data._id)
            localStorage.setItem('emailId', res.data.data.email)
            localStorage.setItem('password', res.data.data.password)
            localStorage.setItem('role', res.data.data.role)
            localStorage.setItem('token',res.data.token)

            navigate('/')

        }).catch((error) => {
            console.log('error====>', error.response.data.message);
            toast.error(error.response.data.message)
        })
    }

    const validation = () => {
        const errorMessage = {}

        if (!logintext.email.trim()) {
            errorMessage.email = 'Email is required'

        } else if (!/^\S+@\S+\.\S+$/.test(logintext.email)) {
            toast.errorMessage.email = 'Invalid email address'

        } if (!logintext.password.trim())
            errorMessage.password = 'Password is required'


        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }


    return (
        <div>
            <Toaster />
            <div className="login-body">
                <div className="box">
                    <div className="container">
                        <div className="top">
                            <header className="header-login">Login</header>
                        </div>
                        <div className="input-box">

                            <span className='span-login'>{error.email}</span>
                            <input type="email" className="input" placeholder="Email Id" name='email' onChange={logintextChange} />
                            <i className="bx bx-user i-login"></i>

                        </div>

                        <div className="input-box">

                            <span className='span-login'>{error.password}</span>

                            <input type="password" className="input" placeholder="Password" name='password' onChange={logintextChange} />
                            <i className="bx bx-lock-alt i-login"></i>

                        </div>

                        <div className="input-box">

                            <Button variant="light" className="login-button" onClick={submit}>Login</Button>

                        </div>

                        <div className="two-col">

                            <div className="one">
                                <input type="checkbox" />
                                <label for="check">Remeber Me</label>
                            </div>

                            <div className="two">
                                <label className="label-login"><a href="/forgotpassword">Forgot Password?</a></label>
                            </div>

                        </div>

                        <p className="para-login">Don't have a account? <a href="/register"> SignUp</a></p>

                    </div>

                </div>

            </div>

        </div>
    )
}
