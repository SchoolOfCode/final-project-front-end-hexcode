import React from "react";
import "./TestPollResults.css";

const TestPollResultsBar = (props) => {
  //VERSION 6
  const { bgColor, percentComplete, pollResultText, pollQuestion, pollVotes } =
    props;

  //VERSION 1 to 5
  //   const { bgColor, percentComplete, pollResultText } = props;

  console.log({ props });

  //VERSION 1 containerStyles
  //   const containerStyles = {
  //     height: 20,
  //     width: "80%",
  //     backgroundColor: "#e0e0de",
  //     borderRadius: 50,
  //     margin: 50,
  //   };

  //VERSION 2 containerStyles
  const containerStyles = {
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    width: "18em",
    marginBottom: "0.2em",
    marginLeft: "3em",
    boxSizing: "border-box",
    lineHeight: 1,
  };

  //VERSION 1 and VERSION 2
  const fillerStyles = {
    height: "100%",
    width: `${percentComplete}%`,
    backgroundColor: bgColor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  //NEEDED FOR VERSION 3 only
  //   const barWidthStyle = {
  //     width: `${percentComplete}%`,
  //   };

  //VERSION 1 and VERSION 2
  const labelStyles = {
    width: `100%`,
    padding: 5,
    color: "white",
    fontSize: "65%",
  };

  //VERSION 7 = VERSION 1 but with short question as text, nothing more
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${pollQuestion}`}</span>
      </div>
    </div>
  );
};

//VERSION 6 - cutting to realistic data -+ flx
//   return (
//     <div className="outerTestPollResultsBarBox">
//       <p className="pollQuestionStyles">{`${pollQuestion}`}</p>
//       <div className="containerStyles">
//         <div className="fillerStyles">
//           <span className="labelStyles">{`${pollVotes}`}</span>
//         </div>
//       </div>
//     </div>
//   );

//VERSION 5 - BOTH Version 4 and version 1 + flex
//   return (
//     <div className="outerTestPollResultsBarBox">
//       <p> version 4 - styles in stylesheet</p>
//       <div className="containerStyles">
//         <div className="fillerStyles">
//           <span className="labelStyles">{`${pollResultText}`}</span>
//         </div>
//       </div>
//       <p> version 1 - styles inside js</p>
//       <div style={containerStyles}>
//         <div style={fillerStyles}>
//           <span style={labelStyles}>{`${pollResultText}`}</span>
//         </div>
//       </div>
//     </div>
//   );

//VERSION 4 - hardcoding 'filler' width to 50% in csst
//   return (
//     <div className="containerStyles">
//       <div className="fillerStyles">
//         <span className="labelStyles">10000</span>
//       </div>
//     </div>
//   );

//VERSION 3 - moving css to stylesheet
//   return (
//     <div className="containerStyles">
//       <span className="fillerStyles" style={barWidthStyle}>
//         <span className="labelStyles">10</span>
//       </span>
//       <span className="labelStyles">{`${pollResultText}`}</span>
//     </div>
//   );

//VERSION 2 - trying labeltext outside the coloured bit
//   return (
//     <div style={containerStyles}>
//       <span style={fillerStyles}>
//         <span style={labelStyles}>10</span>
//       </span>
//       <span style={labelStyles}>{`${pollResultText}`}</span>
//     </div>
//   );

//VERSION 1 - working
//   return (
//     <div style={containerStyles}>
//       <div style={fillerStyles}>
//         <span style={labelStyles}>{`${pollResultText}`}</span>
//       </div>
//     </div>
//   );
// };

export default TestPollResultsBar;

// ************************************************************
// CALL TestPollResultsBar  AS FOLLOWS:
// import React from "react";
// import "./App.css";
// import TestPollResultsBar from "../TestPollResultsBar/index.js";

// //const pollResultsData needs (0) pollResultId - to be unique key for React plus props (i)bgColor, (ii) percentComplete (iii) pollResultText
// const pollResultsData = [
//   { pollResultId: 1, bgColor: "#6a1b9a", percentComplete: 33, pollResultText: "Sat 25th.  2 votes"},
//   { pollResultId: 2, bgColor: "#f780ed", percentComplete: 50, pollResultText: "Sun 26th.  3 votes"},
//   { pollResultId: 3, bgColor: "#5557da", percentComplete: 16, pollResultText: "Fri 12th.  1 vote"}
// ];

// function App() {
//   return (
//     <div>
//       {pollResultsData.map((currItem) => (
//         <TestPollResultsBar key={currItem.pollResultId} bgColor={currItem.bgColor} percentComplete={currItem.percentComplete} pollResultText= {currItem.pollResultText}/>
//       ))}
//     </div>
//   );
// }

// export default App;
