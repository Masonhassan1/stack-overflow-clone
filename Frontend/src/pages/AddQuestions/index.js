import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./index.css";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import withAuth from "../helpers/loginHoc";
import Navbar from "../../components/Navbar";


const AddQuestion = (props) => {

  const { userData, isAuth } = props;
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [title, setTitle] = useState("");
  const [quill, setQuill] = useState("");
  const [tag, setTag] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!!title && !!quill){
      if(isAuth){
        setLoading(true)
        const data = {
          title: title,
          body: quill,
          tags: JSON.stringify(tag),
          user: userData?.user?.username
        }
        await axios.post(`${API_ENDPOINT}/api/question`, data).then((res) => {
          alert("Your question submitted successfully");
          setLoading(false)
          navigate('/')
        })
        .catch((err)=> {
          console.log(err)
        })  
      } else{
        navigate("/login")
      }
      
    }
    else {
      alert("All fields are required")
    }
  }
  
  return (
    <>
    <Navbar/>
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
              <div className="question-option">
                <div className="title">
                  <h3>Title</h3>
                  <small>
                    Be specific and imagine you’re asking a question to another
                    person
                  </small>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    type="text"
                    placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                    required
                  />
                </div>
              </div>
              <div className="question-option">
                <div className="title">
                  <h3>Body</h3>
                  <small>
                    Include all the information someone would need to answer your
                    question
                  </small>
                  <ReactQuill
                    value={quill}
                    name="body"
                    onChange={(e) => setQuill(e)}
                    // modules={Editor.modules}
                    className="react-quill"
                    theme="snow"
                  />
                </div>
              </div>
              <div className="question-option">
                <div className="title">
                  <h3>Tags</h3>
                  <small>
                    Add up to 5 tags to describe what your question is about
                  </small>

                  <TagsInput
                    value={tag}
                    onChange={setTag}
                    name="fruits"
                    placeHolder="press enter to add new tag"
                  />

                </div>
              </div>
              <button 
                className="button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Ask your question" }
              </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default withAuth(AddQuestion);
