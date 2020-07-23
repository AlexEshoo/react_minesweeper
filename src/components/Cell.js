import React, {useState} from "react";
import Button from "@material-ui/core/Button";

function Cell(props) {
    const isEmpty = props.number === ''
    const [isRevealed, reveal] = useState(false)
    const [isFlagged, flag] = useState(false)

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
                {isFlagged ? 'flag' : (isRevealed ? props.number : "")}
            </Button>
        </div>
    )
}

export default Cell
