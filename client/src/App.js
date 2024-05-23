import './App.css';
import AddProduct from './components/AddProduct';
import CommonNavbar from './components/CommonNavbar';
import ShowProducts from './components/ShowProducts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateProduct from './components/UpdateProduct';
import ProductDetail from './components/ProductDetail';
import DeleteProduct from './components/DeleteProduct';
import Login from './components/user/Login';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { set } from 'lodash';

function App() {
  const [token, setToken] = useState(Cookies.get('token'))
  // useEffect(() => {
  //   setToken(Cookies.get('token'))
    
  // }, [Cookies.get('token')])
  
  return (
    <div className="App">
      <Router>
    {token?<CommonNavbar setToken={setToken} />:''}
        <Routes>
          <Route path = '/' element={<Login setToken={setToken} />}/>
          {token?(
            <>        
            <Route path = '/product' element={<ShowProducts />}/>
            <Route path = '/add' element={<AddProduct />}/>
            <Route path = '/:id/' element={<ProductDetail />}/>
            <Route path = '/:id/update' element={<UpdateProduct />}/>
            <Route path='/:id/delete' element={<DeleteProduct />}/>
            </>
          ):''}
        </Routes>
      </Router>
      
    </div>
  );
} 

export default App;
