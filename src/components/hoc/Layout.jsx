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
            mode: !this.state.mode,
            menu: !this.state.menu,
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

    getTemplate() {
        const dataMp = JSON.parse(localStorage.getItem("MultyPlayer"));
        const dataSp = JSON.parse(localStorage.getItem("SinglePlayer"));
        const res = `${dataSp ? `SinglePlayer"  :X ${dataSp.X / 2}, O ${dataSp.O / 2}` : `SinglePlayer"  :X 0, O 0`} ${dataMp ? `"MultyPlayer" :X ${dataMp.X / 2}, O ${dataMp.O / 2}` : `"MultyPlayer" :X 0, O 0`} `;
        alert(res);
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
                    <Game mode={this.state.mode} onScore={this.getTemplate} />
                </main>
            </div>
        )
    }
}