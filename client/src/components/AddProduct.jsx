import React, {useReducer, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { httpclient } from '../api/http';


const actionTypes = {
  SET_IMAGE: 'SET_IMAGE',
  SET_NAME: 'SET_NAME',
  SET_PRICE: 'SET_PRICE',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  SET_CATEGORY: 'SET_CATEGORY',
};

const reducer =(state,action)=>{
switch (action.type) {
  case actionTypes.SET_IMAGE:
    return { ...state, image: action.payload }

  case actionTypes.SET_NAME:
    return{...state, name:action.payload }

  case actionTypes.SET_PRICE:
    return{...state, price:action.payload }

  case actionTypes.SET_DESCRIPTION:
    return{ ...state, description:action.payload }

  case actionTypes.SET_CATEGORY:
    return{ ...state, category:action.payload }
  default:
    return state
  }
}
export default function AddProduct() {
  const [state,dispatch] = useReducer(reducer,actionTypes)
  const [imagePreview, setImagePreview] = useState(null);

  const history = useNavigate();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    dispatch({ type: actionTypes.SET_IMAGE, payload: selectedImage });

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const AddProductInfo = async()=>{
try{
    let formField = new FormData();
    formField.append('image',state.image)
    formField.append('name',state.name)
    formField.append('price',state.price)
    formField.append('description',state.description)
    formField.append('category',state.category)
    debugger
    await httpclient('post','http://localhost:8000/products/',formField)
      console.log('insert');
     history('/product',{replace: true})
}catch(e){
  console.log(e);
}
  }
  return (
    <div>
      <p>Add Product</p>
      <div className='container'>
        <div className='form-group'>
          <div className='form-control'>
          {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            )}
          <input 
            type="file"
            name='image'
            className='file'
            onChange={handleImageChange}
            // onChange={(e) => dispatch({type:actionTypes.SET_IMAGE,payload:e.target.files[0]})}
             />
            <input 
            type="text"
            className='inputField'
            placeholder='Enter Product Name'
            name='name'
            value={state.name}
            onChange={(e) => dispatch({type:actionTypes.SET_NAME,payload:e.target.value})}
             />

          <input 
            type="text"
            className='inputField'
            placeholder='Enter Product Price'
            price='price'
            value={state.price}
            onChange={(e) => dispatch({type:actionTypes.SET_PRICE,payload:e.target.value})}
             />

            <input 
            type="text"
            className='inputField'
            placeholder='Enter Product Description'
            description='description'
            value={state.description}
            onChange={(e) => dispatch({type:actionTypes.SET_DESCRIPTION,payload:e.target.value})}
             />

            <input 
            type="text"
            className='inputField'
            placeholder='Enter Product Category'
            description='category'
            value={state.category}
            onChange={(e) => dispatch({type:actionTypes.SET_CATEGORY,payload:e.target.value})}
             />
          </div>
          <button class='btn btn-success' onClick={()=>AddProductInfo()}>Submit</button>
          <NavLink className='btn btn-danger m-2' to={'/product'} >Cancel</NavLink>

        </div>
      </div>
    </div>
  )
}
