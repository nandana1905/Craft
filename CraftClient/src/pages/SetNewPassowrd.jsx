import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';



export default function SetNewPassword() {
    const navigate = useNavigate()
    const back = () => {
        navigate('/login')
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
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-lock" />
                                                    </span>
                                                    <input
                                                        id="email"
                                                        name="password"
                                                        placeholder="password"
                                                        className="form-control"
                                                        type="password"
                                                    />
                                                </div><br />
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-lock" />
                                                    </span>
                                                    <input
                                                        id="email"
                                                        name="password"
                                                        placeholder="confirm password"
                                                        className="form-control"
                                                        type="password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group d-grid">
                                                <Button variant="success" >Sumbmit</Button>
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
