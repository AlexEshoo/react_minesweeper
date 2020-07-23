import React from 'react'
import Cell from "./Cell";
import Grid from '@material-ui/core/Grid'

function MineGrid(props) {
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