import React, { useEffect, useState } from 'react'
import './ShoppingCart.css'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import toast, { Toaster } from 'react-hot-toast'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ShoppingCart() {

    const navigate = useNavigate()

    const [viewcart, setViewCart] = useState([])

    useEffect(() => {

        const id = localStorage.getItem('loginId')
        console.log('id====>', id);

        axios.get(`http://localhost:3005/api/cart/view_cart/${id}`).then((res) => {
            console.log('resCart====>', res.data.data);
            setViewCart(res.data.data)

        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error.response.data.message)
        })

    }, [])

    const quantity_increment = (_id) => {
        axios.post(`http://localhost:3005/api/cart/quantity_increment/${_id}`, viewcart).then((res) => {
            console.log('quantity_increment===>', res.data.data);

            const filterIncrement = viewcart.filter((value) => {
                if (value._id == _id) {
                    value.quantity = value.quantity + 1
                }
                return value
            })
            setViewCart(filterIncrement)
        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error.response.data.message)
        })
    }

    const quantity_decrement = (_id) => {
        axios.post(`http://localhost:3005/api/cart/quantity_decremented/${_id}`, viewcart).then((res) => {
            console.log('quantity_decremented===>', res.data.data);

            const filterDecrement = viewcart.filter((value) => {
                if (value._id == _id) {
                    value.quantity = value.quantity - 1
                }
                return value
            })
            setViewCart(filterDecrement)

        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error.response.data.message)
        })
    }

    const cartDelete = (_id) => {

        axios.post(`http://localhost:3005/api/cart/delete_cart/${_id}`, viewcart).then((res) => {
            console.log('cartDelete====>', res.data.message);
            toast.success(res.data.message)

            const DeleteCart = viewcart.filter((value) => {
                return value._id != _id
            })
            setViewCart(DeleteCart)

        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error.response.data.message)
        })

    }

    const cartSubtotal = viewcart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const discount = cartSubtotal * 0.06;

    const totalAfterDiscount = cartSubtotal - discount;

    const checkout = () => {
        navigate('/payment')
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
            <div className="wrapper">
                <h1>Shopping Cart</h1>

                {viewcart.map((value, index) => (

                    <div className="project">
                        <div className="shop">
                            <div className="box-cart">

                                <Row className='cart-row'>
                                    <Col style={{ fontSize: '20px', fontWeight: '500', width: '300px' }}>PRODUCT<br /><br /><br /><br /><img src={value.product_img} alt="" className='img-cart' /><br /><br />
                                        <p>{value.product_name}</p></Col>
                                    <Col className='col-cart'>Price<br /><br /><br /><br /><br />Rs.{value.price}</Col>
                                    <Col className='col-cart'>Category<br /><br /><br /><br /><br />{value.category}</Col>
                                    <Col className='col-cart'>Quantity<br /><br /><br /><br /><br /><ButtonGroup aria-label="Basic example">
                                        <Button variant="secondary" onClick={() => { quantity_decrement(value._id) }} ><i className="fa fa-minus" /></Button>
                                        <Button variant="secondary">{value.quantity}</Button>
                                        <Button variant="secondary" onClick={() => { quantity_increment(value._id) }} ><i className="fa fa-plus" /></Button>
                                    </ButtonGroup></Col>
                                    <Col className='col-cart'>Total Price<br /><br /><br /><br /><br />Rs.{value.price * value.quantity}</Col>
                                    <Col className='col-cart-btn'><Button variant="dark" onClick={() => { cartDelete(value._id) }}><i className="fa fa-trash" /> Remove</Button></Col>
                                </Row>


                            </div>

                        </div>




                    </div>

                ))}

                <div className="right-bar">
                    <p>
                        <span>Cart Subtotal</span> <span>Rs.{cartSubtotal}</span>
                    </p>
                    <hr />
                    <p>
                        <span>Discount (6%)</span> <span>Rs.{discount.toFixed(2)}</span>
                    </p>
                    <hr />

                    <p>
                        <span>Total</span> <span>Rs.{totalAfterDiscount.toFixed(2)}</span>
                    </p>
                    <button onClick={checkout}>
                        <i className="fa fa-shopping-cart" />
                        Checkout
                    </button>
                </div>

            </div>



        </div>
    )
}
