import React from 'react';
import MineGrid from "./Grid";

function Game(props) {
    return (
        <MineGrid
            rows={10}
            cols={10}
            mineCount={3}
        />
    )
}

export default Game