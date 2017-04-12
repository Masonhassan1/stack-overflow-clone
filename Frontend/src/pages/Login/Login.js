import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import Navbar from '../../components/Navbar';

const theme = createTheme();

export default function Login() {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [login, setLogin] = React.useState(true)
  const [auth, setAuth] = React.useState(false);
  const [error, setError] = React.useState("")
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(login){
      if(data.get('email').trim().length > 0 &&
        data.get('password').trim().length > 0){
            const signin = {
              email: data.get('email'), 
              password: data.get('password'),
              formType: data.get('formType')
            }
          try{
            const response = await axios.post(`${API_ENDPOINT}/login`,signin)
            .then((res) => {
              if(res.status === 200){
                localStorage.setItem("token",res.data)
                setAuth(true)
              }
              else{
                alert("Invalid credentials");
              }
            })
          }
          catch(err) {
            setError(err.response.data)
            console.log("error",err)
          }

      } else {
        alert("All fields are required");
      }
    } else {
      if(data.get('username').trim().length > 0 &&
        data.get('email').trim().length > 0 &&
        data.get('password').trim().length > 0){
          const register = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            formType: data.get('formType')
          }
          try{
            await axios.post(`${API_ENDPOINT}/login`,register)
            .then((res) => {
              console.log("data",res)
              if(res.status === 200){
                alert("Successfull registered!! please login.")
              }
            })
          }
          catch(err){
            setError(err.response.data)
          }
      } else {
        alert("All fields are required");
      }
    }
    
  };

  const navigate = useNavigate();
  if(auth){
    navigate('/')
  }
  return (
    <>
    <Navbar/>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {error && <div style={{ color: "red"}}>{error}</div>}
          <Card variant="outlined" sx={{ boxShadow: 2, p:3 }}>
            <Typography component="h1" variant="h5">
                { login ? "Sign in": "Regsiter" }
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {!login && <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                /> }
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                /> */}
                <input type="hidden" name="formType" value={login ? "signin":"signup"}></input>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                { login ? "Sign In" : "Register" }
                </Button>
                <Grid container>
                {/* <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid> */}
                </Grid>
            </Box>
            </Card>
        </Box>

        <Typography sx={{ mt: 8, mb: 4 }} variant="body2" color="text.secondary" align="center" >
            <Link variant="body2" onClick={()=>{setLogin(!login)}} style={{cursor: "pointer"}}>
                { login ? "Don't have an account? Sign Up": "Already have an account? Login"}
            </Link><br/>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Stackoverflow Clone
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
      </Container>
    </ThemeProvider>
    </>
  );
}