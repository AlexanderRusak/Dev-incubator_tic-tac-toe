import { Component } from "react";
import classes from "./Game.module.css"
import Board from "../Board/Board";


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            isCross: true,
            mode: this.props.mode,
            moveCount: 0,
            isWinner: false,
            winner: null,
        }
    }

    historyButtons(move) {
        const { mode, isCross } = this.state;
        this.showNextButton();
        this.setState({
            stepNumber: move,
            isCross: mode === 0 ? "X" : !isCross,
            moveCount: move,
        })
    }

    showNextButton() {
        const { history, stepNumber } = this.state;
        console.log(stepNumber < history.length, stepNumber, history.length);
    }
    resetHandler() {
        const newHistory = [{
            squares: Array(9).fill(null),
        }];

        this.setState({
            mode: this.props.mode,
            history: [...newHistory],
            stepNumber: 0,
            moveCount: 0,
            isCross: true,
            winner: null,
            isWinner: false
        })

    }

    moveClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();
        const { mode } = this.state;

        if (mode === 0) {
            let move = this.moveClickAI();
            squares[i] = 'X';
            console.log(squares.find(square => square === null) === null);
            if (squares.find(square => square === null) === null) {
                while (squares[move] !== null || squares[move] === "X") {

                    move = this.moveClickAI();

                }
                squares[move] = 'O';
            }



            this.setState({
                history: history.concat([{
                    squares: squares
                }]),
                stepNumber: history.length,
                isCross: !this.state.isCross,
                moveCount: this.state.moveCount + 1
            });
        } else {
            squares[i] = this.state.isCross ? 'X' : 'O';
            this.setState({
                history: history.concat([{
                    squares: squares
                }]),
                stepNumber: history.length,
                isCross: !this.state.isCross,
                moveCount: this.state.moveCount + 1
            });
        }

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
    }

    moveClickAI() {
        return Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                this.setState({
                    isWinner: true,
                    winner: squares[a]
                })
                this.setScoreResult(squares[a]);
                return squares[a];
            }
        }
        return null;
    }

    onRemove() {
        localStorage.removeItem("SinglePlayer");
        localStorage.removeItem("MultyPlayer");
        alert("Data successfully erased");
    }

    setScoreResult(winner) {
        const { mode } = this.state;
        const modeKey = mode === 0 ? "SinglePlayer" : "MultiPlayer";
        let getLSData = JSON.parse(localStorage.getItem(modeKey));

        if (!getLSData) {
            localStorage.setItem(modeKey, JSON.stringify({ X: winner === "X" ? 1 : 0, O: winner === "O" ? 1 : 0 }));
        } else {

            getLSData[winner]++;

            localStorage.setItem(modeKey, JSON.stringify(getLSData));
        }

    }

    componentDidUpdate(prevProps) {
        const newHistory = [{
            squares: Array(9).fill(null),
        }];
        if (this.props.mode !== prevProps.mode) {
            this.setState({
                mode: this.props.mode,
                history: [...newHistory],
                stepNumber: 0,
                moveCount: 0,
                isCross: true,
                isWinner: false,
                winner: null
            })
        }
    }

    history(move) {
        return () => this.historyButtons(move);
    }
    
    render() {
        const { mode, history, stepNumber, moveCount, winner } = this.state;
        const current = history[stepNumber];
        const { squares } = history[stepNumber];


        const modeTitle = mode ? "Multyplayer" : "SinglePlayer";
        let status;
        if (winner) {
            status = 'Win ' + winner;
        } else if (squares.find(square => square === null) !== null && !winner) { //////reverse coding
            status = "Round draw";
        }
        else {
            status = 'Next move: ' + (this.state.isCross ? 'X' : 'O');
        }

        return (
            <div className={classes.Game}>
                <div className={classes.mode}>
                    <h5>{modeTitle}</h5>
                    <p>{status}</p>
                </div>

                <div >
                    <div className={classes.moves}>
                        <button disabled={moveCount === 0} onClick={this.history(moveCount - 1)}><i className="fas fa-undo"></i></button>
                        <button disabled={moveCount === 0} onClick={this.resetHandler}><i className="far fa-times-circle"></i></button>
                        <button disabled={stepNumber >= history.length - 1} onClick={() => this.historyButtons(moveCount + 1)} ><i className="fas fa-redo"></i></button>
                    </div>
                    <Board
                        squares={current.squares}
                        onClick={!winner ? (i) => this.moveClick(i) : null}
                    />
                </div>
                <div className={classes.score}>
                    <button onClick={this.props.onScore}><i className="far fa-star"></i></button>
                    <button onClick={this.onRemove}><i className="far fa-trash-alt"></i></button>
                </div>
            </div>
        )
    }
}



///HOF