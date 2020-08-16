import React, { useContext } from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AuthContext } from '../context/AuthContext'

const TheHeaderDropdown = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.clear();
    setAuth({ ...auth, status: false, currentUser: { id: null, username: '', password: '' } });
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-6"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/1.jpg'}
            className="c-avatar-img"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem to="/change-password">
          <CIcon name="cil-fingerprint" className="mfe-2" />Change Password
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>

  )
}

export default TheHeaderDropdown
