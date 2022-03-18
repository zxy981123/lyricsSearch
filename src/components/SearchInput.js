import React, { Component } from 'react'
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

  render() {
    const { keySearchEnabled, invalidMessage, suggestions } = this.state
    const { showErrorMsg } = this.props
    console.log(suggestions)

    return (
      <Grid item xs={12}>
        <form noValidate autoComplete="off" onSubmit={this.selectSearch}>
          <div className="search-form">
            <div className="search-input">
              <Autocomplete
                id="outlined-basic"
                getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
                options={suggestions}
                autoComplete
                includeInputInList
                disableOpenOnFocus
                debug  
                disableListWrap
                freeSolo
                className="suggestions"
                renderInput={params => {
                  return(
                  <TextField
                    {...params}
                    label={keySearchEnabled ? 'Search for keywords in a song...' : 'Search for song lyrics...'}
                    variant="outlined"
                    fullWidth
                    onChange={this.onSearchChange}
                  />
                )}}
                renderOption={option => {
                  console.log(option)

                  return (
                    <div>{option}</div>
                  );
                }}
              />
            </div>

            <Button
              className="search-button"
              variant="outlined"
              color="button"
              type="submit"
            >Search for songs</Button>

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

          {invalidMessage.length ? <Typography variant="body1" className="error-message">{invalidMessage}</Typography> : ''}
        </form>

        {showErrorMsg &&
          <h6 className="error-container">
            Oops, query timeout. Please try again.
          </h6>
        }
      </Grid>
    )
  }
}

SearchInput.propTypes = {
  performSearch: PropTypes.func.isRequired,
  showErrorMsg: PropTypes.bool.isRequired
}