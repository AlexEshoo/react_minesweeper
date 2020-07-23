import React, {useState} from 'react'
import Cell from "./Cell";
import Grid from '@material-ui/core/Grid'


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeRandomGrid(rowCount, colCount, mineCount) {
    let gridArr = [...Array(rowCount)].map(e => Array(colCount).fill(0))

    let row, col, placed
    for (let i = 0; i < mineCount; i++) {
        placed = false
        while (!placed) {
            row = getRandomInt(0, rowCount)
            col = getRandomInt(0, colCount)
            if (!!!gridArr[row][col]) {
                gridArr[row][col] = "mine"
                placed = true
            }
        }
    }

    let adjacentMineCount
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            adjacentMineCount = 0
            if (!(gridArr[i][j] === "mine")) {
                for (let k = -1; k < 2; k++) {
                    for (let l = -1; l < 2; l++) {
                        console.log(k,l)
                        if (gridArr[i+k] === undefined || gridArr[i+k][j+l] === undefined){
                            continue
                        }
                        if (gridArr[i + k][j + l] === "mine") {
                            adjacentMineCount++
                        }
                    }
                }
            gridArr[i][j] = adjacentMineCount
            }
        }
    }

    return gridArr
}


function MineGrid(props) {
    const [mineCount, setMineCount] = useState(props.mineCount)

    const arr = makeRandomGrid(5, 5, 2)
    console.table(arr)

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid container item>
                <Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/>
            </Grid>
            <Grid container item>
                <Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/>
            </Grid>
            <Grid container item>
                <Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/>
            </Grid>
            <Grid container item>
                <Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/>
            </Grid>
            <Grid container item>
                <Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/>
            </Grid>
            <Grid container item>
                <Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/><Cell number={1}/>
            </Grid>
        </Grid>
    )
}

export default MineGrid