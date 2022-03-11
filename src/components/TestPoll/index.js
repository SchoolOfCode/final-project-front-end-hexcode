// NB I HAVE ADDED A TestPoll Component TO THE HOMEPAGE SO I CAN RENDER IT WITHOUT MESSING UP STUFF

import React, { useState } from "react";
import "./TestPoll.css";
import { Button } from "antd"; //sinead - just going to compare this to standard buttons
import TestPollResultsBar from "../TestPollResultsBar/index.js";

// function TestPoll({ hasVoted = false }) {
function TestPoll() {
    console.log(`src/components/TestPoll/index.js - component start`);
    //TODO: obviously replace this hardcoded value with a value that can change and persist
    const [hasVoted, setHasVoted] = useState(false);

    // code for button:  onClick={() => this.vote(answer.option)}

    const pollQuestion = "What dates suit people best?";
    const PollAnswers = [
        { option: "Sat 25th", votes: 2 },
        { option: "Sun 26th", votes: 3 },
        { option: "Fri 12th", votes: 1 },
    ];
    const pollResultsData = [
        {
            pollResultId: 1,
            bgColor: "#ec9c24",
            percentComplete: 70,
            pollResultText: "Sat 25th.  2 votes",
            pollQuestion: "Sat 25th",
            pollVotes: "2 votes",
        },
        {
            pollResultId: 2,
            bgColor: "#ec9c24",
            percentComplete: 55,
            pollResultText: "Sun 26th.  3 votes",
            pollQuestion: "Sun 26th",
            pollVotes: "3 votes",
        },
        {
            pollResultId: 3,
            bgColor: "#ec9c24",
            percentComplete: 90,
            pollResultText: "Fri 12th.  1 vote",
            pollQuestion: "Fri 12th",
            pollVotes: "1 vote",
        },
    ];

    function handleButtonClick() {
        setHasVoted(true);
    }

    // BEFORE the logged-in user has voted, render the button options so they can vote
    if (!hasVoted) {
        return (
            <div className="pollQuestionsBox" key="100">
                <ul className="pollList" id="pollListQuestions" key="50">
                    <li className="pollVoteItem" key="1">
                        <p className="pollQuestion" key="1a">
                            Poll: What dates suit people best?
                        </p>
                    </li>
                    <li className="pollVoteItem" key="2">
                        <Button
                            className="pollVoteButton"
                            id="voteButton1"
                            type="button"
                            onClick={handleButtonClick}
                        >
                            Sat 25th
                        </Button>
                    </li>

                    <li className="pollVoteItem" key="3">
                        <Button
                            className="pollVoteButton"
                            id="voteButton2"
                            type="button"
                            onClick={handleButtonClick}
                        >
                            Sun 26th
                        </Button>
                    </li>

                    <li className="pollVoteItem" key="4">
                        <Button
                            className="pollVoteButton"
                            id="voteButton3"
                            type="button"
                            onClick={handleButtonClick}
                        >
                            Fri 12th
                        </Button>
                    </li>
                </ul>
            </div>
        );

        //AFTER the logged-in user has voted, render the result progress bars
    } else {
        //VERSION 3 - trying to get a heading in, on top, in line - commited before trying this!
        return (
            <ul className="pollList" id="pollListQuestions" key="99">
                <li className="pollVoteItem" key="99a">
                    <p className="pollQuestion" key="9a">
                        Poll: What dates suit people best?
                    </p>
                </li>

                {pollResultsData.map((currItem) => (
                    <li className="pollVoteItem" key={currItem.pollResultId}>
                        <div className="pollResultsBox">
                            <TestPollResultsBar
                                key={currItem.pollResultId}
                                bgColor={currItem.bgColor}
                                percentComplete={currItem.percentComplete}
                                pollResultText={currItem.pollResultText}
                                pollQuestion={currItem.pollQuestion}
                                pollVotes={currItem.pollVotes}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        );
        //VERSION 2 of the render for poll results - works
        // return (
        //   <div className="pollResultsBox">
        //     {pollResultsData.map((currItem) => (
        //       <TestPollResultsBar
        //         key={currItem.pollResultId}
        //         bgColor={currItem.bgColor}
        //         percentComplete={currItem.percentComplete}
        //         pollResultText={currItem.pollResultText}
        //         pollQuestion={currItem.pollQuestion}
        //         pollVotes={currItem.pollVotes}
        //       />
        //     ))}
        //   </div>
        // );
        //VERSION 1 of the render for poll results
        // return (
        //   <div className="pollResultsBox">
        //     <p className="pollQuestion">Poll: What dates suit people best?</p>

        //     <ul className="pollList" id="pollListResults">
        //       <li className="pollResultItem" key="1"></li>

        //       <li className="pollResultItem" key="2"></li>

        //       <li className="pollResultItem" key="3"></li>
        //     </ul>
        //   </div>
        // );
    }
}

export default TestPoll;
