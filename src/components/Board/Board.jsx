import { Component } from "react";
import Square from "../Square/Sqaure"
import "./Board.css"


export default class Board extends Component {

    constructor(props) {
        super(props)

        this.state = {
            board: Array(9).fill(""),
            isCross: true,
            status: 'Click to start'
        }
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


    /*     renderBoard() {
            const newBoard = [...this.state.board];
            newBoard.map((item, index, arr) => {
                arr[index] = (this.renderSquare(index))
    
            });
            this.setState(() => { return { ...this.state, board: newBoard } })
            console.log(this.state.board, newBoard);
        } */



    changeStatusPlayer() {

        this.setState(() => {
            return {
                status: this.state.isCross ? "2 player moves" : "1 player moves",
            }
        })
    }
    isMoveCross() {
        this.setState(() => { return { ...this.state, isCross: !this.state.isCross } })
        this.changeStatusPlayer();
    }
    renderSquare(key) {
        console.log(key);
        return <Square key={key} step={() => this.isMoveCross()} isCross={this.state.isCross} />;
    }

    render() {
        return (
            <div>
                <div className='status'>{this.state.status}</div>


                {this.state.board.map((item, index) => (<div key={index}>{this.renderSquare(index)}</div>))}
            </div>
        )
    }

}