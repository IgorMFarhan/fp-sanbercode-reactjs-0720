import React, { Component } from "react";
import "@coreui/react";
import {
  CCard,
  CCardBody,
  CCol,
  CImg,
  CLink,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CContainer,
  CListGroup,
  CListGroupItem,
  CRow,
} from "@coreui/react";

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  showModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    return (
      <CCol md={3}>
        <CCard className="mb-3" style={{ borderRadius: "15px" }}>
          <CImg
            fluid
            width="100%"
            height={"auto"}
            src={this.props.image_url}
            className="p-3"
            style={{ borderRadius: "15px" }}
          />
          <CCardBody>
            <h5 className="card-title">{this.props.name}</h5>
            <h6 className="card-subtitle"> {this.props.release}</h6>

            {
              this.props.status ?
                <CLink
                  to={`/game/edit/${this.props.id}`}
                  className="float-left m-0"
                >
                  <CButton>Edit</CButton>
                </CLink>
                : ""

            }
            <CButton className="float-right m-0" onClick={this.showModal}>
              Show Details
            </CButton>
          </CCardBody>
        </CCard>
        <CModal show={this.state.modal} onClose={this.showModal} size="lg">
          <CModalHeader closeButton>
            <CModalTitle>{this.props.name}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CContainer fluid>
              <CRow>
                <CCol md={5}>
                  <CImg
                    src={this.props.image_url}
                    fluid
                    alt="Poster"
                    width="100%"
                  />
                </CCol>
                <CCol md={7}>
                  <CListGroup className="text-sm">
                    <CListGroupItem>
                      Release: {this.props.release}
                    </CListGroupItem>
                    <CListGroupItem>Genre: {this.props.genre}</CListGroupItem>
                    <CListGroupItem>
                      Platform: {this.props.platform}
                    </CListGroupItem>
                    <CListGroupItem>
                      Single Player Available : {this.props.singlePlayer}
                    </CListGroupItem>
                    <CListGroupItem>
                      Multiplayer Available : {this.props.multiplayer}
                    </CListGroupItem>
                  </CListGroup>
                </CCol>
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            {
              this.props.status ?
                <CLink to={`/game/edit/${this.props.id}`}>
                  <CButton color="warning">Edit</CButton>{" "}
                </CLink>
                : ""

            }
            <CButton color="secondary" onClick={this.showModal}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    );
  }
}

export default GameCard;
