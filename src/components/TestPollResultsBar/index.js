// *** NB - this whole component is very poor quality code - just hacked something together very quickly so we could display a poll proof of concent.
import React from "react";
import "./TestPollResults.css";

const TestPollResultsBar = (props) => {
    console.log(`components/TestPollResultsBar/index.js: START`);

    const {
        bgColor,
        percentComplete,
        pollResultText,
        pollQuestion,
        pollVotes,
    } = props;

    const containerStyles = {
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        width: "18em",

        boxSizing: "border-box",
        lineHeight: 1.5715,
        marginBottom: "0.2em",
        height: "32px",
    };

    const fillerStyles = {
        height: "100%",
        width: `${percentComplete}%`,
        backgroundColor: bgColor,
        borderRadius: "inherit",
        textAlign: "right",
    };

    const labelStyles = {
        width: `100%`,
        marginTop: "2em",
        padding: 10,
        color: "white",
        fontSize: "100%",
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${pollQuestion}`}</span>
            </div>
        </div>
    );
};

export default TestPollResultsBar;
