
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "./index.css";

import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import moment from "moment";
import { useNavigate  } from "react-router-dom";
import withAuth from "../helpers/loginHoc";

const Question = (props) => {
    const {userData, isAuth} = props
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const [show, setShow] = useState(false);
    const [questionData, setquestionData] = useState([])
    const [comment, setComment] = useState("");
    const [answer, setAnswer] = useState("");
    
    //qid from url
    let search = window.location.search
    const params = new URLSearchParams(search)
    const id = params.get("qid");

    const navigate = useNavigate();
    // const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${API_ENDPOINT}/api/question/${id}`).then((res) => {
            setquestionData(res.data[0]);
        }).catch((err) => {
            console.log(err)
        })
    },[])

    const getUpdatedAnswer = async() => {
        await axios
          .get(`${API_ENDPOINT}/api/question/${id}`)
          .then((res) => setquestionData(res.data[0]))
          .catch((err) => {
            console.log(err)
        });
    }

    // add comment
    const handleComment = async() =>{
        const data = {
            question_id: id,
            comment: comment,
            user: userData?.user?.username,
        };
        if(!!comment){
            if(isAuth){
                await axios.post(`${API_ENDPOINT}/api/comment/${id}`, data).then((res) => {
                    setComment("");
                    setShow(false);
                    getUpdatedAnswer();
                })
            }else{
                navigate("/login")
            }
        }
        else {
            alert("All fields are required")
        }
    }
    //answer submit
    const handleAnswerSubmit = async() => {
        if(!!answer){
            if(isAuth){
                const data = {
                    question_id: id,
                    answer: answer,
                    user: userData?.user?.username,
                }
                await axios.post(`${API_ENDPOINT}/api/answer`,data).then((res) => {
                    setAnswer("");
                    getUpdatedAnswer();
                }).catch((err) =>{ 
                    console.log(err)})
            } else {
                navigate("/login")
            }
            
        } else {
            alert("All fields are required")
        }
    }
    const { answersDetails, tags, comments } = questionData;

    return (
        <div className="main">
            <div className="main-container">
                <div className="main-top">
                    <h2 className="main-question">{questionData.title}</h2>
                    <Link to="/add-question">
                        <button>Ask Question</button>
                    </Link>
                </div>
                <div className="main-desc">
                    <div className="info">
                        <p>Asked<span>{moment(questionData.created_at).fromNow()}</span></p>
                        <p>Active<span>today</span>
                        </p>
                        <p>
                            Viewed<span>43times</span>
                        </p>
                    </div>
                </div>
                <div className="all-questions">
                    <div className="all-questions-container">
                        <div className="all-questions-left">
                            <div className="all-options">
                                <p className="arrow">▲</p>
                                <p className="arrow">0</p>
                                <p className="arrow">▼</p>
                                <BookmarkIcon />
                                <HistoryIcon />
                            </div>
                        </div>
                        <div className="question-answer">
                            {/* <p>{questionData?.body}</p> */}
                            <div dangerouslySetInnerHTML={{ __html: questionData?.body }}/>
                            <div className="author">
                                <small>
                                    {moment(questionData.created_at).fromNow()}
                                </small>
                                <div className="auth-details">
                                    <AccountCircleIcon />
                                    <p>
                                        {!!userData?.user?.username ? userData?.user?.username : "Unknown"}
                                    </p>
                                </div>
                            </div>
                            <div className="comments">
                                <div className="comment">
                                    { comments?.map((cmt) => {
                                        return (
                                            <div key={cmt._id} style={{display: "flex", alignItems: "center"}}>
                                                <span>{cmt.comment}</span>  - <small>{moment(cmt.created_at).fromNow()}</small>
                                                <p style={{ padding: "2px", marginLeft:"5px"}}>{cmt.user}</p>
                                            </div>
                                        );
                                    })}
                                    
                                </div>
                                <p onClick={() => setShow(!show)}>Add a comment</p>
                                {show && (
                                    <div className="title">
                                        <textarea
                                            style={{
                                                margin: "5px 0px",
                                                padding: "10px",
                                                border: "1px solid rgba(0, 0, 0, 0.2)",
                                                borderRadius: "3px",
                                                outline: "none",
                                            }}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            type="text"
                                            placeholder="Add your comment..."
                                            rows={5}
                                            required
                                        />
                                        <button
                                            onClick={handleComment}
                                            style={{
                                                maxWidth: "fit-content",
                                            }}
                                        >
                                            Add comment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        flexDirection: "column",
                    }}
                    className="all-questions"
                >
                    <p
                        style={{
                            marginBottom: "20px",
                            fontSize: "1.3rem",
                            fontWeight: "300",
                        }}
                    >
                        {questionData && questionData?.answersDetails?.length} Answer(s)
                    </p>
                    { answersDetails?.map((ans) => {
                        return (
                            <div
                                style={{
                                    borderBottom: "1px solid #eee",
                                }}
                                key={ans._id}
                                className="all-questions-container"
                            >
                                <div className="all-questions-left">
                                    <div className="all-options">
                                        <p className="arrow">▲</p>
                                        <p className="arrow">0</p>
                                        <p className="arrow">▼</p>
                                        <BookmarkIcon />
                                        <HistoryIcon />
                                    </div>
                                </div>

                                <div className="question-answer">
                                    {/* <p>{ans.answer}</p> */}
                                    <div dangerouslySetInnerHTML={{ __html: ans.answer }}/>
                                    <div className="author">
                                        <small>
                                            {moment(ans.created_at).fromNow()}
                                        </small>
                                        <div className="auth-details">
                                            <AccountCircleIcon />
                                            <p>
                                                {!!ans.user ? ans.user : "Unkown"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    }
                        
                </div>

            </div>
            <div className="main-answer">
                <h3
                    style={{
                        fontSize: "22px",
                        margin: "10px 0",
                        fontWeight: "400",
                    }}
                >
                    Your Answer
                </h3>
                <ReactQuill
                    value={answer}
                    onChange={(e) => setAnswer(e)}
                    //   modules={Editor.modules}
                    className="react-quill"
                    theme="snow"
                    style={{
                        height: "200px",
                    }}
                />
            </div>
            <button
                onClick={handleAnswerSubmit}
                style={{
                    marginTop: "100px",
                    maxWidth: "fit-content",
                }}
            >
                Post your answer
            </button>
        </div>
    );
}

export default withAuth(Question);
