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
        const sp = "SinglePlayer";
        const mp = "MultyPlayer";
        const emptyData = "X-0, O-0";
        const dataMp = JSON.parse(localStorage.getItem(mp));
        const dataSp = JSON.parse(localStorage.getItem(sp));
        let res = `${dataSp ?
            `${sp} :X-${dataSp.X}, O-${dataSp.O}` :
            `${sp} :${emptyData}`}`;
        res += ` ${dataMp ?
            `${mp} :X-${dataMp.X}, O-${dataMp.O}` :
            `${mp} :${emptyData}`}`;
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