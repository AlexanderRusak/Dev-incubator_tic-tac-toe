import { Square } from "./Sqaure"


export const Board = () => {

    const status = 'Next player';

    const renderSquare = (i) => <Square number={i} />;



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