import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UserProfile() {

    const navigate = useNavigate()

    const [userProfile, setUserProfile] = useState({})
    console.log('userProfile===>', userProfile);


    useEffect(() => {

        const token = localStorage.getItem('token')
        console.log('tokenUserProfile===>', token);


        axios.get(`http://localhost:3005/api/user/single_user_view/`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        }).then((res) => {
            console.log('res=====>', res.data.data);
            setUserProfile(res.data.data)
        })


    }, [])

    const edit_userprofile = (loginId) => (
        navigate(`/editprofile/${loginId}`)
    )

    return (
        <div>
            <div className="home-nav1">
                <HeaderNav />
            </div>
            <div className="home-nav2">
                <Nav />
            </div>
            <Toaster />

            <div className='usercard'>
                <div className="cardUser">
                    <div className="card__img">

                    </div>
                    <div className="card__avatar">

                        <img src={userProfile.user_img} alt="" height={'160px'} width={'160px'} style={{ borderRadius: '100%' }} />
                    </div>
                    <div className="card__title">Name : {userProfile?.name}</div>
                    <div className="card__subtitle">Email : {userProfile?.loginId?.email}</div>
                    <div className="card__subtitle">Phone No : {userProfile?.phone}</div>
                    <div className="card__subtitle">Age : {userProfile?.age}</div>
                    <div className="card__subtitle">Address : {userProfile?.address}</div>
                    <div className="card__wrapper">
                        <button className="card__btn" onClick={() => { edit_userprofile(userProfile._id) }}><i className="fa fa-pen" /> Edit</button>

                    </div>
                </div>
            </div>

        </div >
    )
}

