import axios from 'axios'
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

export default function ProductDetail() {
  const [product, setProduct] = useState('')

  const { id } = useParams();
  const getSingleProduct = async()=>{
    const {data} = await axios.get(`http://localhost:8000/products/${id}`)
    console.log(data);
    setProduct(data)
  }

  useEffect(()=>{
    getSingleProduct()
  },[])

  return (
    <div>
      <h1>ProductDetail</h1>
      <div className='single-product-info'>
      <img src={product.image} height='10%' width='10%'  />
        <p>{product.name}</p>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <p>{product.category}</p>
      <NavLink className='btn btn-success m-2' to={`/${product.id}/update`}>Update</NavLink>
      <NavLink className='btn btn-danger m-2'>Delete</NavLink>
      </div>
    </div>
  )
}
