import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./css/index.css";
import Main from "./Main";
import axios from "axios";
import withAuth from "../../pages/helpers/loginHoc";
import Navbar from "../Navbar";

const Index = (props) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const { userData, isAuth } = props
  const [questions, setQuestions] = useState([]);
  const [search, setSearchKey] = useState("");
  const [error, setError] = useState("")

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // get all questions
    try{
      const reposnse = await axios.get(`${API_ENDPOINT}/api/question`).then((res) => {
        setQuestions(res.data.reverse())
      }).catch((err) => console.log(err))
    } catch(err){
      setError(err.response.data)
    }
  }

  const handleSearch = (searchKey) => {
    setSearchKey(searchKey)
  }

  const bySearch = (q, search) => {
      if (q) {
        return q.title.toLowerCase().includes(search.toLowerCase());
      } else return q;
  };

  const filteredList = (questions, search) => {
    return questions?.filter(q => bySearch(q,search));
  };

  return (
    <>
    <Navbar
      onSearch={handleSearch}
    />
    <div className="stack-index">
      { error && error.data.response}
      <div className="stack-index-content">
        <Sidebar />
        <Main questions={filteredList(questions, search)} user={userData}/>
      </div>
    </div>
    </>
  );
}

export default withAuth(Index);
