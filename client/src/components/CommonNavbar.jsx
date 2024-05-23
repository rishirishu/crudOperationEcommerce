import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function CommonNavbar({setToken}) {
  const history = useNavigate()
  const handleLogout = async()=>{
    // let resp = axios.post('http://127.0.0.1:8000/users/logout/',{token:Cookies.get('token')})
    // if (resp.status==200){
      Cookies.remove('token')
      setToken('')
      history('/',{replace:true})
    // }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">Products</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className={'navspace'} to={'/product'}>Show Products</NavLink>
            <NavLink className={'navspace'} to={'/add'}>Add Products</NavLink>
          </Nav>
          <CDropdown style={{paddingRight:'30px'}}>
            <CDropdownToggle><CgProfile size={'30px'}/></CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={handleLogout}>Logout</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
    </Navbar>
  );
}

export default CommonNavbar;