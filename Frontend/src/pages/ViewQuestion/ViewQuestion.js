import React from "react";
import Sidebar from "../../components/Main/Sidebar";
import Navbar from "../../components/Navbar";
import "./index.css";
// import MainQuestion from "./MainQuestion";
import Question from "./Question";

const ViewQuestion = () => {
  return (
    <>
      <Navbar/>
      <div className="stack-index">
        <div className="stack-index-content">
          <Sidebar />
          <Question />
        </div>
      </div>
    </>
  );
}

export default ViewQuestion;
