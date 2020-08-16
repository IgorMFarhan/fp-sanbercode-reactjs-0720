import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
} from "./index";
import { AuthContext } from "../context/AuthContext";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const [auth] = useContext(AuthContext);

  return (
    <CHeader withSubheader>
      {
        auth.status === true ?
          <>
            <CToggler
              inHeader
              className="ml-md-3 d-lg-none"
              onClick={toggleSidebarMobile}
            />
            <CToggler
              inHeader
              className="ml-3 d-md-down-none"
              onClick={toggleSidebar}
            />
          </>
          : ""
      }
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">

        {
          auth.status ?
            ""
            :
            <>
              <CHeaderNavItem className="px-3">
                <CHeaderNavLink to="/dashboard">
                  Dashboard
                </CHeaderNavLink>
              </CHeaderNavItem>
              <CHeaderNav className="px-3">
                <CHeaderNavLink to="/movie/list">
                  Movie
                </CHeaderNavLink>
              </CHeaderNav>
              <CHeaderNav className="px-3">
                <CHeaderNavLink to="/game/list">
                  Game
                </CHeaderNavLink>
              </CHeaderNav>
            </>
        }
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {
          auth.status ?
            <TheHeaderDropdown />
            :
            <CHeaderNavLink to="/login">
              Login
            </CHeaderNavLink>
        }
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
