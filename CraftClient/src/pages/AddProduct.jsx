import React, { useState } from 'react'
import HeaderNav from '../components/HeaderNav'
import Nav from '../components/Nav'
import './AddProduct.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


export default function AddProduct() {
    const id = localStorage.getItem('loginId')
    console.log('id===>', id);
    console.log(typeof id);


    const [addProduct, setAddProduct] = useState({
        product_name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        product_img: '',
        loginId: id
    })

    console.log('AddProduct====>', addProduct);

    const [error, setError] = useState({})



    const addproductChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setAddProduct({ ...addProduct, [name]: value })
    }

    const validation = () => {
        const errorMessage = {}

        if (!addProduct.product_name.trim()) {
            errorMessage.product_name = 'Product name is required'
        } if (!addProduct.description.trim()) {
            errorMessage.description = 'Description is required'
        } if (!addProduct.price.trim()) {
            errorMessage.price = 'Price is required'
        } if (!addProduct.quantity.trim()) {
            errorMessage.quantity = 'Quantiyy is required'
        } if (!addProduct.category.trim()) {
            errorMessage.category = 'Category is required'
        } if (!addProduct.product_img) {
            errorMessage.product_img = 'Image is required'
        }
        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    }

    const submit = (event) => {

        event.preventDefault()

        if (!validation()) {
            console.log('error===>');
            return;
        }


        const data = new FormData();
        data.append('product_name', addProduct.product_name)
        data.append('description', addProduct.description)
        data.append('quantity', addProduct.quantity)
        data.append('category', addProduct.category)
        data.append('price', addProduct.price)
        data.append('product_img', addProduct.product_img)
        data.append('loginId', id)

        
        for (const value of data.values()) {
            console.log(value);
        }





        axios.post(`http://localhost:3005/api/product/add_product`, data).then((res) => {
            console.log('res====>', res.data.message);
            toast.success(res.data.message)

        }).catch((error) => {
            console.log('error====>', error);
            toast.error(error)
        })



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
                        <h1 className='addproduct-h1'>Add Product</h1>

                        <div className='catgory'>
                            <label className="addproduct-label" >Choose a category : </label>
                            <select name='category' className='addproduct-select' onChange={addproductChange}>
                                <option className="addproduct-option-field" ></option>
                                <option value={'Pottery_ArtWork'} className="addproduct-option-field" >Pottery ArtWork</option>
                                <option value={'ArtWork'} className="addproduct-option-field" >ArtWork</option>
                                <option value={'Glass_ArtWork'} className="addproduct-option-field" >Glass ArtWork</option>
                                <option value={'Embroidery_ArtWork'} className="addproduct-option-field" >Embroidery ArtWork</option>
                                <option value={'Woodworking'} className="addproduct-option-field" >Woodworking</option>
                            </select>
                            <span className='span'>{error.category}</span>
                        </div>

                        <div className="mb-3">
                            <span className='span'>{error.product_img}</span>
                            <input className="addproduct-input-file" type="file" name='product_img' onChange={(event) => { setAddProduct({ ...addProduct, product_img: event.target.files[0] }) }} id="formFile" />
                        </div>
                        <div className="addproduct-input-box">
                            <div className="addproduct-input-field">
                                <span className='span'>{error.product_name}</span>
                                <input type="text" placeholder="Product Name" name='product_name' onChange={addproductChange} required="" />
                            </div>
                            <div className="addproduct-input-field">
                                <span className='span'>{error.description}</span>
                                <input type="text" placeholder="Description" name='description' onChange={addproductChange} required="" />
                            </div>
                        </div>
                        <div className="addproduct-input-box">
                            <div className="addproduct-input-field">
                                <span className='span'>{error.price}</span>
                                <input type="text" placeholder="Price" name='price' onChange={addproductChange} required="" />
                            </div>
                            <div className="addproduct-input-field">
                                <span className='span'>{error.quantity}</span>
                                <input type="text" placeholder="Quantity" name='quantity' onChange={addproductChange} required="" />
                            </div>
                        </div>
                        <button type="submit" className="addproduct-btn" onClick={submit}>
                            <b>Add Product</b>
                        </button>
                    </form>
                </div>
            </div >

        </div >
    )
}
