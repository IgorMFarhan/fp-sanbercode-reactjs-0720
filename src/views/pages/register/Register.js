import React, { useContext, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCardFooter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AuthContext } from './../../../context/AuthContext.js';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

const Register = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [input, setInput] = useState({
    username: "",
    password: "",
    re_password: "",
    isSuccess: false,
  });

  const handleChange = (e) => {
    switch (e.target.name) {
      default:
      case "username":
        setInput({
          ...input,
          username: e.target.value,
        });
        break;
      case "password":
        setInput({
          ...input,
          password: e.target.value,
        });
        break;
      case "re_password":
        setInput({
          ...input,
          re_password: e.target.value,
        });
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.password === input.re_password) {
      Axios.post(auth.url, input)
        .then(res => {
          if (res.data.id !== undefined) {
            Swal.fire({
              icon: "success",
              title: "Sukses!",
              text: "Registration success, please login with your account",
            });
            setAuth({
              ...auth, list: [
                ...auth.list,
                { username: res.data.username },
              ],
            });
            setInput({ ...input, username: "", passowrd: "", re_password: "", isSuccess: true });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Username already registered, please use another one",
            })
          }
        })
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Make sure Password and Re-password are the same",
      })
    }
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {
        auth.status === false ?
          <CContainer>
            {
              input.isSuccess === false ?
                <CRow className="justify-content-center">
                  <CCol md="9" lg="7" xl="6">
                    <CCard className="mx-4">
                      <CCardBody className="p-4">
                        <CForm onSubmit={handleSubmit}>
                          <h1>Register</h1>
                          <p className="text-muted">Create your account</p>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput type="text" placeholder="Username" autoComplete="username" name="username" onChange={handleChange} required />
                          </CInputGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput type="password" placeholder="Password" autoComplete="new-password" name="password" onChange={handleChange} required />
                          </CInputGroup>
                          <CInputGroup className="mb-4">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput type="password" placeholder="Repeat password" autoComplete="new-password" name="re_password" onChange={handleChange} required />
                          </CInputGroup>
                          <CButton color="success" block type="submit">Create Account</CButton>
                        </CForm>
                      </CCardBody>
                      <CCardFooter>
                        <CLink to="/login" className="text-center">
                          <CButton className="text-center">Click here to login page</CButton>
                        </CLink>
                      </CCardFooter>
                    </CCard>
                  </CCol>
                </CRow>
                :
                <Redirect to="/login" />
            }
          </CContainer>
          : <Redirect to="/" />
      }
    </div>
  )
}

export default Register;
