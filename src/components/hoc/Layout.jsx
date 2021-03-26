import { Component } from "react";
import Drawer from "../Navigation/Drawer/Drawer";
import MenuToggle from "../Navigation/MenuToggle/MenuToggle";
import classes from "./Layout.module.css";


export default class Layout extends Component {

    state = {
        menu: false,
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseHandler = () => {
        this.setState({ menu: !this.state.menu })
    }

    render() {
        return (
            <div className={classes.Layout} >
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main className={classes.center}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}