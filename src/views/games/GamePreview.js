import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import {
  CCard,
  CCardHeader,
  CCardTitle,
  CCol,
  CCardBody,
  CImg,
  CListGroup,
  CListGroupItem,
  CRow,
  CLink,
} from "@coreui/react";

const GamePreview = ({ match }) => {
  const [games, setGames] = useContext(GameContext);
  const selected = games.list.find(
    (game) => game.id.toString() === match.params.id
  );
  console.log(selected);

  const handleClick = (e) => {
    setGames({
        ...games,
        selectedID: selected.id,
    })
  };

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle className="text-center p-0">
          <CCol>
            <strong>{selected.name}</strong>
          </CCol>
        </CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
            {selected.image_url !== null ? (
              selected.image_url.includes("http") ? (
                <CImg
                  src={selected.image_url}
                  fluid
                  width="100%"
                  height="auto"
                />
              ) : (
                <h3 className="text-center">Link is invalid</h3>
              )
            ) : (
              <div
                style={{
                  border: "1px solid black",
                  display: "block",
                  height: "100%",
                  width: "auto",
                }}
              >
                <h3 className="text-center">Link is empty</h3>
              </div>
            )}
          </CCol>
          <CCol>
            <CListGroup>
              <CListGroupItem>
                {" "}
                <strong>Game ID: </strong> {selected.id}
              </CListGroupItem>
              <CListGroupItem>
                {" "}
                <strong>Relase : </strong>{" "}
                {selected.release ? selected.release : "-"}
              </CListGroupItem>
              <CListGroupItem className="text-justify">
                {" "}
                <strong>Platform : </strong>{" "}
                {selected.platform ? selected.platform : "-"}
              </CListGroupItem>
              <CListGroupItem>
                {" "}
                <strong>Genre : </strong>{" "}
                {selected.genre ? selected.genre : "-"}
              </CListGroupItem>
              <CListGroupItem
                color={selected.singlePlayer > 0 ? "success" : "danger"}
              >
                {" "}
                <strong>singlePlayer: </strong>{" "}
                {selected.multiplayer > 0 ? "Yes" : "No"}
              </CListGroupItem>
              <CListGroupItem
                color={selected.multiplayer > 0 ? "success" : "danger"}
              >
                {" "}
                <strong>Multiplayer: </strong>{" "}
                {selected.multiplayer > 0 ? "Yes" : "No"}
              </CListGroupItem>
              <CListGroupItem>
                <CLink
                  to={`/game/edit/${selected.id}`}
                  className="btn btn-warning text-dark"
                  onClick={handleClick}
                >
                  {" "}
                  <strong>Edit</strong>{" "}
                </CLink>
              </CListGroupItem>
            </CListGroup>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default GamePreview;
