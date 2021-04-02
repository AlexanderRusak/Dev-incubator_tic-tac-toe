import { Component, Fragment } from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Drawer.module.css";


const links = ["Single player", "Multiplayer"];

export default class Drawer extends Component {




    renderLinks() {
        return links.map((link, index) => {
            return (
                <li onClick={() => this.props.onChose(index)} key={index}>
                    <p>{link}</p>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer];
        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
            </Fragment>

        )
    }
}