import React from "react";
import Button from "@material-ui/core/Button";

function Cell(props) {
    let buttonText = ""
    if (props.isFlagged) {
        buttonText = "FLAG"
    } else if (props.isRevealed) {
        if (props.isMine) {
            buttonText = "MINE"
        } else if (props.adjacentMineCount > 0) {
            buttonText = props.adjacentMineCount
        }
    }

    return (
        <div>
            <Button
                className="cellButton"
                variant="contained"
                color={props.isRevealed ? "danger" : "primary"}
                onContextMenu={(event) => {
                    props.onContextMenu(event, props.x, props.y)
                }}
                onClick={(event) => {
                    props.onClick(props.x, props.y)
                }}
            >
                {buttonText}
            </Button>
        </div>
    )
}

export default Cell
