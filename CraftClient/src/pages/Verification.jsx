import React, { useState } from 'react'
import './verification.css'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';




export default function Verification() {

    const [verification, setVerification] = useState('')

    const email = (localStorage.getItem('email'))

    const navigate = useNavigate()

    const back = () => {
        navigate('/login')
    }

    const submit = () => {
        navigate('/newPassword')
    }

    const resent = () => {

        axios.post(`http://localhost:3005/api/auth/email_verification`, verification).then((res) => {
            console.log(res.data.message);
            console.log('resend====>', res);


           localStorage.getItem('email')
           localStorage.getItem('OTP')

        }).catch((error) => {
            console.log('error====>', error);
            // toast.error(error.response.data.message)
        })

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

                                        <i class="fa fa-envelope fa-4x"></i>
                                    </h3>
                                    <h2 className="text-center">Password Reset</h2>
                                    <p>Enter the code we just send on your email address<br></br>
                                        <b className="text-danger">{email}</b>
                                    </p>
                                    <div className="panel-body">
                                        <div className="d-flex flex-row mt-5" style={{ display: "flex", textAlign: "center", justifyContent: "center", flexWrap: "wrap" }}>
                                            <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} autofocus="" />
                                            <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} />
                                            <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} />
                                            <input type="text" className="form-control" style={{ height: "50px", width: "80px" }} />
                                        </div>
                                        <form
                                            id="register-form"
                                            role="form"
                                            autoComplete="off"
                                            className="form"
                                            method="post"
                                        >

                                            <div className="text-center mt-5">
                                                <span className="d-block mobile-text">Don't receive the code?</span>
                                                <span className="font-weight-bold text-danger cursor" onClick={resent} >Resend</span>
                                            </div>
                                            <div className="form-group d-grid">
                                                <Button variant="success" onClick={submit} >Verify OTP</Button>
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
