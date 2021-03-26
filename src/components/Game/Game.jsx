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
            isCross: true,
            stepNumber: 0,
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isCross: (step % 2) === 0,
        });
    }

    moveClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isCross ? 'X' : 'O';
        console.log(squares, i);
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            isCross: !this.state.isCross
        });
        console.log(this.state);
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
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                "Go to turn #" + move :
                "To the start of the Game";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Win ' + winner;
        } else {
            status = 'Next move: ' + (this.state.isCross ? 'X' : 'O');
        }

        return (
            <div className={classes.Game}>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.moveClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}