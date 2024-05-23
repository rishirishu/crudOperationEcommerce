import React, { useEffect, useReducer} from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { httpclient } from '../api/http';

// Define action types
const actionTypes = {
  SET_IMAGE: 'SET_IMAGE',
  SET_NAME: 'SET_NAME',
  SET_PRICE: 'SET_PRICE',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  SET_CATEGORY: 'SET_CATEGORY',
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_IMAGE:
      return { ...state, image: action.payload };
    case actionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case actionTypes.SET_PRICE:
      return { ...state, price: action.payload };
    case actionTypes.SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case actionTypes.SET_CATEGORY:
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export default function UpdateProduct() {
  debugger
  const [state, dispatch] = useReducer(reducer,actionTypes);

  const history = useNavigate();
  const { id } = useParams();

  const loadProducts = async () => {
    // const { data } = await axios.get(`http://localhost:8000/products/${id}`);
    const { data } = await httpclient('get',`http://localhost:8000/products/${id}`);
    console.log(data);
    dispatch({ type: actionTypes.SET_IMAGE, payload: data.image });
    dispatch({ type: actionTypes.SET_NAME, payload: data.name });
    dispatch({ type: actionTypes.SET_PRICE, payload: data.price });
    dispatch({ type: actionTypes.SET_DESCRIPTION, payload: data.description });
    dispatch({ type: actionTypes.SET_CATEGORY, payload: data.category });
  };

  useEffect(() => {
    loadProducts();
  },[]);

  const UpdateProductInfo = async () => {
    try {
      let formField = new FormData();
      formField.append('image', state.image);
      formField.append('name', state.name);
      formField.append('price', state.price);
      formField.append('description', state.description);
      formField.append('category', state.category);

      // await axios.put(`http://localhost:8000/products/${id}/`, formField);
      await httpclient('put',`http://localhost:8000/products/${id}/`,formField);
      console.log('insert');
      history('/product', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <p>Update Product</p>
      <div className='container'>
        <div className='form-group'>
          <div className='form-control'>
            <img src={state.image} style={{ height: '120px', width: '120px' }} alt='' />
            <input
              type='file'
              name='image'
              className='file'
              onChange={(e) => dispatch({ type: actionTypes.SET_IMAGE, payload: e.target.files[0] })}
            />
            <input
              type='text'
              name='name'
              value={state.name}
              className='inputField'
              onChange={(e) => dispatch({ type: actionTypes.SET_NAME, payload: e.target.value})}
            />
            <input
              type='text'
              name='price'
              value={state.price}
              className='inputField'
              onChange={(e) => dispatch({ type: actionTypes.SET_PRICE, payload: e.target.value})}
            />
             <input
              type='text'
              name='description'
              value={state.description}
              className='inputField'
              onChange={(e) => dispatch({ type: actionTypes.SET_DESCRIPTION, payload: e.target.value})}
            />
            <input
              type='text'
              name='category'
              value={state.category}
              className='inputField'
              onChange={(e) => dispatch({ type: actionTypes.SET_CATEGORY, payload: e.target.value})}
            />
          </div>
          <button className='btn btn-success' onClick={() => UpdateProductInfo()}>
            Submit
          </button>
          <NavLink className='btn btn-primary m-2' to={'/product'}>
            Cancel
          </NavLink>
        </div>
      </div>
    </div>
  );
}