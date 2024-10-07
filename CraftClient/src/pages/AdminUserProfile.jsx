import './AdminUserProfile.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import HeaderNav from '../components/HeaderNav';
import Nav from '../components/Nav';

export default function AdminUserProfile() {

    const [viewuser, setViewuser] = useState([])
    console.log('user===>', viewuser);

    useEffect(() => {

        axios.get('http://localhost:3005/api/admin/admin_userview_profile').then((res) => {
            console.log(res.data.data);
            setViewuser(res.data.data)
        }).catch((error) => {
            console.log(error);

        })

    }, [])

    const userApprove = (loginId) => {

        axios.post(`http://localhost:3005/api/admin/admin_apporve_user/${loginId}`).then((res) => {

            console.log('res====>', res.data.message);
            toast.success(res.data.message)

        }).catch((error) => {

            console.log('error====>', error);
            toast.error(error.response.data.message)
        })
    }

    const userReject = (loginId) => {

        axios.post(`http://localhost:3005/api/admin/admin_delete_profile/${loginId}`).then((res) => {

            console.log('res====>', res.data.message);
            toast.success(res.data.message)

            const DataFilter = viewuser.filter((value) => {

                return value.loginId._id != loginId

            })

            setViewuser(DataFilter)
            console.log('DataFilter===>', DataFilter);

        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error.response.data.message)
        })

    }


    return (
        <div>
            <Toaster />
            <div className="home-nav1">
                <HeaderNav />
            </div>
            <div className="home-nav2">
                <Nav />
            </div>



            {/* <div className='usercard'>

                {viewuser.map((value, index) => (


                    <div className="cookieCard">


                        <div>
                            <p className="cookieHeading">{value.name}</p>
                            <p className="cookieDescription">{value.age}</p>
                            <p className="cookieDescription">{value.phone}</p>
                            <p className="cookieDescription">{value.address}</p>
                        </div>

                        {value.loginId.status == 'Approved' ?

                            <button type='submit' className="acceptButton" onClick={() => { userReject(value.loginId._id) }}>Reject</button>

                            :

                            <div>
                                <button type='submit' className="acceptButton" onClick={() => { userApprove(value.loginId._id) }} >Approve</button>
                                <button type='submit' className="acceptButton" onClick={() => { userReject(value.loginId._id) }}>Reject</button>
                            </div>

                        }



                    </div>


                ))}

            </div> */}



            <div className='userprofile'>

                {viewuser.map((value, index) => (

                    <div class="user-card">

                        <div class="profile-pic">
                            <img src={value.user_img} alt="" height={400} width={400} />
                        </div>
                        <div class="bottom">
                            <div class="content">

                                <span class="name">Name : {value?.name}</span>
                                <span class="about-me">Age : {value?.age}</span>
                                <span class="about-me">Phone No : {value?.phone}</span>
                                <span class="about-me">Address : {value?.address}</span>


                            </div>

                            {value.loginId.status == 'Approved' ?
                                <div class="bottom-bottom">

                                    <button type='submit' className="button" onClick={() => { userReject(value.loginId._id) }}>Reject</button>

                                </div>

                                :

                                <div class="bottom-bottom">
                                    <button type='submit' className="button" onClick={() => { userApprove(value.loginId._id) }} >Approve</button>
                                    <button type='submit' className="button" onClick={() => { userReject(value.loginId._id) }}>Reject</button>
                                </div>

                            }
                        </div>

                    </div>

                ))}
            </div>


        </div>
    )

}

