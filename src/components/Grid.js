import React, {useState} from 'react'
import Cell from "./Cell";
import Grid from '@material-ui/core/Grid'


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeRandomGrid(rowCount, colCount, mineCount) {
    let gridArr = [...Array(rowCount)].map(e => Array(colCount))

    let row, col, placed
    for (let i = 0; i < mineCount; i++) {
        placed = false
        while (!placed) {
            row = getRandomInt(0, rowCount)
            col = getRandomInt(0, colCount)
            if (gridArr[row][col] === undefined) {
                gridArr[row][col] =
                    <Cell
                        key={row.toString() + ',' + col.toString()}
                        number="mine"
                        x={row}
                        y={col}
                    />
                placed = true
            }
        }
    }

    let adjacentMineCount, neighbor
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            adjacentMineCount = 0
            if (gridArr[i][j] === undefined) {
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
                        if (React.isValidElement(neighbor) && neighbor.props.number === "mine") {
                            adjacentMineCount++
                        }
                    }
                }
                gridArr[i][j] =
                    <Cell
                        key={i.toString() + ',' + j.toString()}
                        number={adjacentMineCount}
                        x={i}
                        y={j}
                    />
            }
        }
    }

    return gridArr
}

function onReveal() {
}

function MineGrid(props) {
    const [mineCount, setMineCount] = useState(props.mineCount)
    const arr = makeRandomGrid(props.rows, props.cols, props.mineCount)

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {arr.map((e) => (
                <Grid key={`row-${arr.indexOf(e)}`} container item>
                    {e}
                </Grid>
            ))}
        </Grid>
    )
}

export default MineGrid