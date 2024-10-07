import React, { useEffect, useState } from 'react'
import './Wishlist.css'
import Button from 'react-bootstrap/Button';
import Nav from '../components/Nav';
import HeaderNav from '../components/HeaderNav';
import Footer from '../components/Footer';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

export default function Wishlist() {

    const [wishlist, setWishlist] = useState([])

    useEffect(() => {

        const loginId = localStorage.getItem('loginId')
        console.log('loginId====>', loginId);

        axios.get(`http://localhost:3005/api/wishlist/view_wishlist/${loginId}`).then((res) => {
            console.log('wishlist====>', res.data.data);
            setWishlist(res.data.data)

        })

    }, [])

    const addCart = (id) => {

        const data = {
            user_loginId: localStorage.getItem('loginId'),
            productId: id
        }

        axios.post(`http://localhost:3005/api/cart/add_cart/`, data).then((res) => {
            console.log(res.data.message);
            toast.success(res.data.message)

        }).catch((error) => {
            console.log(error);

        })

    }

    const removeWish = (_id) => {

        axios.post(`http://localhost:3005/api/wishlist/delete_wishlist/${_id}`).then((res) => {
            console.log('_idwishlist====>',_id);
            
            console.log(res.data.message);
            toast.success(res.data.message)

            // setWishlist(wishlist.filter(item => item._id !== _id))

            const DeleteWish = wishlist.filter((value) => {
                return value._id != _id
            })
            setWishlist(DeleteWish)

        }).catch((error) => {
            console.log(error);
        })

    }

    return (
        <div>
            <HeaderNav />
            <Nav />
            <Toaster />
            <>
                <h1 className='wish-h1'>My Wishlist</h1>

                <div className='wishlistOverall'>

                    {wishlist.map((value, index) => (
                        <div className='wishlist-card'>

                            <div className="card-wish wishlist">
                                <div className="overlay" />
                                <div className="circle">
                                    <img src={value.product_img} height={'149px'} width={'149px'} />
                                </div>
                                <div className='wishlist-details'>
                                    <h4>{value.product_name}</h4>
                                    <h6>{value.description}</h6>
                                    <h6>Rs.{value.price}</h6>
                                    <div>
                                        <Button variant="dark" onClick={() => { addCart(value._id) }} className="me-3"><i className="fa fa-shopping-cart" /> Add Cart</Button>
                                        <Button variant="danger" onClick={() => { removeWish(value._id) }} ><i className="fa fa-trash" /> Remove</Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>



            </>
            {/* <Footer/> */}
        </div>
    )
}
