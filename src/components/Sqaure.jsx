import { Fragment, useState } from "react"

export const Square = ({ step, isCross }) => {

    const [value, setValue] = useState("#");


    const setMove = () => {
        isCross ? setValue("X") : setValue("O");
        step();

    }

    return (

        <button className="square" onClick={() => { value === "#" && setMove() }}>
            {value}
        </button>


    );
}