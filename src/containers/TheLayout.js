import React, { useContext } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { AuthContext } from '../context/AuthContext'
import { CAlert } from '@coreui/react';


const TheLayout = () => {

  const [auth, setAuth] = useContext(AuthContext);
  const checkAuth = () => {
    if (localStorage.getItem('loginStatus') === 'true') {
      setAuth({
        ...auth, status: true, currentUser: {
          id: localStorage.getItem('id'),
          username: localStorage.getItem('username'),
          passowrd: localStorage.getItem('passowrd'),
        }
      });
      return true;
    }
  }

  return (
    <div className="c-app c-default-layout">
      {checkAuth && auth.status === true ?
        (
          <>
            <TheSidebar />
            <div className="c-wrapper">
              <TheHeader />
              <div className="c-body">
                <TheContent />
              </div>
              <TheFooter />
            </div>
          </>
        )
        :
        <>
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </>
      }
    </div>
  )
}

export default TheLayout
