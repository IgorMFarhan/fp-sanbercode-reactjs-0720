import React, { useContext } from "react";
import { GameContext } from "./../../context/GameContext";
import { CContainer, CRow } from "@coreui/react";
import GameCard from "./GameCard";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";

const GameList = () => {
  const [games] = useContext(GameContext);
  const [auth] = useContext(AuthContext);

  return (
    <CContainer>
      {games.list !== null ? (
        <CRow>
          {games.list.map((game) => {
            return (
              <GameCard
                key={game.id}
                name={game.name}
                image_url={game.image_url}
                release={game.release}
                genre={game.genre}
                platform={game.platform}
                id={game.id}
                singlePlayer={
                  game.singlePlayer
                    ? game.singlePlayer === 1
                      ? "Yes"
                      : "No"
                    : "-"
                }
                multiplayer={
                  game.multiplayer
                    ? game.multiplayer === 1
                      ? "Yes"
                      : "No"
                    : "-"
                }
                edit_url={`/game/edit/${game.id}`}
                status={auth.status}
              />
            );
          })}
        </CRow>
      ) : (
        <>
          <h1 className="h1 text-center m-3">Game is not available, back to home</h1>
        </>
      )}
    </CContainer>
  );
};

export default GameList;
