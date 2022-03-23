import React, { Component, Fragment } from 'react'
import { Box, IconButton, Container, Skeleton, Link, createTheme, ThemeProvider, Typography, AppBar, Toolbar, CssBaseline, Button } from '@mui/material'
//import LyricsIcon from '@mui/icons-material/Lyrics';
import aaa from './static/images/logo.jpg'
//import Background from './static/images/background.jpg'
import Result from './components/Result.js'
import SearchInput from './components/SearchInput.js'
import API from './components/API.js'
import './App.css'

// var sectionStyle = {
//   width: "100%",
//   height: "200px",
//   //width:'1500px',
//   backgroundImage: `url(${Background})` 
// };

// const bg = {
//   height: '100%',
//   //color: 'red',
//   //background: url("../../source/1.jpg"),
//   background: require("./static/images/background.jpg"),
// };

const theme = createTheme({
      palette: {
        primary: {
          //main: '#2196f3',
          //main:'#F3F3F3'
          main: '#242424'
        },
        secondary: {
          main: '#ffffff',
        },
        box:{
          main: '#2196f3',
        }
      },
    })

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      songs: [{songName:'True Love',singer:'a1',lyrics:"Rich man, poor man, beggar or king,\n You just can't have everything.\nSo thank your stars above\nFor a song in your heart."},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'},{songName:'a',singer:'a1',lyrics:'a2'}],
      //songs:[],
      showCards: true,
      showErrorMsg: false,
      loading: false,
      queryTime: 1
    }
  }

  performSearch = (data, keySearchEnabled) => {
          const { query } = data
      
          this.setState({ loading: true, showErrorMsg: false }, async () => {
            try {
              const response = await API.post(
                  keySearchEnabled ? '/key_search':'/lyrics_search',
                { query } 
              )
              this.setState({
                songs: response.data.songs,
                queryTime: response.data.query_time,
                showCards: true,
                loading: false
              })
            } catch (error) {
              console.error(error)
              this.setState({
                showErrorMsg: true,
                loading: false
              })
            }
          })
        }

  render() {
    const { showCards, songs,showErrorMsg, loading, queryTime } = this.state

    return (
      <div>
       <ThemeProvider theme={theme}>
        <CssBaseline/>
          <AppBar position='relative'>
          <Toolbar>
            <Typography variant='h4' onClick={() => window.location.reload()}>
              Lyrics Search
            </Typography>

          </Toolbar>
          </AppBar>
     
          <div className="skeleton-card">
          <Container fixed>       
              <SearchInput
                performSearch={this.performSearch}
                showErrorMsg={showErrorMsg}
              />
              </Container>
            </div>
            <Fragment>
              {loading ?
                <Fragment>
                  {Array.apply(null, { length: 5 }).map((e, i) => (
                    <Skeleton variant="rect" width={790} height={170} className="skeleton-card" />
                  ))}
                </Fragment>
                : showCards && <Result data={songs} queryTime={queryTime} />
              }
            </Fragment>

        
        </ThemeProvider>

        </div>
        
        
    )
  }
}