import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';



export default function SetNewPassword() {

    const navigate = useNavigate()

    const [passwordtext, setPasswordtext] = useState({
        password: '',
        confirmPassword: ''
    })
    console.log('Passwordtext====>', passwordtext);

    const [error, setError] = useState({})


    const back = () => {
        navigate('/login')
    }

    const submit = (event) => {

        event.preventDefault()

        if (!validation()) {

            console.log('validation error');
            return;

        }

        const data = {
            email: localStorage.getItem('email'),
            password: passwordtext.confirmPassword
        }

        axios.post('http://localhost:3005/api/auth/password_update', data).then((res) => {
            console.log(res.data.message);
            toast.success(res.data.message)

            console.log('NewPassword====>', res);

            localStorage.removeItem('email')
            localStorage.removeItem('OTP')



        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error.response.data.message)
        })

    }
    const validation = () => {

        const errorMessage = {}

        if (!passwordtext.password.trim()) {
            errorMessage.password = 'Password is required'
        } else if (passwordtext.password.length < 8) {
            errorMessage.password = 'Password must be at least 8 Characters'
        } if (!passwordtext.confirmPassword.trim()) {
            errorMessage.confirmPassword = 'Confirm Password is required'
        }

        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }

    const PasswordtextChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setPasswordtext({ ...passwordtext, [name]: value })

    }

    return (
        <>
            <Toaster />
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
                                    <h2 className="text-center">Set new password</h2>
                                    <p>Must be at least 8 characters.</p>
                                    <div className="panel-body">
                                        <form
                                            id="register-form"
                                            role="form"
                                            autoComplete="off"
                                            className="form"
                                            method="post"
                                        >
                                            <div className="form-group">
                                                <span style={{ color: 'red' }}>{error.password}</span>
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-lock" />
                                                    </span>
                                                    <input

                                                        onChange={PasswordtextChange}
                                                        name="password"
                                                        placeholder="password"
                                                        className="form-control"
                                                        type="password"
                                                    />
                                                </div><br />
                                                <span style={{ color: 'red' }}>{error.confirmPassword}</span>
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-lock" />
                                                    </span>
                                                    <input

                                                        onChange={PasswordtextChange}
                                                        name="confirmPassword"
                                                        placeholder="confirm password"
                                                        className="form-control"
                                                        type="password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group d-grid">
                                                <Button variant="success" onClick={submit} >Reset Password</Button>
                                            </div>
                                            <input
                                                type="hidden"
                                                className="hide"
                                                name="token"
                                                id="token"
                                                defaultValue=""
                                            />
                                            <div onClick={back} style={{ cursor: 'pointer' }}><i class="fa fa-arrow-left" /> Back to login<br></br></div>
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
