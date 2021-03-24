import { Component } from "react"
import "./Square.css";

export default class Square extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: "#",
        }
    }

    setMove() {
        this.setState(() => { return { ...this.state, value: this.props.isCross ? "X" : "O" } });
        this.props.step();
        console.log(this.props.key);
    }

    render() {
        return (
            <button className="square" onClick={() => { this.state.value === "#" && this.setMove() }}>
                { this.state.value}
            </button >
        );
    }

}