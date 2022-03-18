import React, { Component} from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import API from './API.js'

export default class Search extends Component {
    constructor(props) {
    super(props)
    this.state={
      query: '',
      songName: '',
      singer: ''
    }
    }
    onSearchChange = e => {
        const query = e.target.value
        this.setState({ query }, async () => {
            if (query.length && /(\w+)\s$/.test(query)) {
              this.queryComplete(query)
            } else if (!query.length) {
              this.setState({ suggestions: [] })
            }
          })
    }
    querySuggestion = async query => {
        const response = await API.get(`/query_suggest?query=${query}`)
        console.log('response', response)
        this.setState({ suggestions: response.data.results })
      }
    
    setSearchInput = (event) => {
        this.setState({ query: event.target.text }, this.selectSearch)
    }

    selectSearch = e => {
        e && e.preventDefault()
        const { query, songName, singer, keywords } = this.state
        const advancedSearchParams = { songName, singer, keywords }
        this.props.performSearch({query, ...advancedSearchParams}, this.state.movieSearchEnabled)
      }

    render(){
        return(
            <Paper
            component="form"
            sx={{ p: '3px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
            <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Lyrics"
            inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
            </IconButton>
            </Paper>
        )
    }
}