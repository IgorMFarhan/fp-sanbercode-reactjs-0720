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
  CBadge,
} from "@coreui/react";

class MovieCard extends Component {
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
            <h5 className="card-title">
              {this.props.title} ({this.props.rating}/10){" "}
              <CBadge
                className="lg"
                color={
                  this.props.rating
                    ? this.props.rating >= 7.5
                      ? "success"
                      : "danger"
                    : "-"
                }
              >
                {this.props.rating
                  ? this.props.rating >= 7.5
                    ? "Good"
                    : "Bad"
                  : ""}
              </CBadge>
            </h5>
            <h6 className="card-subtitle"> {this.props.year}</h6>
            {
              this.props.status === true ?
                <CLink to={`/movie/edit/${this.props.id}`} className="float-left">
                  <CButton>Edit</CButton>
                </CLink>
                : ""
            }
            <CButton className="float-right m-0" onClick={this.showModal}>
              Show Details
            </CButton>
          </CCardBody>
        </CCard>
        <CModal show={this.state.modal} onClose={this.showModal} size="xl">
          <CModalHeader closeButton>
            <CModalTitle>{this.props.title}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CContainer fluid>
              <CRow>
                <CCol md={4}>
                  <CImg
                    src={this.props.image_url}
                    fluid
                    alt="Poster"
                    width="100%"
                  />
                </CCol>
                <CCol md={8}>
                  <CListGroup className="text-sm">
                    <CListGroupItem>Year: {this.props.year}</CListGroupItem>
                    <CListGroupItem>Genre: {this.props.genre}</CListGroupItem>
                    <CListGroupItem>
                      Duration: {this.props.duration} Minutes
                    </CListGroupItem>
                    <CListGroupItem>
                      Ratings :{" "}
                      {this.props.rating ? this.props.rating + " " : "-"}
                      <CBadge
                        className="lg"
                        color={
                          this.props.rating
                            ? this.props.rating >= 7.5
                              ? "success"
                              : "danger"
                            : "-"
                        }
                      >
                        {this.props.rating
                          ? this.props.rating >= 7.5
                            ? "Good"
                            : "Bad"
                          : ""}
                      </CBadge>
                    </CListGroupItem>
                    <CListGroupItem>
                      Description : {this.props.description}
                    </CListGroupItem>
                    <CListGroupItem>
                      Review : {this.props.review}
                    </CListGroupItem>
                  </CListGroup>
                </CCol>
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            {
              this.props.status === true ?
                <CLink to={`/movie/edit/${this.props.id}`}>
                  <CButton color="warning">Edit</CButton>{" "}
                </CLink>
                :
                ""
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

export default MovieCard;
