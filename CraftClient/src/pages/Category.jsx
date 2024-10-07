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


    useEffect(() => {

        axios.get(`http://localhost:3005/api/product/category_view/${categoryname}`).then((res) => {
            console.log('res=====>', res);
            setCategory(res.data.data)
        }).catch((error) => {
            console.log(error);

        })
        
    }, [categoryname])

    console.log('CategoryView=====>', category);

    return (
        <div>
            <Toaster />
            <div className="home-nav1">
                <HeaderNav />
            </div>
            <div className="home-nav2">
                <Nav />
            </div>
            <h1 className='viewproduct-h1'>Product Details</h1>
            <div className='viewproduct'>

                {category.map((value, index) => (
                    <div className="card">

                        <div className='product-img'>
                            <img src={value.product_img} style={{ borderRadius: '15px' }} alt="" height={400} width={400} />
                            <div className='viewproduct-icon'>
                                <i class="fa-regular fa-heart i-viewproduct"> </i>
                            </div>
                        </div>

                        <div className="card__content">

                            <p className="card__title">{value.product_name}</p>
                            <p className="card__description">



                                <p style={{ color: 'black' }}>{value?.description}</p>
                                <p style={{ color: 'black' }}>RS.{value?.price}</p>
                                <p style={{ color: 'black' }}>Quantity : {value?.quantity}</p>




                            </p>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
