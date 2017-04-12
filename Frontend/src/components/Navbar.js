import * as React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import "./css/navbar.css";
import { Link } from 'react-router-dom';
import { Avatar, Box, Button } from '@mui/material';
import { useNavigate  } from "react-router-dom";
import withAuth from '../pages/helpers/loginHoc';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = (props) => {
  const { isAuth, onSearch, userData} = props;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    onSearch(searchQuery);
  }

  const onSearchSubmit = (e) => {
      e.preventDefault();
      props.onSearch(searchQuery);
  }

  return (
    <header>
    <div className="header-container">
      <div className="header-left">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png"
            alt="logo"
          />
        </Link>
        <h3>Products</h3>
      </div>
      <form onSubmit={onSearchSubmit}>
        <div className="header-middle">
          <div className="header-search-container">
              <SearchIcon />
              <input type="text" placeholder="Search" className="search-box" value={searchQuery} onChange={handleChange} />
              <input type="submit" hidden />
          </div>
        </div>
      </form>
      <div className="header-right">
        <div className="header-right-container">
          {/* {window.innerWidth < 768 && <SearchIcon />} */}
          { isAuth ? 
            <>
              { userData?.user.username } <LogoutIcon onClick={handleLogout}/>
            </>            
          : 
            <Button variant="outlined" className='m-1' size="small" onClick={() => navigate("/login")}>Login</Button>
          }
        </div>
      </div>
    </div>
  </header>
  );
}

export default  withAuth(Navbar);