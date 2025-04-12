
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {Container, Box, Stack, Typography, TextField, Button, Card,CardMedia, Toolbar,AppBar, Paper, Grid} from '@mui/material'
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState,useEffect } from 'react'
import movies from './assets/movies.png'
import './App.css'

const theme = createTheme({
  palette:{
    background:{
      default:"#B3C8CF",
      paper:"#FFFDF0",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          '& fieldset': {
            border: 'none', 
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #c5d4c9 inset",
            transition: "background-color 5000s ease-in-out 0s",
          },
          backgroundColor: '#e0f7fa', 
        },
        
      },
      
    
    },
    MuiPaper: {
      defaultProps: {
        elevation: 8,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          border: 'none',
          color: '#000000',
          '&:focus': {
            outline:'none',
          },
        },
      },
    },
  },
});

function App() {
  const [text, setText] = useState("");
 // const [search, setSearch] = useState(true);
  const [response, setResponse]=useState([]);


  useEffect(()=>{
    fetch(`https://www.omdbapi.com/?apikey=2e4ac23d&s=John Wick`)
    .then((response)=>response.json())
    .then((data)=>{console.log(data);setResponse(data.Search)})
    .catch(error => console.log("Error", error))
     }, []);

  const handleClick = ()=>{
    fetch(`https://www.omdbapi.com/?apikey=2e4ac23d&s=${text}`)
    .then((response)=>response.json())
    .then((data)=>{console.log(data);setResponse(data.Search)})
    .catch(error => console.log("Error", error))
 
    
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{width:"100%",}}  disableGutters maxWidth={false}>
          <Box>
          <AppBar>
          <Toolbar sx={{backgroundColor:"lightblue", width:"100%", height: '5rem', display:'flex', justifyContent: 'center'}}>
            
            <Stack gap={1} sx={{display:'flex', flexDirection: 'row', width:'50%'}}> 
            <TextField variant="outlined" value={text} onChange={(e)=>setText(e.target.value)}  sx={{width:"90%"}} placeholder="Search your movie here..."></TextField>
            <Button variant="outlined" onClick={handleClick}>search</Button>
            </Stack>

          </Toolbar>
          </AppBar>
          </Box>
          <Toolbar/>

 
        
        
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            sx={{ width: '100%', bgcolor: '',paddingTop: '2rem' }}
          >
              {response.map((ele) => (
                <Box key={ele.imdbID} sx={{ width: 400, }}>
                  <Card 
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      padding: '0.5rem',
                      borderRadius: 2,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  
                      '&:hover': {
                        transform: 'scale(1.05)',

                        boxShadow: 20,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={ele.Poster}
                      sx={{
                        width: '100%',
                        height: 300,
                        objectFit: 'fill',
                        borderRadius: 1,
                      }}
                    />
                    <Stack spacing={1} >
                      <Typography variant="h5" fontWeight={600}>Title: {ele.Title}</Typography>
                      <Typography variant="h6" fontWeight={600}>Type: {ele.Type}</Typography>
                      <Typography variant="h6" fontWeight={600}>Year: {ele.Year}</Typography>
                    </Stack>
                  </Card>
                </Box>
              ))}
           </Box>

        </Container>
      </ThemeProvider>

    </>
  )
}

export default App
