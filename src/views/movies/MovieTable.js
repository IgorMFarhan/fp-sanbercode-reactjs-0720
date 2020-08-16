import React, { useContext, useEffect, useState } from "react";
import {
  CDataTable,
  CButton,
  CCollapse,
  CCardBody,
  CLink,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CContainer,
  CRow,
  CCol,
  CImg,
  CListGroup,
  CModalFooter,
  CListGroupItem,
  CBadge,
} from "@coreui/react";
import { MovieContext } from "../../context/MovieContext";
import Axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const MovieTable = () => {
  const [movies, setMovies] = useContext(MovieContext);
  const [details, setDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [auth] = useContext(AuthContext);

  // tombol untuk melihat detail
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "title", _style: { width: "40%" } },
    { key: "year", _style: { width: "20%" } },
    { key: "duration", _style: { width: "20%" } },
    { key: "genre", _style: { width: "20%" } },
    { key: "rating", _style: { width: "10%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  useEffect(() => {
    if (movies.list === null) {
      Axios.get(movies.url).then((res) => {
        setMovies({
          ...movies,
          list: res.data.map((movie) => {
            return {
              id: movie.id,
              title: movie.title,
              description: movie.description,
              year: movie.year,
              duration: movie.duration,
              genre: movie.genre,
              rating: movie.rating,
              review: movie.review,
              image_url: movie.image_url,
            };
          }),
        });
      });
    }
  }, [movies, setMovies]);

  const showModal = (e) => {
    if (e !== undefined) {
      let selected = movies.list.find((movie) => movie.id === parseInt(e.target.name));
      (setSelectedMovie({ ...selected }));
    }
    setModal(!modal);
  };

  return (
    <div>
      <CDataTable
        responsive
        items={movies.list}
        fields={fields}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Show"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <CLink onClick={showModal} name={item.id} className="h3">
                    {item.title}
                  </CLink>
                  <p className="text-muted">
                    Description: {item.description ? item.description : "-"}
                  </p>
                  <p className="text-muted">
                    Review: {item.review ? item.review : "-"}
                  </p>
                  Poster link:{" "}
                  {item.image_url ? (
                    item.image_url.includes("http" || ".com") ? (
                      <CLink href={item.image_url} target="_blank">
                        {item.image_url}
                      </CLink>
                    ) : (
                        "link is invalid"
                      )
                  ) : (
                      "-"
                    )}
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
      {/* Modal */}
      <CModal show={modal} onClose={showModal} size="xl">
        <CModalHeader closeButton>
          <CModalTitle>{selectedMovie.title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol md={4}>
                <CImg
                  src={selectedMovie.image_url}
                  fluid
                  alt="Poster"
                  width="100%"
                />
              </CCol>
              <CCol md={8}>
                <CListGroup className="text-sm">
                  <CListGroupItem>Year: {selectedMovie.year}</CListGroupItem>
                  <CListGroupItem>Genre: {selectedMovie.genre}</CListGroupItem>
                  <CListGroupItem>
                    Duration: {selectedMovie.duration} min
                  </CListGroupItem>
                  <CListGroupItem>
                    Ratings :{" "}
                    {selectedMovie.rating ? selectedMovie.rating + " " : "-"}
                    <CBadge
                      className="lg"
                      color={
                        selectedMovie.rating
                          ? selectedMovie.rating >= 7.5
                            ? "success"
                            : "danger"
                          : "-"
                      }
                    >
                      {selectedMovie.rating
                        ? selectedMovie.rating >= 7.5
                          ? "Good"
                          : "Bad"
                        : ""}
                    </CBadge>
                  </CListGroupItem>
                  <CListGroupItem className="text-justify">
                    Description : {selectedMovie.description}
                  </CListGroupItem>
                  <CListGroupItem className="text-justify">
                    Review : {selectedMovie.review}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          {
            auth.status === true ?
              <CLink to={`/movie/edit/${selectedMovie.id}`}>
                <CButton color="warning">Edit</CButton>{" "}
              </CLink>
              :
              ""
          }
          <CButton color="secondary" onClick={showModal}>
            Cancel
            </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default MovieTable;
