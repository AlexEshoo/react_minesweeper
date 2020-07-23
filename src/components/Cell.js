import React, {useState} from "react";
import Button from "@material-ui/core/Button";

function Cell(props) {
    const isEmpty = props.number === 0
    const [isRevealed, reveal] = useState(false)
    const [isFlagged, flag] = useState(false)

    let buttonText = ""
    if (isFlagged) {
        buttonText = "FLAG"
    } else if (isRevealed) {
        if (props.number === "mine") {
            buttonText = "MINE"
        } else if (props.number > 0) {
            buttonText = props.number
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
