import React, {useState} from 'react'
import Cell from "./Cell";
import Grid from '@material-ui/core/Grid'


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeRandomGrid(rowCount, colCount, mineCount) {
    let gridArr = [...Array(rowCount)].map(e => Array(colCount).fill().map(() => (
        {
            x: null,
            y: null,
            isMine: false,
            adjacentMineCount: 0,
            isFlagged: false,
            isRevealed: false
        }
    )))

    let row, col, placed
    for (let i = 0; i < mineCount; i++) {
        placed = false
        while (!placed) {
            row = getRandomInt(0, rowCount)
            col = getRandomInt(0, colCount)
            if (!gridArr[row][col].isMine) {
                gridArr[row][col].isMine = true
                placed = true
            }
        }
    }

    let currentCell, neighbor
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            currentCell = gridArr[i][j]
            if (!currentCell.isMine) {
                for (let k = -1; k < 2; k++) {
                    for (let l = -1; l < 2; l++) {
                        if (
                            i + k < 0
                            || i + k > rowCount - 1
                            || j + l < 0
                            || j + l > colCount - 1
                        ) {
                            continue
                        }
                        neighbor = gridArr[i + k][j + l]
                        if (neighbor.isMine) {
                            currentCell.adjacentMineCount++
                        }
                    }
                }
            }
        }
    }

    return gridArr
}

function onReveal() {

}

function MineGrid(props) {
    const [mineCount, setMineCount] = useState(props.mineCount)
    const [cells, setCells] = useState(makeRandomGrid(props.rows, props.cols, props.mineCount))

    //console.log(cells)

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {cells.map((e) => (
                <Grid key={`row-${cells.indexOf(e)}`} container item>
                    {e.map((g) => (
                        <Cell
                            isMine={g.isMine}
                            adjacentMineCount={g.adjacentMineCount}
                            x={g.x}
                            y={g.y}
                            flagged={g.isFlagged}
                            revelead={g.isRevealed}
                        />
                    ))}
                </Grid>
            ))}
        </Grid>
    )
}

export default MineGrid