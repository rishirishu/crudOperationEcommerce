import { CButton,CFormInput, CFormLabel } from '@coreui/react'
import React, { useState } from 'react'
import '../css/LoginForm.css'; 
import { httpclient } from '../../api/http';
import {useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Login({setToken}) {
    const [state,setstate] = useState({email:'',password:''})
    const history = useNavigate();
    console.log(state,'loginstate');

    const loginUser = async ()=>{
        debugger
        const formData = new FormData();
        for (const key in state) {
            formData.append(key, state[key]);
        }
        // let resp = await httpclient('post','http://localhost:8000/users/login/',formData)
        let resp = await axios.post('http://localhost:8000/users/login/',formData)
        console.log(resp.data);
        const token = resp.data?.token;
        await Cookies.set('token', token, { expires: 1, secure: true });
        setToken(token)
        resp.status===200?history('/product',{replace: true}):history('/',{replace: true})
    }
    const handleInput = (e)=>{
        debugger
        console.log(e.target.name);
        setstate({...state,[e.target.name]:e.target.value})
    }
    return (
        <div className="background">
            <h3>Login Here</h3>
            <CFormLabel>Username</CFormLabel>
            <CFormInput 
            type="text" 
            placeholder="Enter Email" 
            name='email'
            onChange={handleInput}
            />
    
            <CFormLabel>Password</CFormLabel>
            <CFormInput 
            type="password" 
            placeholder="Password" 
            name='password'
            onChange={handleInput}
            />
            <br/>
            <CButton type="button" color='success' onClick={loginUser}>Log In</CButton>
        </div>
      );
    };