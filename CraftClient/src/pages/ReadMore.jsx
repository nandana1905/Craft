import React, { useEffect, useState } from 'react'
import './ReadMore.css'
import Nav from '../components/Nav'
import HeaderNav from '../components/HeaderNav'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

export default function ReadMore() {

    const [userdetail, setUserdetail] = useState({})
    console.log('userdetail===>', userdetail);

    const [ueserproducts, setUserproducts] = useState([])
    console.log('ueserproducts==>', ueserproducts);


    const { loginId } = useParams()
    console.log('UserLoginId===>', loginId);

    useEffect(() => {

        axios.get(`http://localhost:3005/api/user/single_user_view/${loginId}`).then((res) => {
            console.log('res=====>', res.data);
            setUserdetail(res.data)

        }).catch((error) => {
            console.log(error);

        })

    }, [loginId])

    const UserProductsView = () => {

        axios.get(`http://localhost:3005/api/admin/admin_user_product_view/${loginId}`).then((res) => {
            console.log('UserproductsRes=====>', res);
            setUserproducts(res.data.data)

        }).catch((error) => {
            console.log(error);

        })

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


            <div className='readmore-card'>



                <div className="card">
                    <img src={userdetail?.data?.user_img} className='img-readmore' />
                    <h1>{userdetail?.data?.name}</h1>


                    <div className='btn-readmore'>
                        <Button variant="light" onClick={() => { setUserproducts([]) }}>Details</Button>
                        <Button variant="light" onClick={UserProductsView}>Their Products</Button>
                    </div>

                    {ueserproducts[0] ?

                        <div className='admin-product-card'>

                            {ueserproducts.map((value, index) => (

                                <div className="card-admin-userproduct-view">

                                    <div className="card-image-container">
                                        <img src={value.product_img} width={'375px'} height={'240px'} />
                                    </div>

                                    <div>

                                        <p className="card-title">product name : {value.product_name}</p>
                                        <p className="card-des">category : {value.category}</p>
                                        <p className="card-des">description : {value.description}</p>
                                        <p className="card-des">price : {value.price} Rs</p>
                                        <p className="card-des">quantity : {value.quantity}</p>

                                    </div>
                                </div>

                            ))}
                        </div>
                        :
                            <div className='readmore-details' >
                                <p className="info-email">EMAIL : {userdetail?.data?.loginId?.email}</p>
                                <p className="info">Address : {userdetail?.data?.address}</p>
                                <p className="info">Phone : {userdetail?.data?.phone}</p>
                                <p className="info">Age : {userdetail?.data?.age}</p>
                            </div>
                            
                    }






                </div>







            </div>



        </div >
    )
}
