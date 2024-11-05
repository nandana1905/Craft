import React, { useEffect, useState } from 'react'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import './AdminViewProduct.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'


export default function AdminViewProduct() {

    const [adminviewproduct, setAdminviewproduct] = useState([])



    console.log('adminviewproduct===>', adminviewproduct);

    const navigate = useNavigate()

    useEffect(() => {

        axios.get('http://localhost:3005/api/admin/admin_product_view').then((res) => {

            console.log(res.data.data);
            setAdminviewproduct(res.data.data)

        })

    }, [])

    useEffect(() => {
        AOS.init();
    }, [])

    const ReadMore = (loginId) => {

        navigate(`/readmore/${loginId}`)

    }

    const productApprove = (loginId) => {

        axios.post(`http://localhost:3005/api/admin/admin_apporve_product/${loginId}`).then((res) => {

            console.log('ApporveRes===>', res.data.message);
            toast.success(res.data.message)

        }).catch((error) => {

            console.log('error====>', error);
            toast.error(error.response.data.message)
        })
    }

    const productReject = (loginId) => {

        axios.post(`http://localhost:3005/api/admin/admin_delete_product/${loginId}`).then((res) => {

            console.log('RejectRes===>', res.data.message);
            toast.success(res.data.message)

            const DataFilter = adminviewproduct.filter((value) => {

                return value.loginId._id != loginId

            })

            setAdminviewproduct(DataFilter)
            console.log('DataFilter===>', DataFilter);

        }).catch((error) => {

            console.log('error====>', error);
            toast.error(error.response.data.message)
        })



    }


    return (
        <div>
            <div className="home-nav1">
                <Toaster />
                <HeaderNav />
            </div>
            <div className="home-nav2">
                <Nav />
            </div>

            <div className='admin-product-card'>

                {adminviewproduct.map((value, index) => (

                    <div className="card-admin-product-view" data-aos="zoom-in-up">

                        <div className="card-image-container">
                            <img src={value.product_img} height={'275'} width={'400'} />
                        </div>

                        <div>
                            <p className="card-title">product name : {value?.product_name}</p>
                            <p className="card-des">category : {value?.category}</p>
                            <p className="card-des">description : {value?.description}</p>
                            <p className="card-des">price : {value?.price} Rs</p>
                            <p className="card-des">quantity : {value?.quantity}</p>
                            <button class="btn-read-more" onClick={() => { ReadMore(value.loginId._id) }} >Read more</button>

                        </div>

                        {value.status == 'Approved' ?

                            <div className='adminproduct-button'>
                                <button type='submit' className="adminproduct" onClick={() => { productReject(value._id) }} >Reject</button>
                            </div>
                            :

                            <div className='adminproduct-button'>
                                <button type='submit' className="adminproduct" onClick={() => { productApprove(value._id) }} >Approve</button>
                                <button type='submit' className="adminproduct" onClick={() => { productReject(value._id) }} >Reject</button>
                            </div>

                        }



                    </div>

                ))}



            </div>

        </div>
    )
}
