import React, {useState} from 'react';
import MineGrid from "./Grid";

function Game(props) {
    const [isWin, setWin] = useState(false)
    const [isLose, setLose] = useState(false)

    return (
        <div>
            {isLose ? "YOU LOSE" : "SWEEP THEM MINES"}
            <MineGrid
                rows={10}
                cols={10}
                mineCount={7}
            />
        </div>
    )
}

export default Game