import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext";
import {
  CCard,
  CRow,
  CCol,
  CImg,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CSelect,
} from "@coreui/react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CreateGame = () => {
  const [games, setGames] = useContext(GameContext);
  const [newGame, setNewGame] = useState({
    name: "",
    release: "",
    platform: "",
    genre: "",
    singlePlayer: "",
    multiplayer: "",
    image_url: "",
  });
  const [auth] = useContext(AuthContext);

  const handleChange = (e) => {
    switch (e.target.name) {
      default:
      case "name":
        setNewGame({
          ...newGame,
          name: e.target.value,
        });
        break;
      case "release":
        setNewGame({
          ...newGame,
          release: e.target.value,
        });
        break;
      case "genre":
        setNewGame({
          ...newGame,
          genre: e.target.value,
        });
        break;
      case "platform":
        setNewGame({
          ...newGame,
          platform: e.target.value,
        });
        break;
      case "singlePlayer":
        setNewGame({
          ...newGame,
          singlePlayer: parseInt(e.target.value),
        });
        break;
      case "multiplayer":
        setNewGame({
          ...newGame,
          multiplayer: parseInt(e.target.value),
        });
        break;
      case "image_url":
        setNewGame({
          ...newGame,
          image_url: e.target.value,
        });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newGame);
    if (newGame.release.length === 4) {
      Axios.post(games.url, { ...newGame }).then((res) => {
        setGames({
          ...games,
          list: [
            ...games.list,
            {
              id: res.data.id,
              name: res.data.name,
              release: res.data.release,
              platform: res.data.platform,
              genre: res.data.genre,
              singlePlayer: res.data.singlePlayer,
              multiplayer: res.data.multiplayer,
              image_url: res.data.image_url,
            },
          ],
        });
      });
      Swal.fire({
        title: "Success!",
        text: `Game ${newGame.name} successfully added`,
        icon: "success",
        confirmButtonText: "Cool",
      });
      setNewGame({
        name: "",
        release: "",
        platform: "",
        genre: "",
        singlePlayer: "",
        multiplayer: "",
        image_url: "",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Input 4 digit only",
      });
    }
  };

  return (
    <CCard className="p-3">
      {
        auth.status ?

          <CRow className="center">
            <CCol sm="3" className="cInput bg-dark m-3 p-0">
              {newGame.image_url ? (
                <CImg src={newGame.image_url} fluid width="100%" height="auto" />
              ) : (
                  <div>
                    <div className="text-center justify-content-cInput py-3 text-light">
                      <h3>Image Poster</h3>
                      <p>Please input your image_url data to see the image poster</p>
                    </div>
                  </div>
                )}
            </CCol>
            <CCol>
              <CCardHeader>
                <CCardTitle>
                  <strong>Add Game</strong>
                </CCardTitle>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="name">Name</CLabel>
                        <CInput
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Input name"
                          autoComplete="name"
                          onChange={handleChange}
                          value={newGame.name}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="release">Release</CLabel>
                        <CInput
                          type="number"
                          id="release"
                          name="release"
                          placeholder="Input release year"
                          autoComplete="release"
                          onChange={handleChange}
                          value={newGame.release}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="genre">Genre</CLabel>
                        <CInput
                          type="text"
                          id="genre"
                          name="genre"
                          placeholder="Input genre"
                          autoComplete="genre"
                          onChange={handleChange}
                          value={newGame.genre}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="platform">Platform</CLabel>
                        <CInput
                          type="text"
                          id="platform"
                          name="platform"
                          placeholder="Input platform"
                          autoComplete="platform"
                          onChange={handleChange}
                          value={newGame.platform}
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="singlePlayer">
                          Single Player Available
                    </CLabel>
                        <CSelect name="singlePlayer" onChange={handleChange}>
                          <option selected disabled>
                            Yes / No
                      </option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </CSelect>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="singlePlayer">
                          Multiplayer Player Available
                    </CLabel>
                        <CSelect name="multiplayer" onChange={handleChange}>
                          <option selected disabled>
                            Yes / No
                      </option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </CSelect>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="image_url">Image / Poster Url</CLabel>
                        <CInput
                          type="text"
                          id="image_url"
                          name="image_url"
                          placeholder="Input poster url"
                          autoComplete="image_url"
                          onChange={handleChange}
                          value={newGame.image_url}
                        />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CButton type="submit" color="success" size="lg">
                    Create Game
              </CButton>
                </CForm>
              </CCardBody>
            </CCol>
          </CRow>
          :
          <Redirect to="/" />
      }
    </CCard>
  );
};

export default CreateGame;
