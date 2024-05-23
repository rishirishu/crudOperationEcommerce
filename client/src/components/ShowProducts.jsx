import { CFormInput, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useReducer } from 'react'
import { FaEdit, FaSort } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { CrudType, args } from '../reducer/ShowProductsReducer';
import PaginationControlled from './Pagination';
import { httpclient } from '../api/http';
import { BiReset } from "react-icons/bi";


export default function ShowProducts() {
  const [state, dispatch] = useReducer(...args)
  debugger

  console.log(state, 'state');
  const navigate = useNavigate();
  const getProduct = async () => {
    debugger
    const response = await httpclient('get', 'http://localhost:8000/products/', { ...state.search, ordering: state.sort ? '-' + state.sort : '' })
    debugger
    dispatch({ type: CrudType.SETDATA, payload: response.data })
  }

  useEffect(() => {
    getProduct()
  }, [state.sort, state.search]);

  const handleInput = (e) => {
    debugger
    e && dispatch({ type: CrudType.SEARCH, payload: { [e.target.name]: e.target.value } })

  }

  const handleicon = (id, edit = false) => {
    debugger
    // edit ? navigate(`/${id}/update`) : navigate(`/${id}/delete`)
    // swal({
    //   content: <div>Hello world!</div>,
    //   buttons: true,
    // });
  }

  return (
    <>
      <div style={{ padding: '20px' }}>
        <CTable>
          <CTableHead>
            <CTableHeaderCell>
              <div className='position-relative' style={{ display: 'flex', alignItems: 'center', backgroundColor: "#ade8fd" }}>
                <CFormInput
                  type='text'
                  name='name'
                  placeholder='Name'
                  onChange={handleInput}
                  className='InputText'
                />
                <div style={{ marginLeft: '5px' }}>
                  <FaSort onClick={() => dispatch({ type: CrudType.SORT, payload: 'name' })} />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell>
              <div className='position-relative' style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ade8fd' }}>
                <CFormInput
                  type='text'
                  name='price'
                  placeholder='Price'
                  onChange={handleInput}
                  className='InputText'
                />
                <div style={{ marginLeft: '5px' }}>
                  <FaSort onClick={() => dispatch({ type: CrudType.SORT, payload: 'price' })} />
                </div>
              </div>
            </CTableHeaderCell>

            <CTableHeaderCell>
              <div className='position-relative' style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ade8fd' }}>
                <CFormInput
                  type='text'
                  name='description'
                  placeholder='Description'
                  onChange={handleInput}
                  className='InputText'
                />
                <div style={{ marginLeft: '5px' }}>
                  <FaSort onClick={() => dispatch({ type: CrudType.SORT, payload: 'description' })} />
                </div>
              </div>
            </CTableHeaderCell>

            <CTableHeaderCell>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ade8fd' }}>
                <CFormInput
                  type='text'
                  name='category'
                  placeholder='Category'
                  onChange={handleInput}
                  className='InputText'
                />
                <div style={{ marginLeft: '5px' }}>
                  <FaSort onClick={() => dispatch({ type: CrudType.SORT, payload: 'category' })} />
                </div>
              </div>
            </CTableHeaderCell>

            <CTableHeaderCell>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ade8fd' }}>
                <CFormInput type='text' placeholder='Image' disabled
                  className='InputText' />
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ade8fd' }}>
                <CFormInput type='text' placeholder='Action' disabled
                  className='InputText' />
                <BiReset size='20px' />
              </div>
            </CTableHeaderCell>
          </CTableHead>

          <CTableBody>
            {state.products.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell>
                  {item.name}
                </CTableHeaderCell>
                <CTableHeaderCell>
                  {item.price}
                </CTableHeaderCell>
                <CTableHeaderCell>
                  {item.description}
                </CTableHeaderCell>
                <CTableHeaderCell>
                  {item.category}
                </CTableHeaderCell>
                <CTableHeaderCell>
                  <img src={item.image} style={{ height: '40px', width: '40px' }} alt='' />
                </CTableHeaderCell>
                <CTableHeaderCell>
                  <FaEdit size='20px' onClick={() => handleicon(item.id, { edit: true })} />
                  <MdDelete size='20px' onClick={() => handleicon(item.id)} />
                </CTableHeaderCell>

              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <footer>
          <PaginationControlled
            data={state.products} />
        </footer>
      </div>
    </>
  )
}

