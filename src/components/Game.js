import React from 'react';
import MineGrid from "./Grid";

function Game(props) {
    return (
        <MineGrid
            rows={10}
            cols={10}
            mineCount={7}
        />
    )
}

export default Game