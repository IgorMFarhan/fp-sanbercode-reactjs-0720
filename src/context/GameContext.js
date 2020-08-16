import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = (props) => {
    const [games, setGames] = useState({
        list: null,
        selectedID: 0,
        url: 'https://backendexample.sanbersy.com/api/games',
    });

    return (
        <GameContext.Provider value={[games, setGames]} >
            {props.children}
        </GameContext.Provider>
    )
}