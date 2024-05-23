import React, { useEffect, useReducer} from 'react'
import axios  from 'axios'
import {NavLink, useNavigate, useParams } from 'react-router-dom'
import { httpclient } from '../api/http'

const initialstate = {
  products :[],
}

const reducer = (state, action)=>{
switch (action.type) {
  case 'getdata':
    return {
      ...state,
      products:action.payload,
    }
  default:
    return state
}
}
export default function DeleteProduct() {
  debugger
    // const [product,getProduct] = useState([])
    const [state,dispatch] = useReducer(reducer,initialstate)
    const {id} = useParams();
    const history = useNavigate();

    const productDetail = async () =>{
      //  const resp =  await axios.get(`http://localhost:8000/products/${id}/`)
       const resp =  await httpclient('get',`http://localhost:8000/products/${id}/`)
       dispatch({type:'getdata',payload:resp.data})
    }
    useEffect(()=>{
        productDetail()
    },[])


    const deleteProduct = async () =>{
        // const resp =  await axios.delete(`http://localhost:8000/products/${id}/`)
        const resp =  await httpclient('delete',`http://localhost:8000/products/${id}/`)

        console.log('delete');
        history('/product',{replace: true});
    }
    return (
        <div>
          <h1> Delete Product</h1>
          <div className='single-product-info'>
          <img src={state.products.image} height='10%' width='10%'  />
            <p>{state.products.name}</p>
            <p>{state.products.price}</p>
            <p>{state.products.description}</p>
            <p>{state.products.category}</p>
          <button className='btn btn-danger m-2' to={'/'} onClick={()=>deleteProduct()}>Delete</button>
          <NavLink className='btn btn-success m-2' to={'/product'} >Cancel</NavLink>

          </div>
        </div>
      )
    }
