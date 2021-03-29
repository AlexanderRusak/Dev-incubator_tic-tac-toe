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

        }
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isCross: (step % 2) === 0,
        });
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
        })

    }

    moveClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();
        const { mode } = this.state;
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        if (mode === 0) {
            let move = this.moveClickAI();
            squares[i] = 'X';

            while (squares[move] !== null || squares[move] === "X") {
                console.log(move);
                move = this.moveClickAI();
                console.log(move);
            }
            squares[move] = 'O';

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


    }

    moveClickAI() {
        console.log(Math.floor(Math.random() * (8 - 0 + 1)) + 0, "move rnd");
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

                // this.setScoreResult(squares[a]);
                return squares[a];
            }
        }
        return null;
    }

    setScoreResult(winner) {
        const { mode } = this.state;
        const modeKey = mode === 0 ? "SinglePlayer" : "MultyPlayer";
        let getLSData = JSON.parse(localStorage.getItem(modeKey));
        console.log(getLSData);

        if (!getLSData) {
            localStorage.setItem(modeKey, JSON.stringify({ X: winner === "X" ? 1 : 0, O: winner === "O" ? 1 : 0 }));
        } else {
            console.log(getLSData[winner]);
            getLSData[winner]++;
            console.log(getLSData[winner]);
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
            })
        }
    }

    render() {
        const { mode, history, stepNumber, moveCount } = this.state;
        console.log("render");
        const current = history[stepNumber];
        const winner = this.calculateWinner(current.squares);
        winner && this.setScoreResult(winner);
        const modeTitle = mode ? "Multyplayer" : "SinglePlayer";
        let status;
        if (winner) {
            status = 'Win ' + winner;
        } else {
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
                        <button disabled={moveCount === 0} onClick={() => this.historyButtons(moveCount - 1)}><i className="fas fa-undo"></i></button>
                        <button disabled={moveCount === 0} onClick={() => this.resetHandler()}><i className="far fa-times-circle"></i></button>
                        <button disabled={stepNumber >= history.length - 1} onClick={() => this.historyButtons(moveCount + 1)} ><i className="fas fa-redo"></i></button>
                    </div>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.moveClick(i)}
                    />
                </div>
                <div className={classes.score}>
                    <button onClick={this.props.onScore}><i class="far fa-star"></i></button>
                </div>
            </div>
        )
    }
}