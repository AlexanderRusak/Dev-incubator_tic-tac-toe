import { Component } from "react";
import Game from "../Game/Game";
import Drawer from "../Navigation/Drawer/Drawer";
import MenuToggle from "../Navigation/MenuToggle/MenuToggle";
import classes from "./Layout.module.css";


export default class Layout extends Component {


    state = {
        menu: false,
        mode: 0,
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseHandler = () => {
        this.setState({ menu: !this.state.menu })
    }
    modeHandler = selectedMode => {
        this.setState(() => {
            return { mode: selectedMode, menu: !this.state.menu }
        })
    }


    render() {


        return (
            <div className={classes.Layout} >
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    onChose={this.modeHandler}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main className={classes.center}>
                    <Game mode={this.state.mode} />
                </main>
            </div>
        )
    }
}