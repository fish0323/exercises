import React from "react";
import styles from "./Title.module.css"

interface ITitle {
    text: string
}

function Title(props: ITitle) {
    return (
        <header>
            <h1>
                {props.text}
            </h1>
        </header>
    )
}

export default Title