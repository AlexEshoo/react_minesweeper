import React, {useState} from 'react'
import Cell from "./Cell";
import Grid from '@material-ui/core/Grid'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeRandomGrid(rowCount, colCount, mineCount) {
    // Make a 2d array of objects representing cell states
    let gridArr = [...Array(rowCount)]
        .map((e, i) =>
            Array(colCount).fill()
                .map((g, j) => (
                    {
                        x: i,
                        y: j,
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

function revealNeighborZeros(cells, currentCell) {
    for (let k = -1; k < 2; k++) {
        for (let l = -1; l < 2; l++) {
            if (
                currentCell.x + k < 0
                || currentCell.x + k > cells.length - 1
                || currentCell.y + l < 0
                || currentCell.y + l > cells[0].length - 1
            ) {
                continue
            }
            let neighbor = cells[currentCell.x + k][currentCell.y + l]
            if (!neighbor.isRevealed) {
                neighbor.isRevealed = true
                if (neighbor.adjacentMineCount === 0) {
                    revealNeighborZeros(cells, neighbor)
                }
            }
        }
    }
}

function revealMines(cells) {
    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[0].length; y++) {
            if (cells[x][y].isMine) {
                cells[x][y].isFlagged = false
                cells[x][y].isRevealed = true
            }
        }
    }
}

function checkWin(cells) {
    for (let x = 0; x < cells.length; x++) {
        for (let y = 0; y < cells[0].length; y++) {
            if (!cells[x][y].isMine) {
                if (!cells[x][y].isRevealed) {
                    return false
                }
            } else {
                if (!cells[x][y].isFlagged) {
                    return false
                }
            }
        }
    }
    return true
}

function MineGrid(props) {
    const [flaggedCount, setFlaggedCount] = useState(0)
    const [cells, setCells] = useState(() => makeRandomGrid(props.rows, props.cols, props.mineCount))
    let newCells = JSON.parse(JSON.stringify(cells))  // Probably not the fastest deep copy method, but it works

    if (checkWin(cells)) {
        props.win()
    }

    function handleClick(x, y) {
        let cell = cells[x][y]
        if (!cell.isRevealed && !cell.isFlagged) {
            if (cell.isMine) {
                revealMines(newCells)
                props.lose()
            }
            newCells[x][y].isRevealed = true
            if (cell.adjacentMineCount === 0 && !cell.isMine) {
                revealNeighborZeros(newCells, cell)
            }
            setCells(newCells)
        }
    }

    function handleContextMenu(event, x, y) {
        event.preventDefault()
        let cell = cells[x][y]
        if (!cell.isRevealed) {
            newCells[x][y].isFlagged = !cell.isFlagged
            setCells(newCells)
            setFlaggedCount(cell.isFlagged ? flaggedCount - 1: flaggedCount + 1)
        }
    }

    return (
        <div>
            {`Flagged: ${flaggedCount}/${props.mineCount}`}
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
                            key={`${g.x},${g.y}`}
                            isMine={g.isMine}
                            adjacentMineCount={g.adjacentMineCount}
                            x={g.x}
                            y={g.y}
                            isFlagged={g.isFlagged}
                            isRevealed={g.isRevealed}
                            onClick={handleClick}
                            onContextMenu={handleContextMenu}
                        />
                    ))}
                </Grid>
            ))}
        </Grid>
        </div>
    )
}

export default MineGrid