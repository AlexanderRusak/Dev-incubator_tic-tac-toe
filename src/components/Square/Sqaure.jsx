import { Component } from "react"
import classes from "./Square.module.css";

export default class Square extends Component {

    render() {
        return (
            <button className={classes.Square} onClick={this.props.onClick} >
                <p className={classes.text}> {this.props.value}</p>
            </button >
        );
    }

}