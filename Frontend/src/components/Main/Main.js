import React from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import "./css/Main.css";
import AllQuestions from "./AllQuestions";
import { Link } from "react-router-dom";
// import axios from "axios";

function Main({ questions, user }) {

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <p>{questions.length} questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                {/* <a href="/">Newest</a> */}
                <Link to="/">Newest</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Active</Link>

                {/* <a href="/">Active</a> */}
              </div>
              <div className="main-tab">
                {/* <a href="/">More</a> */}
                <Link to="/">More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterListIcon />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
          {questions?.map((ques) => (
            <div className="question" key={ques._id}>
              <AllQuestions data={ques}/>
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
}

export default Main;
