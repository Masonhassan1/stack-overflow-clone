import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from "react";
import "./css/AllQuestions.css";
import { Link } from "react-router-dom";
import moment from "moment";

function AllQuestions({ data }) {

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0,n) + "..." : str;
  }

  const { tags } = data;
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>Votes</span>
            </div>
            <div className="all-option">
              <p>{data?.answers?.length}</p>
              <span>Answers</span>
            </div>
            <div className="all-option">
              <small>2 Views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/question?qid=${data?._id}`}>{data.title}</Link>
          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: truncate(data.body, 200) }}/>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            {
              tags?.map((tag,idx) => {
                return (
                  <p
                    style={{
                      margin: "10px 5px",
                      padding: "5px 10px",
                      backgroundColor: "#007cd446",
                      borderRadius: "3px",
                    }}
                    key={idx}
                  >
                    {tag}
                  </p>
                );
              })
            }
          </div>
          <div className="author">
            <small>{ moment(data.created_at).fromNow() }</small>
            <div className="auth-details">
              <AccountCircleIcon/>
              <p>
                  { !!data?.user ?data?.user: "Unknown" }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
