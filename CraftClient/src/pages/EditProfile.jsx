import React, { useEffect, useState } from 'react'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form';


export default function EditProfile() {

    const navigate = useNavigate()

    const [singleUserView, setSingleUserView] = useState({

        name: '',
        email: '',
        address: '',
        age: '',
        phone: '',
        password: '',
        user_img: ''

    })

    const { loginId } = useParams()
    console.log('UserloginId===>', loginId);

    useEffect(() => {

        const token = localStorage.getItem('token')
        console.log('token===>',token);
        

        axios.get(`http://localhost:3005/api/user/single_user_view`,{

            headers: {
                Authorization: `Bearer ${token}`
            }

        }).then((res) => {
            console.log('res=====>', res.data.data);
            setSingleUserView(res.data.data)
        })


    }, [])

    console.log('singleUserView===>', singleUserView);

    const [error, setError] = useState({})

    const singleViewUserChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setSingleUserView({ ...singleUserView, [name]: value })
    }

    const submit = (event) => {

        event.preventDefault()

        if (!validation()) {
            console.log('error===>');
            return;
        }


        const data = new FormData();
        data.append('name', singleUserView.name)
        data.append('email', singleUserView.email)
        data.append('address', singleUserView.address)
        data.append('age', singleUserView.age)
        data.append('phone', singleUserView.phone)
        data.append('password', singleUserView.password)
        data.append('user_img', singleUserView.user_img)

        for (const value of data.values()) {
            console.log(value);
        }


        axios.post(`http://localhost:3005/api/user/edit_profile/${loginId}`, data).then((res) => {
            console.log('res====>', res.data.message);
            toast.success(res.data.message)

            const navigateTimer = setTimeout(() => {
                navigate('/userprofile')
            }, 2000)

        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error.response.data.message)
        })

    }

    const validation = () => {

        const errorMessage = {}
        const emailRegex = /^\S+@\S+\.\S+$/
        const phoneRegex = /^[+]?[1-9]\d{1,14}$/;

        if (!singleUserView.name) {
            errorMessage.name = 'Username is required '

        } if (!singleUserView.user_img) {
            errorMessage.user_img = 'Image is required'

        } if (!singleUserView?.loginId?.email) {
            errorMessage.email = 'Email is required'
        } else if (!emailRegex.test(singleUserView.loginId.email)) {
            errorMessage.email = 'Invalid email address'

        } if (!singleUserView.address) {
            errorMessage.address = 'Address is required '

        } if (!singleUserView.age) {
            errorMessage.age = 'Age is required'

        } if (!singleUserView.phone) {
            errorMessage.phone = 'Phone no is required'
        } else if (!phoneRegex.test(singleUserView.phone)) {
            errorMessage.phone = 'Invalid phone number'
        } else if (+singleUserView.phone.length < 10 || +singleUserView.phone.length > 10) {
            errorMessage.phone = 'Phone number must have 10 digit'
        } if (!singleUserView.loginId.password)
            errorMessage.password = 'Password is required'

        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }


    return (
        <div>

            <div classNameName="home-nav1">
                <Toaster />
                <HeaderNav />
            </div>
            <div classNameName="home-nav2">
                <Nav />
            </div>
            <div className="reg_body">
                <div className="container-reg">
                    <div className="title">
                        <p className="p-reg">Edit profile </p>
                    </div>
                    <form action="">
                        <span className='span-reg-file'>{error.user_img}</span>
                        <Form.Group controlId="formFile" className="mb-3 ">
                            <Form.Control type="file" className='file-reg' name='user_img' onChange={(event) => { setSingleUserView({ ...singleUserView, user_img: event.target.files[0] }) }} />
                        </Form.Group>

                        <img  src={singleUserView.user_img} height={70} width={70} style={{marginLeft:'15%'}} />

                        <div className="user_details">
                            <div className="input-box-reg">
                                <label htmlFor="name">UserName</label>
                                <span className='span-reg'>{error.name}</span>
                                <input
                                    type="text"
                                    className="input-reg"
                                    name='name'
                                    value={singleUserView.name}
                                    onChange={singleViewUserChange}
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
                                    value={singleUserView?.loginId?.email}
                                    onChange={singleViewUserChange}
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
                                    value={singleUserView.phone}
                                    onChange={singleViewUserChange}
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
                                    value={singleUserView.age}
                                    onChange={singleViewUserChange}
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
                                    value={singleUserView?.loginId?.password}
                                    onChange={singleViewUserChange}
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
                                    value={singleUserView.address}
                                    onChange={singleViewUserChange}
                                    placeholder="Enter your address"
                                />
                            </div>
                        </div>
                        <div className="reg-button">
                            <input type="submit" className="reg_btn" defaultValue="Sumbit" onClick={submit} style={{marginBottom:'15px'}} />
                        </div>
                        {/* <p className="para-reg">
                            Already a member? <a href="/login"> SignIn</a>
                        </p> */}
                    </form>
                </div>
            </div>

        </div>
    )
}
