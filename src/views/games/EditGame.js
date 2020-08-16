import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext";
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
  CSelect,
  CButton,
  CImg,
  CListGroup,
  CListGroupItem,
  CCardFooter,
} from "@coreui/react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { AuthContext } from "../../context/AuthContext";

const EditGame = ({ match }) => {
  const [games, setGames] = useContext(GameContext);
  const selectedGame = games.list ? games.list.find(
    (game) => game.id.toString() === match.params.id
  ) : "";

  const [newGame, setNewGame] = useState({
    ...selectedGame,
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

  const updateData = async () => {
    const res = await Axios.get(games.url);
    await setGames({
      ...games,
      list: res.data.map((game) => {
        return {
          id: game.id,
          name: game.name,
          genre: game.genre,
          singlePlayer: game.singlePlayer,
          multiplayer: game.multiplayer,
          platform: game.platform,
          release: game.release,
          image_url: game.image_url,
        };
      }),
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGame.release.length === 4) {
      Axios.put(`${games.url}/${newGame.id}`, { ...newGame }).then((res) => {
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Data successfully updated",
        }).then(updateData);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Year must be 4 digit",
      });
    }
  };

  const handleDelete = (e) => {
    let newList = games.list.filter(game => game.id !== selectedGame.id);
    Swal.fire({
      icon: "warning",
      title: "Are you sure? ",
      text: "Deleted data cannot be restored",
      showCancelButton: true,
      confirmButtonText: "Sure",
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then(res => {
      if (res.value) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Data successfully deleted!"
        });
        Axios.delete(`${games.url}/${selectedGame.id}`).then(res => {
          console.log(res);
        })
        setGames({ ...games, list: [...newList] });
        setNewGame(null);
      }
    })
  }

  return (
    <>
      {
        auth.status ?

          <CContainer>
            {selectedGame && newGame ?
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>
                      <CCardTitle className="text-center">Edit Form</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                      <CForm onSubmit={handleSubmit}>
                        <CFormGroup>
                          <CLabel htmlFor="name">Name</CLabel>
                          <CInput
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Input game name"
                            autoComplete="name"
                            onChange={handleChange}
                            value={newGame.name}
                            required
                          />
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="release">Release (4 digit year)</CLabel>
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
                        <CFormGroup>
                          <CLabel htmlFor="singlePlayer">
                            Single Player Available
                  </CLabel>
                          <CSelect name="singlePlayer" onChange={handleChange}>
                            <option selected disabled>
                              Yes / No
                    </option>
                            <option
                              value="1"
                              selected={parseInt(selectedGame.singlePlayer) === 1 ? true : false}
                            >
                              Yes
                    </option>
                            <option
                              value="0"
                              selected={parseInt(selectedGame.singlePlayer) === 0 ? true : false}
                            >
                              No
                    </option>
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
                            <option
                              value="1"
                              selected={parseInt(selectedGame.multiplayer) === 1 ? true : false}
                            >
                              Yes
                    </option>
                            <option
                              value="0"
                              selected={parseInt(selectedGame.multiplayer) === 0 ? true : false}
                            >
                              No
                    </option>
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
                        <CButton type="submit" color="warning" block>
                          <CIcon name="cil-send" />
                    Update
                </CButton>
                      </CForm>
                    </CCardBody>
                    <CCardFooter>
                      <CButton color="danger" className="float-right" onClick={handleDelete} block>
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
                    <CCardTitle className="text-center m-3">{newGame.name}</CCardTitle>
                    <CCardBody>
                      <CRow>
                        <CCol>
                          <CImg
                            fluid
                            src={newGame.image_url}
                            width="100%"
                            height="auto"
                          />
                        </CCol>
                        <CCol>
                          <CListGroup className="block">
                            <CListGroupItem>Release: {newGame.release}</CListGroupItem>
                            <CListGroupItem>Genre: {newGame.genre}</CListGroupItem>
                            <CListGroupItem>
                              Platform: {newGame.platform}
                            </CListGroupItem>
                            <CListGroupItem>
                              Single Player:{" "}
                              {newGame.singlePlayer
                                ? newGame.singlePlayer === 1
                                  ? "Yes"
                                  : "No"
                                : "-"}
                            </CListGroupItem>
                            <CListGroupItem>
                              Multi Player:{" "}
                              {newGame.multiplayer
                                ? newGame.multiplayer === 1
                                  ? "Yes"
                                  : "No"
                                : "-"}
                            </CListGroupItem>
                          </CListGroup>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              : <Redirect to="/game/list" />
            }
          </CContainer>
          :
          <Redirect to="/" />
      }
    </>
  );
};

export default EditGame;
