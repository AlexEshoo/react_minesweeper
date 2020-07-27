import React from "react";
import Button from "@material-ui/core/Button";

function Cell(props) {
    let buttonText = ""
    let buttonColor = "primary"
    if (props.isFlagged) {
        buttonText = "FLAG"
    } else if (props.isRevealed) {
        buttonColor = "default"
        if (props.isMine) {
            buttonText = "MINE"
            buttonColor = "secondary"
        } else if (props.adjacentMineCount > 0) {
            buttonText = props.adjacentMineCount
        }
    }

    return (
        <div>
            <Button
                className="cellButton"
                variant="contained"
                color={buttonColor}
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
