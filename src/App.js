import React, { Component, Fragment } from 'react'
import { Container, Skeleton, Link, createTheme, ThemeProvider } from '@mui/material'
import Result from './components/Result.js'
// import SearchInput from './components/SearchInput.js'
// import Search from './components/Search.js'
import SearchTest from './components/SearchTest.js'
import API from './components/API.js'

const theme = createTheme({
      palette: {
        primary: {
          main: '#2196f3',
        },
        secondary: {
          light: '#cc33ff',
          main: '#e699ff',
          contrastText: '#ffcc00',
        },
        button:{
          fontStyle: 'italic',
        }
      },
    })

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      songs: [{songName:'a',singer:'a1',lyrics:'a2'}],
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
          <Container className="app">
            <h3>
              <Link color="primary" underline="none" variant="inherit" onClick={() => window.location.reload()}>
                Lyrics Search Engine
              </Link>
            </h3>
            <div className="search-container">
              {/* <SearchInput
                performSearch={this.performSearch}
                showErrorMsg={showErrorMsg}
              /> */}
              <SearchTest />
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
          </Container>
        </ThemeProvider>
        </div>
    )
  }
}