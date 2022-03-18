import React from 'react'
import { Grid, Typography,Pagination } from '@mui/material'
import PropTypes from 'prop-types'
import SongCard from './SongCard.js'
import API from './API.js'

export default class Result extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      songId: null,
      offset: 0,
      perPage: 10,
      errorSongInfoMsg: '',
      songInfo: {}
    }
  }

  componentDidMount() {
    this.setState({ data: this.props.data})
  }

  handleClick = (offset) => {
    this.setState({ offset })
  }

  render() {
    const { data, offset, perPage} = this.state
    const { queryTime } = this.props
    const time = (Math.round(queryTime * 100) / 100).toFixed(3)

    return(
      <div>
        <Grid container className="result" spacing={6}>
          <Grid item xs={8}>
            <Typography variant="body1" className="query-results">{`Query results: ${data.length} songs (${time} seconds)`}</Typography>

            {data.length > perPage &&
              <Pagination
                limit={perPage}
                offset={offset}
                total={data.length}
                currentPageColor="primary"
                onClick={(e, offset) => this.handleClick(offset)}
              />
            }

            {data.slice(offset, offset + perPage).map((song, idx) =>
              <SongCard  key={idx} {...song} />
            )}

            {data.length > perPage &&
              <Pagination
                limit={perPage}
                offset={offset}
                total={data.length}
                currentPageColor="primary"
                onClick={(e, offset) => this.handleClick(offset)}
              />
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}
Result.propTypes = {
  data: PropTypes.array.isRequired,
  queryTime: PropTypes.number.isRequired
}
