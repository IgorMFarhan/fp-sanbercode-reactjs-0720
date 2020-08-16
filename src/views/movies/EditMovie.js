import React, { useContext, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  CContainer,
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CCardTitle,
  CCardBody,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CButton,
  CImg,
  CListGroup,
  CListGroupItem,
  CTextarea,
  CBadge,
  CCardFooter,
} from "@coreui/react";
import { Redirect } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { AuthContext } from "../../context/AuthContext";

const EditMovie = ({ match }) => {
  const [movies, setMovies] = useContext(MovieContext);

  const selectedMovie = movies.list ? movies.list.find(
    (movie) => movie.id === parseInt(match.params.id)
  ) : "";
  const [newMovie, setNewMovie] = useState({ ...selectedMovie });
  const [auth] = useContext(AuthContext);

  const handleChange = (e) => {
    switch (e.target.name) {
      default:
      case "title":
        setNewMovie({
          ...newMovie,
          title: e.target.value,
        });
        break;
      case "description":
        setNewMovie({
          ...newMovie,
          description: e.target.value,
        });
        break;
      case "year":
        setNewMovie({
          ...newMovie,
          year: parseInt(e.target.value),
        });
        break;
      case "genre":
        setNewMovie({
          ...newMovie,
          genre: e.target.value,
        });
        break;
      case "duration":
        setNewMovie({
          ...newMovie,
          duration: parseInt(e.target.value),
        });
        break;
      case "review":
        setNewMovie({
          ...newMovie,
          review: e.target.value,
        });
        break;
      case "rating":
        setNewMovie({
          ...newMovie,
          rating: parseFloat(e.target.value),
        });
        break;
      case "image_url":
        setNewMovie({
          ...newMovie,
          image_url: e.target.value,
        });
        break;
    }
  };

  const handleDelete = (e) => {
    let newList = movies.list.filter((movie) => movie.id !== selectedMovie.id);
    Swal.fire({
      icon: "warning",
      title: "Are you sure? ",
      text: "Deleted data cannot be restored",
      showCancelButton: true,
      confirmButtonText: "Sure",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((res) => {
      if (res.value) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Data successfully deleted!",
        });
        Axios.delete(`${movies.url}/${selectedMovie.id}`).then((res) => {
          console.log(res);
        });
        setMovies({ ...movies, list: [...newList] });
        setNewMovie(null);
      }
    });
  };

  const updateData = async () => {
    const res = await Axios.get(movies.url);
    await setMovies({
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMovie.year.toString().length === 4 && newMovie.rating <= 10) {
      Axios.put(`${movies.url}/${newMovie.id}`, { ...newMovie })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Data successfully updated",
          });
        })
        .then(updateData);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Year should be 4 digit and/or maximum rating is 10 ",
      });
    }
  };

  return (
    <>
      {auth.status ?

        <CContainer>
          {selectedMovie !== null && newMovie ? (
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <CCardTitle className="text-center">Edit Form</CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                      <CFormGroup>
                        <CLabel htmlFor="titla">Title</CLabel>
                        <CInput
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Enter movie title"
                          autoComplete="title"
                          onChange={handleChange}
                          value={newMovie.title}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="year">Year (4 digit)</CLabel>
                        <CInput
                          type="number"
                          id="year"
                          name="year"
                          placeholder="Enter movie release year"
                          autoComplete="year"
                          onChange={handleChange}
                          value={newMovie.year}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="rating">Rating (1-10)</CLabel>
                        <CInput
                          type="number"
                          id="rating"
                          name="rating"
                          placeholder="Enter movie rating"
                          autoComplete="rating"
                          onChange={handleChange}
                          value={newMovie.rating}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="duration">Duration (minutes)</CLabel>
                        <CInput
                          type="number"
                          id="duration"
                          name="duration"
                          placeholder="Enter movie duration"
                          autoComplete="duration"
                          onChange={handleChange}
                          value={newMovie.duration}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="genre">Genre</CLabel>
                        <CInput
                          type="text"
                          id="genre"
                          name="genre"
                          placeholder="Enter movie genre"
                          autoComplete="genre"
                          onChange={handleChange}
                          value={newMovie.genre}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="description">Description</CLabel>
                        <CTextarea
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Enter movie description"
                          autoComplete="description"
                          onChange={handleChange}
                          value={newMovie.description}
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="review">Review</CLabel>
                        <CTextarea
                          type="text"
                          id="review"
                          name="review"
                          placeholder="Enter movie review"
                          autoComplete="review"
                          onChange={handleChange}
                          value={newMovie.review}
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="image_url">Image / Poster Url</CLabel>
                        <CInput
                          type="text"
                          id="image_url"
                          name="image_url"
                          placeholder="Enter movie poster url"
                          autoComplete="image_url"
                          onChange={handleChange}
                          value={newMovie.image_url}
                        />
                      </CFormGroup>
                      <CButton type="submit" color="warning" block>
                        <CIcon name="cil-send" />
                    Update
                  </CButton>
                    </CForm>
                  </CCardBody>
                  <CCardFooter>
                    <CButton
                      color="danger"
                      className="float-right"
                      onClick={handleDelete}
                      block
                    >
                      <CIcon name="cil-trash" />
                  Delete
                </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
              <CCol>
                <CCard
                  style={{
                    borderRadius: "15px",
                  }}
                >
                  <CCardTitle className="text-center m-3">
                    {newMovie.title}
                  </CCardTitle>
                  <CCardBody>
                    <CRow>
                      <CCol>
                        <CImg
                          fluid
                          src={newMovie.image_url}
                          width="100%"
                          height="auto"
                        />
                      </CCol>
                      <CCol>
                        <CListGroup className="block">
                          <CListGroupItem>
                            <strong> Year: </strong> {newMovie.year}
                          </CListGroupItem>
                          <CListGroupItem>
                            <strong> Rating: </strong>{" "}
                            {newMovie.rating ? newMovie.rating + " " : "-"}
                            <CBadge
                              className="lg"
                              color={
                                newMovie.rating
                                  ? newMovie.rating >= 7.5
                                    ? "success"
                                    : "danger"
                                  : "-"
                              }
                            >
                              {newMovie.rating
                                ? newMovie.rating >= 7.5
                                  ? "Good"
                                  : "Bad"
                                : ""}
                            </CBadge>{" "}
                          </CListGroupItem>
                          <CListGroupItem>
                            <strong> Duration: </strong> {newMovie.duration} min
                      </CListGroupItem>
                          <CListGroupItem>
                            <strong> Genre: </strong> {newMovie.genre}
                          </CListGroupItem>
                        </CListGroup>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol className="mt-3">
                        <CListGroup>
                          <CListGroupItem className="text-justify">
                            <strong> Description: </strong> {newMovie.description}
                          </CListGroupItem>
                          <CListGroupItem className="text-justify">
                            <strong> Review: </strong> {newMovie.review}
                          </CListGroupItem>
                        </CListGroup>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
              <Redirect to="/movie/list" />
            )}
        </CContainer>
        :

        <Redirect to="/" />
      }
    </>
  );
};

export default EditMovie;
