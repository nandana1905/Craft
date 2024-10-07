import React, { useEffect, useState } from 'react'
import './AddProduct.css'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function EditProduct() {

    const navigate = useNavigate()

    const [singleViewProduct, setSingleViewProduct] = useState({
        product_name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        product_img: ''
    })

    const { id } = useParams()
    console.log('ProductId===>',id);

    useEffect(() => {

        axios.get(`http://localhost:3005/api/product/single_product_view/${id}`).then((res) => {
            console.log('res=====>', res);
            setSingleViewProduct(res.data.data)
        }).catch((error) => {
            console.log(error);

        })

    }, [id])

    console.log('singleViewProduct====>', singleViewProduct);

    const [error, setError] = useState({})

    const singleViewProductChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setSingleViewProduct({ ...singleViewProduct, [name]: value })
    }



    const submit = (event) => {

        event.preventDefault()

        if (!validation()) {
            console.log('error===>');
            return;
        }
        

        const data = new FormData();
        data.append('product_name', singleViewProduct.product_name)
        data.append('description', singleViewProduct.description)
        data.append('quantity', singleViewProduct.quantity)
        data.append('category', singleViewProduct.category)
        data.append('price', singleViewProduct.price)
        data.append('product_img', singleViewProduct.product_img)


        axios.post(`http://localhost:3005/api/product/product_edit/${id}`, data).then((res) => {
            console.log('res====>', res.data.message);
            toast.success(res.data.message)

            const navigateTimer = setTimeout(() => {
                navigate('/viewproduct')
            }, 2000)

        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error.response.data.message)
        })

    }

    const validation = () => {
        const errorMessage = {}

        if (!singleViewProduct.product_name.trim()) {
            errorMessage.product_name = 'Product name is required'

        } if (!singleViewProduct.description.trim()) {
            errorMessage.description = 'Description is required'

        } if (!singleViewProduct.price) {
            errorMessage.price = 'Price is required'

        } if (!singleViewProduct.quantity) {
            errorMessage.quantity = 'Quantiyy is required'
        } if (!singleViewProduct.category.trim()) {
            errorMessage.category = 'Category is required'
        } if (!singleViewProduct.product_img) {
            errorMessage.product_img = 'Image is required'
        }
        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }



    return (
        <div>

            <div className="home-nav1">
                <HeaderNav />
            </div>
            <div className="home-nav2">
                <Nav />
            </div>
            <Toaster />
            <div className='addproduct-body'>
                <div className="addproduct-wapper">
                    <form action="">
                        <h1>Edit Product</h1>

                        <div className='catgory'>
                            <label className="addproduct-label" >Choose a category : </label>
                            <select name='category' className='addproduct-select' onChange={singleViewProductChange} value={singleViewProduct.category}>
                                <option value={'Pottery_ArtWork'} className="addproduct-option-field" >Pottery ArtWork</option>
                                <option value={'ArtWork'} className="addproduct-option-field" >ArtWork</option>
                                <option value={'Glass_ArtWork'} className="addproduct-option-field" >Glass ArtWork</option>
                                <option value={'Embroidery_ArtWork'} className="addproduct-option-field" >Embroidery ArtWork</option>
                                <option value={'Woodworking'} className="addproduct-option-field" >Woodworking</option>
                            </select>
                            <span className='span'>{error.category}</span>
                        </div>

                        <div className="mb-3">
                            <input className="addproduct-input-file"  type="file" onChange={(event) => { setSingleViewProduct({ ...singleViewProduct, product_img: event.target.files[0] }) }} id="formFile" /><br/>
                            <img  src={singleViewProduct.product_img} height={70} width={70} style={{paddingTop:'10px'}} />
                        </div>
                        <div className="addproduct-input-box">
                            <div className="addproduct-input-field">
                                <span className='span'>{error.product_name}</span>
                                <input type="text" placeholder="Product Name" name='product_name' value={singleViewProduct.product_name} onChange={singleViewProductChange} required="" />
                            </div>
                            <div className="addproduct-input-field">
                                <span className='span'>{error.description}</span>
                                <input type="text" placeholder="Description" name='description' value={singleViewProduct.description} onChange={singleViewProductChange} required="" />
                            </div>
                        </div>
                        <div className="addproduct-input-box">
                            <div className="addproduct-input-field">
                                <span className='span'>{error.price}</span>
                                <input type="text" placeholder="Price" name='price' value={singleViewProduct.price} onChange={singleViewProductChange} required="" />
                            </div>
                            <div className="addproduct-input-field">
                                <span className='span'>{error.quantity}</span>
                                <input type="text" placeholder="Quantity" name='quantity' value={singleViewProduct.quantity} onChange={singleViewProductChange} required="" />
                            </div>
                        </div>
                        <button type="submit" className="addproduct-btn" onClick={submit}>
                            <b>Submit</b>
                        </button>
                    </form>
                </div>
            </div >

        </div >
    )
}
