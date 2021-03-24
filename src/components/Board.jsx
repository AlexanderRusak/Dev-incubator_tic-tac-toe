import { useState } from "react";
import { Square } from "./Sqaure"


export const Board = () => {

    const status = 'Next player';

    const [isCross, setIsCross] = useState(true);

    const fieldBoard =Array(9).fill(null);
 
    const isMoveCross = () => {

        setIsCross(!isCross);
        console.log(isCross);
    }

    const renderSquare = () => <Square step={() => isMoveCross()} isCross={isCross} />;

    return (
        <div>
            <div className='status'>{status}</div>

            <div className="board-now">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-now">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-now">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}