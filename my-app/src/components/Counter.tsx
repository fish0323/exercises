import React, { useState } from "react";
import style from "./Counter.module.css"

function Counter({count, setCount}: {count : number, setCount: (newCount : number) => void}) {

    return (
        <div className={style["counter"]}>
            <h1>{count}</h1>
            <div>
                <button onClick={() => setCount(Math.max(0, count - 1))}>-</button>
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
        </div>
    )
}

export default Counter;