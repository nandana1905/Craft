import React, { useState } from 'react'
import './Register.css'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import Form from 'react-bootstrap/Form';


export default function Register() {

    const [registertext, setResgistertext] = useState({
        name: '',
        email: '',
        address: '',
        age: '',
        phone: '',
        password: '',
        user_img: ''
    })
    console.log('registertext=====>', registertext);

    const [error, setError] = useState({})

    const submit = (event) => {

        event.preventDefault()

        if (!validation()) {
            console.log('error===>');
            return;
        }


        const data = new FormData();
        data.append('name', registertext.name)
        data.append('email', registertext.email)
        data.append('address', registertext.address)
        data.append('age', registertext.age)
        data.append('phone', registertext.phone)
        data.append('password', registertext.password)
        data.append('user_img', registertext.user_img)

        for (const value of data.values()) {
            console.log(value);
        }



        axios.post('http://localhost:3005/api/auth/user_register', data).then((res) => {
            console.log('ress====>', res);
            toast.success('Data successfully added')

        }).catch((error) => {
            console.log(error);
            toast.error('Data adding failed')

        })
    }

    const validation = () => {

        const errorMessage = {}
        const emailRegex = /^\S+@\S+\.\S+$/
        const phoneRegex = /^[+]?[1-9]\d{1,14}$/;

        if (!registertext.name.trim()) {
            errorMessage.name = 'Username is required '

        } if (!registertext.user_img) {
            errorMessage.user_img = 'Image is required'

        } if (!registertext.email.trim()) {
            errorMessage.email = 'Email is required'
        } else if (!emailRegex.test(registertext.email)) {
            errorMessage.email = 'Invalid email address'

        } if (!registertext.address.trim()) {
            errorMessage.address = 'Address is required '

        } if (!registertext.age.trim()) {
            errorMessage.age = 'Age is required'

        } if (!registertext.phone.trim()) {
            errorMessage.phone = 'Phone no is required'
        } else if (!phoneRegex.test(registertext.phone)) {
            errorMessage.phone = 'Invalid phone number'
        } else if (+registertext.phone.length < 10 || +registertext.phone.length > 10) {
            errorMessage.phone = 'Phone number must have 10 digit'
        } if (!registertext.password.trim())
            errorMessage.password = 'Password is required'




        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }

    const registertextChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setResgistertext({ ...registertext, [name]: value })

    }


    return (
        <div>
            <div>
                <Toaster />

                <div className="reg_body">
                    <div className="container-reg">
                        <div className="title">
                            <p className="p-reg">Registration </p>
                        </div>
                        <form action="">
                            <span className='span-reg-file'>{error.user_img}</span>
                            <Form.Group controlId="formFile" className="mb-3 ">
                                <Form.Control type="file" className='file-reg' name='user_img' onChange={(event) => { setResgistertext({ ...registertext, user_img: event.target.files[0] }) }} />
                            </Form.Group>
                            <div className="user_details">
                                <div className="input-box-reg">
                                    <label htmlFor="name">UserName</label>
                                    <span className='span-reg'>{error.name}</span>
                                    <input
                                        type="text"
                                        className="input-reg"
                                        name='name'
                                        onChange={registertextChange}
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="input-box-reg">
                                    <label htmlFor="email">Email Id</label>
                                    <span className='span-reg'>{error.email}</span>
                                    <input
                                        type="text"
                                        className="input-reg"
                                        name="email"
                                        onChange={registertextChange}
                                        placeholder="Enter your email id"
                                    />
                                </div>
                                <div className="input-box-reg">
                                    <label htmlFor="phone">Phone No</label>
                                    <span className='span-reg'>{error.phone}</span>
                                    <input
                                        type="text"
                                        className="input-reg"
                                        name="phone"
                                        onChange={registertextChange}
                                        placeholder="Enter your phone no"
                                    />
                                </div>
                                <div className="input-box-reg">
                                    <label htmlFor="age">Age</label>
                                    <span className='span-reg'>{error.age}</span>
                                    <input
                                        type="text"
                                        className="input-reg"
                                        name="age"
                                        onChange={registertextChange}
                                        placeholder="Enter your age"
                                    />
                                </div>
                                <div className="input-box-reg">
                                    <label htmlFor="password">Password</label>
                                    <span className='span-reg'>{error.password}</span>
                                    <input
                                        type="password"
                                        className="input-reg"
                                        name="password"
                                        onChange={registertextChange}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="input-box-reg">
                                    <label htmlFor="address">Address</label>
                                    <span className='span-reg'>{error.address}</span>
                                    <input
                                        type="text"
                                        className="input-reg"
                                        name="address"
                                        onChange={registertextChange}
                                        placeholder="Enter your address"
                                    />
                                </div>
                            </div>
                            <div className="reg-button">
                                <input type="submit" className="reg_btn" defaultValue="Register" onClick={submit} />
                            </div>
                            <p className="para-reg">
                                Already a member? <a href="/login"> SignIn</a>
                            </p>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}
