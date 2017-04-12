import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (ComponentToProtect) => {
  const AuthenticatedComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [data, setData] = useState({});
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
            if(!!token){
                try{
                    const reponse = await axios(`${API_ENDPOINT}/user`,{headers: {"Authorization" : `Bearer ${token}`} })
                        .then((res) => {
                        if (res.status === 200) {
                            setIsLoading(false);
                            setIsAuthenticated(true);
                            setData(res.data)
                        } else {
                            setIsLoading(false);
                            setIsAuthenticated(false);
                        }
                        })
                        .catch((err) => {
                            console.error(err);
                            setIsLoading(false);
                            setIsAuthenticated(false);
                        });
                } catch(err){
                    console.log(err);
                }
                
            } else{
                setIsLoading(false);
                setIsAuthenticated(false)
                return "Authentication error"
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
      return <div 
            style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                width: "100%",
                height: "100vh"
            }}>
                Loading...
        </div>;
    }

    // if (!isAuthenticated) {
    //   navigate("/login");
    // }

    return <ComponentToProtect {...props} userData={data} isAuth={isAuthenticated} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;