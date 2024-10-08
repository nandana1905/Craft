import React, { useState } from 'react'
import './password.css'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';



export default function ForgotPassword() {

    const [input, setInput] = useState({
        email: '',
    })
    console.log('input====>', input);


    const [error, setError] = useState({})

    const inputChange = (event) => {

        const name = event.target.name
        const value = event.target.value
        setInput({ ...input, [name]: value })

    }

    const navigate = useNavigate()

    const submit = (event) => {

        event.preventDefault()

        if (!validationError()) {

            console.log('error');
            return;

        }
        axios.post(`http://localhost:3005/api/auth/email_verification`, input).then((res) => {
            console.log(res.data.message);
            console.log('forget====>', res);


            localStorage.setItem('email', res.data.email)
            localStorage.setItem('OTP', res.data.otp)

        }).catch((error) => {
            console.log('error====>', error);
            // toast.error(error.response.data.message)
        })


        navigate('/verification')
    }

    const back = () => {

        navigate('/login')

    }
    const validationError = () => {

        const errorMessage = {};

        if (!input.email.trim()) {//trim use chynnath white space ozhivakkan ann
            errorMessage.email = "Email address is required"

        } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {//reqular expression test chyaa
            errorMessage.email = "Invalid email address"

        }

        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }
    return (
        <>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            />
            <link
                href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
                rel="stylesheet"
            />
            <div className="form-gap" />
            <div className="container-forgot">
                <div className="row-forgot">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3>
                                        <i className="fa fa-lock fa-4x" />
                                    </h3>
                                    <h2 className="text-center">Forgot Password?</h2>
                                    <p>You can reset your password here.</p>
                                    <div className="panel-body">
                                        <form
                                            id="register-form"
                                            role="form"
                                            autoComplete="off"
                                            className="form"
                                            method="post"
                                        >
                                            <div className="form-group">
                                                <div className='span'><span style={{ color: 'red' }}>{error.email}</span></div>

                                                <div className="input-group">

                                                    <span className="input-group-addon">
                                                        <i className="fa fa-envelope" />
                                                    </span>

                                                    <input
                                                        id="email"
                                                        name="email"
                                                        placeholder="email address"
                                                        className="form-control"
                                                        type="email"
                                                        onChange={inputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group d-grid">
                                                <Button variant="success" onClick={submit} >Verify Email</Button>
                                            </div>

                                            <input
                                                type="hidden"
                                                className="hide"
                                                name="token"
                                                id="token"
                                                defaultValue=""
                                            />
                                            <div onClick={back}>Back to login<br></br><i class="fa fa-arrow-left" ></i></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
//node mailer