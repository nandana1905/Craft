import React, { useEffect, useState } from 'react'
import './ViewProduct.css'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'


export default function ViewProduct() {

    const navigate = useNavigate()

    const [viewproduct, setViewprouct] = useState([])
    const [filterProduct, setFilterProduct] = useState([])

    const [wishlistProduct, setWishlistProduct] = useState([])
    const [checkWishlist, setCheckWishlist] = useState(false)
    console.log('wishlistProduct===>', wishlistProduct);

    const [Category, setCategory] = useState("All")


    console.log('viewproduct===>', viewproduct);
    console.log('filter===>', filterProduct);



    console.log('category===>', Category);


    useEffect(() => {
        axios.get('http://localhost:3005/api/product/product_view').then((res) => {
            console.log('res=====>', res.data.data);
            setViewprouct(res.data.data)//state update cheyan using function
            // setFilterProduct(res.data.data)
        })

    }, [])

    useEffect(() => {

        const loginId = localStorage.getItem('loginId')
        console.log('loginId====>', loginId);

        axios.get(`http://localhost:3005/api/wishlist/view_wishlist/${loginId}`).then((res) => {
            console.log('wishlist====>', res.data.data);
            setWishlistProduct(res.data.data)

        })

    }, [checkWishlist])

    const product_edit = (productId) => {

        navigate(`/editproduct/${productId}`)

    }

    const product_delete = (productId) => {
        axios.post(`http://localhost:3005/api/product/delete_product/${productId}`).then((res) => {
            console.log('res====>', res.data.message);
            toast.success(res.data.message)

        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error.response.data.message)
        })
    }

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
            {/* <h1 className='viewproduct-h1'>Product Details</h1> */}


            <div className='category-button'>

                <button className='viewproduct-category-btn' onClick={() => { setCategory('All') }}>
                    All Category
                </button>
                <button className='viewproduct-category-btn' onClick={() => { setCategory('Pottery_ArtWork') }}>
                    Pottery Artwork
                </button>
                <button className='viewproduct-category-btn' onClick={() => { setCategory('ArtWork') }}>
                    ArtWork
                </button>
                <button className='viewproduct-category-btn' onClick={() => { setCategory('Glass_ArtWork') }}>
                    Glass ArtWork
                </button>
                <button className='viewproduct-category-btn' onClick={() => { setCategory('Embroidery_ArtWork') }}>
                    Embroidery ArtWork
                </button>
                <button className='viewproduct-category-btn' onClick={() => { setCategory('Woodworking') }}>
                    Woodworking
                </button>


            </div>

            <div className='viewproduct'>

                {Category == 'All' ?
                    viewproduct.map((value, index) => (

                        <div className="card-product-view">

                            <div className='product-img'>
                                <img src={value.product_img} style={{ borderRadius: '15px' }} alt="" height={400} width={400} />
                                <div className='viewproduct-icon'>
                                    {/* {wishlistProduct.filter((data) => {
                                        return data.productId === value._id
                                    })[0] ?

                                        <i onClick={() => { addWishlist(value._id) }} class="fa-regular fa-heart i-viewproduct" style={{ fontSize: "210%", color: '#ff0000' }}> </i>
                                        :
                                        <i onClick={() => { addWishlist(value._id) }} class="fa-regular fa-heart i-viewproduct" style={{ fontSize: "210%", color: 'black' }}> </i>

                                    } */}

                                    <i onClick={() => { addWishlist(value._id) }} class="fa-regular fa-heart i-viewproduct" style={{ fontSize: "210%", color: 'black' }}> </i>
                                </div>
                            </div>

                            <div className="card__content">

                                <p className="card__title">{value.product_name}</p>
                                <p className="card__description">

                                    <p style={{ color: 'black' }}>{value.description}</p>
                                    <p style={{ color: 'black' }}>RS.{value.price}</p>
                                    <p style={{ color: 'black' }}>Quantity : {value.quantity}</p>

                                    <div className='viewproduct-button'>
                                        {/* <button type='submit' onClick={() => { product_edit(value._id) }} className='viewproduct-button-edit'> Edit</button>
                                        <button type='submit' onClick={() => { product_delete(value._id) }} className='viewproduct-button-delete'>Delete</button><br /> */}
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

                    )) :

                    viewproduct.filter((data) => { return Category == data.category })[0] ?
                    viewproduct.filter((data) => { return Category == data.category }).map((value, index) => (

                            <div className="card-product-view">

                                <div className='product-img'>
                                    <img src={value.product_img} style={{ borderRadius: '15px' }} alt="" height={400} width={400} />
                                    <div className='viewproduct-icon'>
                                        <i class="fa-regular fa-heart i-viewproduct"> </i>
                                    </div>
                                </div>

                                <div className="card__content">

                                    <p className="card__title">{value.product_name}</p>
                                    <p className="card__description">



                                        <p style={{ color: 'black' }}>{value.description}</p>
                                        <p style={{ color: 'black' }}>RS.{value.price}</p>
                                        <p style={{ color: 'black' }}>Quantity : {value.quantity}</p>

                                        <div className='viewproduct-button'>
                                            <button type='submit' onClick={() => { product_edit(value._id) }} className='viewproduct-button-edit'> Edit</button>
                                            <button type='submit' onClick={() => { product_delete(value._id) }} className='viewproduct-button-delete'>Delete</button><br />
                                            <button type='submit' className='viewproduct-button-addCart'>Add Cart</button>
                                        </div>


                                    </p>

                                </div>
                            </div>
                        ))
                        :
                        <h1>This category is empty</h1>
                }
            </div>



            <div>
                <Footer />
            </div>
        </div>
    )
}
