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
            moveCount: 0
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isCross: (step % 2) === 0,
        });
    }
    historyButtons(move) {
        const { history, stepNumber, moveCount, mode } = this.state;
        this.showNextButton();
        this.setState({
            stepNumber: move,
            isCross: mode === 0 ? "X": !this.state.isCross,
            moveCount: move,
        })
    }

    showNextButton() {
        const { history, stepNumber, moveCount, mode } = this.state;
        console.log(stepNumber < history.length, stepNumber, history.length);
        /* moveCount < history.length - 1 */
    }


    moveClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();
        const { mode } = this.state;
        console.log(this.state.stepNumber < history.length - 1, this.state.stepNumber, history.length);
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        if (mode === 0) {
            let move = this.moveClickAI();

            while (squares[move] !== null) {

                move = this.moveClickAI();
            }
            squares[i] = 'X';
            this.calculateWinner(squares);
            squares[move] = 'O';
            this.calculateWinner(squares);

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

                return squares[a];
            }
        }
        return null;
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
        const current = history[stepNumber];
        const winner = this.calculateWinner(current.squares);
        const count = history.length;
        const modeTitle = mode ? "Multyplayer" : "SinglePlayer";
        /* const moves = history.map((_, move) => {
            const desc = move ?
                "Go to turn #" + move :
                "To the start of the Game";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        }) */

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
                </div>

                <div >
                <div className={classes.moves}>
                    <button disabled={moveCount === 0} onClick={() => this.historyButtons(moveCount - 1)}><i class="fas fa-undo"></i></button>
                    <p>{status}</p>
                    <button disabled={stepNumber >= history.length - 1} onClick={() => this.historyButtons(moveCount + 1)} ><i class="fas fa-redo"></i></button>
                </div>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.moveClick(i)}
                    />
                </div>

            </div>
        )
    }
}