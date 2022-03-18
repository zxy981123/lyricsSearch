import React, { Component} from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import PropTypes from 'prop-types'
import { Grid, FormControlLabel, TextField, Button , Typography, Checkbox } from '@mui/material'
import { Autocomplete } from '@mui/material'
import API from './API.js'

//import './searchInput.scss'

export default class SearchInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      keySearchEnabled: false,
      invalidMessage: '',
      suggestions: []
    }
  }

  componentDidMount() {
    this.setState({ showErrorMsg: false, invalidMessage: '' })
  }

  onSearchChange = e => {
    const query = e.target.value

    this.setState({ query }, async () => {
      if (query.length && /(\w+)\s$/.test(query)) {
        this.querySuggestion(query)
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
    this.setState({ query: event.target.text }, this.lyricsSearch)
  }

  lyricsSearch = e => {
    e && e.preventDefault()
    const { query } = this.state
    this.props.performSearch({query}, this.state.keySearchEnabled)
  }


  keySearch = (e) => {
    const { query } = this.state
    const keySearchEnabled = e.target.checked
  //打勾
    this.setState({ keySearchEnabled }, () => {
      if (query.length) {
        this.props.performSearch({query}, keySearchEnabled)

      }
    }
    )
  }

    render(){
        const { keySearchEnabled, invalidMessage, suggestions } = this.state
        const { showErrorMsg } = this.props
        console.log(suggestions)
        return(
          <div>
            <Paper
            component="form"
            sx={{ p: '3px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
            <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={keySearchEnabled ? 'Search for keywords in a song...' : 'Search for song lyrics...'}
            inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
            </IconButton>
            </Paper>

            <FormControlLabel className="song-search"
              control={
                <Checkbox
                  checked={keySearchEnabled}
                  onChange={this.keySearch}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Search for keywords"
            />
          </div>
            
        )
    }
}