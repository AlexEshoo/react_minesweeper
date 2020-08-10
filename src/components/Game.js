import React, {useState} from 'react';
import MineGrid from "./Grid";

function Game(props) {
    const [isWin, setWin] = useState(false)
    const [isLose, setLose] = useState(false)
    console.log(isWin)

    return (
        <div>
            {isWin}
            {isLose ? "YOU LOSE" : "SWEEP THEM MINES"}
            <MineGrid
                rows={10}
                cols={10}
                mineCount={7}
                win={() => setWin(true)}
                lose={() => setLose(true)}
            />
        </div>
    )
}

export default Game