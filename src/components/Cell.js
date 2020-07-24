import React, {useState} from "react";
import Button from "@material-ui/core/Button";

function Cell(props) {
    const [isRevealed, reveal] = useState(props.revelead)
    const [isFlagged, flag] = useState(props.flagged)

    let buttonText = ""
    if (isFlagged) {
        buttonText = "FLAG"
    } else if (isRevealed) {
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
                color={isRevealed ? "default" : "primary"}
                onContextMenu={(event) => {
                    if (!isRevealed) {
                        flag(!isFlagged);
                    }
                    event.preventDefault();
                }}
                onClick={(event) => {
                    if (!isRevealed && !isFlagged) {
                        reveal(true)
                    }
                }}
            >
                {buttonText}
            </Button>
        </div>
    )
}

export default Cell
