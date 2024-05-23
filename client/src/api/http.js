import axios from 'axios'
import Cookies from 'js-cookie';

const http = axios.create({
    timeout: 100000000000
  });

export const httpclient = async(method,url,data='')=>{
    const token = "Bearer "+Cookies.get('token');
    const headers = { 'Authorization':token };
    switch (method) {
        case 'get':
            debugger
        return http.get(url,{
            params:data,
            headers:headers
        })

        case 'post':
            debugger
            return http.post(url,data,{headers:headers})

        case 'put':
            return http.put(url,data,{headers:headers})
            
        case 'delete':
            return http.delete(url,{
                params:data,
                headers:headers
            })

        default:
            break;
    }

}