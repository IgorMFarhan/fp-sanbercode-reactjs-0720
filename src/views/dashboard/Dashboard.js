import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

import MovieTable from "../movies/MovieTable.js";
import GameTable from "../games/GameTable.js";

const Dashboard = () => {

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="p-3 responsive">
            <CCardHeader className="text-center">
              <h3>Movies</h3>
            </CCardHeader>
            <CCardBody>
              <MovieTable />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="p-3 responsive">
            <CCardHeader className="text-center">
              <h3>Games</h3>
            </CCardHeader>
            <GameTable />
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
