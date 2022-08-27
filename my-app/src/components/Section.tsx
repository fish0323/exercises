import React from "react";
import styles from "./Section.module.css"

function Section() {
    return (
        <div className="section">
            <p>
                This is a simple website made without React. Try to convert this into React enabled.
            </p>
            <ol>
                <li>
                    First, you need to use <span className={styles["highlight"]}>create-react-app</span>
                </li>
                <li>
                    Second, you need to run <span className={styles["highlight"]}>npm start</span>
                </li>
            </ol>
        </div>
    )
}

export default Section