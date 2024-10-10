import React, { useEffect, useState } from 'react'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import './ViewProduct.css'
import toast, { Toaster } from 'react-hot-toast'

import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Category() {

    const [category, setCategory] = useState([])


    const { categoryname } = useParams()
    console.log(categoryname);

    const [wishlistProduct, setWishlistProduct] = useState([])
    const [checkWishlist, setCheckWishlist] = useState(false)
    console.log('wishlistProduct===>', wishlistProduct);


    useEffect(() => {

        axios.get(`http://localhost:3005/api/product/category_view/${categoryname}`).then((res) => {
            console.log('res=====>', res);
            setCategory(res.data.data)
        }).catch((error) => {
            console.log(error);

        })

    }, [categoryname])

    useEffect(() => {

        const loginId = localStorage.getItem('loginId')
        console.log('loginId====>', loginId);

        axios.get(`http://localhost:3005/api/wishlist/view_wishlist/${loginId}`).then((res) => {
            console.log('wishlist====>', res.data.data);
            setWishlistProduct(res.data.data)

        })

    }, [checkWishlist])

    console.log('CategoryView=====>', category);

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

    const addWishlist = (id) => {
        console.log(id);

        const wishlistdata = {
            user_loginId: localStorage.getItem('loginId'),
            productId: id
        }

        axios.post(`http://localhost:3005/api/wishlist/add_wishlist/`, wishlistdata).then((res) => {
            setCheckWishlist(!checkWishlist)
            console.log(res.data.message);
            toast.success(res.data.message)

        }).catch((error) => {
            console.log(error);

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
            <div className='allproductview'>

                <h1 className='viewproduct-h1'>Product Details</h1>
                <div className='viewproduct'>

                    {category.map((value, index) => (

                        <div className="card-product-view">

                            <div className='product-img'>
                                <img src={value.product_img} style={{ borderRadius: '15px' }} alt="" height={400} width={400} />
                                <div className='viewproduct-icon'>
                                    <i class="fa-regular fa-heart i-viewproduct"> </i>
                                </div>
                            </div>

                            <div className="card_content_viewproduct">

                                <p className="card_title_viewproduct">{value.product_name}</p>
                                <p className="card_description_viewproduct">



                                    <p style={{ color: 'black' }}>{value?.description}</p>
                                    <p style={{ color: 'black' }}>RS.{value?.price}</p>
                                    <p style={{ color: 'black' }}>Quantity : {value?.quantity}</p>

                                    <div className='viewproduct-button'>
                                        <i onClick={() => { addCart(value._id) }} class="fa-solid fa-cart-shopping viewproduct_cart" style={{ fontSize: "210%" }} />

                                        {wishlistProduct.filter((data) => {
                                            return data.productId === value._id
                                        })[0] ?

                                            <i onClick={() => { addWishlist(value._id) }} class="fa-solid fa-heart i-viewproduct" style={{ fontSize: "210%", color: '#ff0000' }}> </i>
                                            :
                                            <i onClick={() => { addWishlist(value._id) }} class="fa-regular fa-heart i-viewproduct" style={{ fontSize: "210%", color: 'black' }}> </i>

                                        }

                                    </div>


                                </p>

                            </div>
                        </div>
                    ))}
                </div>


            </div>

        </div>
    )
}
