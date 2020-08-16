import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./../../context/GameContext";
import Axios from "axios";
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
  CListGroupItem,
  CListGroup,
  CModalFooter,
} from "@coreui/react";
import { AuthContext } from "../../context/AuthContext";

const GameTable = () => {
  const [games, setGames] = useContext(GameContext);
  const [details, setDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState("");
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    if (games.list === null) {
      Axios.get(games.url).then((res) => {
        setGames({
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
      });
    }
  }, [games, setGames]);

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

  const showModal = (e) => {
    setModal(!modal);
    if (e !== undefined) {
      let selected = games.list.find((game) => game.id === parseInt(e.target.name));
      (setSelectedGame({ ...selected }));
    }
  };


  // fields untuk datatable
  const fields = [
    { key: "name", _style: { width: "40%" } },
    { key: "genre", _style: { width: "20%" } },
    { key: "release", _style: { width: "20%" } },
    { key: "platform", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  return (
    <>
      <CDataTable
        responsive
        items={games.list}
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
                    {item.name}
                  </CLink>
                  <p className="text-muted">
                    Single Player:{" "}
                    {item.singlePlayer !== null
                      ? item.singlePlayer === 1
                        ? "Yes"
                        : "No"
                      : "-"}
                  </p>
                  <p className="text-muted">
                    Multi Player:{" "}
                    {item.multiplayer !== null
                      ? item.multiplayer === 1
                        ? "Yes"
                        : "No"
                      : "-"}
                  </p>
                  Poster link:{" "}
                  {item.image_url ? (
                    item.image_url.includes("http" || ".com") ? (
                      <CLink href={item.image_url} target="_blank">
                        {item.image_url}
                      </CLink>
                    ) : (
                        "link tidak valid"
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
      {/* modal */}
      <CModal show={modal} onClose={showModal} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>{selectedGame.name}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol md={5}>
                <CImg
                  src={selectedGame.image_url}
                  fluid
                  alt="Poster"
                  width="100%"
                />
              </CCol>
              <CCol md={7}>
                <CListGroup className="text-sm">
                  <CListGroupItem>
                    Release: {selectedGame.release}
                  </CListGroupItem>
                  <CListGroupItem>Genre: {selectedGame.genre}</CListGroupItem>
                  <CListGroupItem>
                    Platform: {selectedGame.platform}
                  </CListGroupItem>
                  <CListGroupItem>
                    Single Player Available : {selectedGame.singlePlayer ? selectedGame.singlePlayer === 1 ? "Yes" : "No" : "-"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Multiplayer Available : {selectedGame.multiplayer ? selectedGame.multiplayer === 1 ? "Yes" : "No" : "-"}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          {
            auth.status === true ?
              <CLink to={`game/edit/${selectedGame.id}`}>
                <CButton color="warning">Edit</CButton>{" "}
              </CLink>
              : ""
          }
          <CButton color="secondary" onClick={showModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default GameTable;
