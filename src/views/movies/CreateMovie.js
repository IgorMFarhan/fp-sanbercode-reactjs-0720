import React, { useContext, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CCol,
  CTextarea,
  CButton,
  CImg,
} from "@coreui/react";
import { MovieContext } from "../../context/MovieContext";
import Axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";

const CreateMovie = () => {
  const [movies, setMovies] = useContext(MovieContext);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    year: "",
    duration: "",
    genre: "",
    rating: "",
    review: "",
    image_url: "",
  });
  const [auth] = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMovie.year.toString().length === 4 && newMovie.rating <= 10) {
      Axios.post(movies.url, { ...newMovie }).then((res) => {
        // console.log(res);
        setMovies({
          ...movies,
          list: [
            ...movies.list,
            {
              id: res.data.id,
              title: res.data.title,
              description: res.data.description,
              year: res.data.year,
              duration: res.data.duration,
              genre: res.data.genre,
              rating: res.data.rating,
              review: res.data.review,
              image_url: res.data.image_url,
            },
          ],
        });
      });
      Swal.fire({
        title: "Success!",
        text: `Film ${newMovie.title} berhasil ditambahkan`,
        icon: "success",
        confirmButtonText: "Cool",
      });
      setNewMovie({
        title: "",
        description: "",
        year: "",
        duration: "",
        genre: "",
        rating: "",
        review: "",
        image_url: "",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: `Tahun hanya boleh 4 digit dan rating maksimal 10`,
        icon: "error",
      });
    }
  };

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

  return (
    <CCard className="p-3">
      {auth.status ? (
        <CRow className="center">
          <CCol sm="3" className="center bg-dark m-3 p-0">
            {newMovie.image_url ? (
              <CImg src={newMovie.image_url} fluid width="100%" height="auto" />
            ) : (
              <div>
                <div className="text-center justify-content-center py-3 text-light">
                  <h3>Image Poster</h3>
                  <p>
                    Please input your image_url data to see the image poster
                  </p>
                </div>
              </div>
            )}
          </CCol>
          <CCol>
            <CCardHeader>
              <CCardTitle>
                <strong>Add Movie</strong>
              </CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="title">Title</CLabel>
                      <CInput
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Input title"
                        autoComplete="title"
                        onChange={handleChange}
                        value={newMovie.title}
                        required
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="year">Year</CLabel>
                      <CInput
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Input release year"
                        autoComplete="year"
                        onChange={handleChange}
                        value={newMovie.year}
                        required
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="rating">Rating</CLabel>
                      <CInput
                        type="number"
                        id="rating"
                        name="rating"
                        placeholder="Input rating"
                        autoComplete="rating"
                        onChange={handleChange}
                        value={newMovie.rating}
                        required
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="description">Description</CLabel>
                      <CTextarea
                        id="description"
                        name="description"
                        placeholder="Input description"
                        autoComplete="description"
                        onChange={handleChange}
                        value={newMovie.description}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="genre">Genre</CLabel>
                      <CInput
                        type="text"
                        id="genre"
                        name="genre"
                        placeholder="Input genre"
                        autoComplete="genre"
                        onChange={handleChange}
                        value={newMovie.genre}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="duration">Duration (min)</CLabel>
                      <CInput
                        type="number"
                        id="duration"
                        name="duration"
                        placeholder="Input duration"
                        autoComplete="duration"
                        onChange={handleChange}
                        value={newMovie.duration}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="image_url">Image / Poster Url</CLabel>
                      <CInput
                        type="text"
                        id="image_url"
                        name="image_url"
                        placeholder="Input movie poster url"
                        autoComplete="image_url"
                        onChange={handleChange}
                        value={newMovie.image_url}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="review">Review</CLabel>
                      <CTextarea
                        id="review"
                        name="review"
                        placeholder="Input review"
                        autoComplete="review"
                        onChange={handleChange}
                        value={newMovie.review}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CButton type="submit" color="success" size="lg">
                  Create Movie
                </CButton>
              </CForm>
            </CCardBody>
          </CCol>
        </CRow>
      ) : (
        <Redirect to="/" />
      )}
    </CCard>
  );
};

export default CreateMovie;
