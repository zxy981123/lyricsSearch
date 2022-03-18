import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material'

const lYRICS_LIMIT = 200

export default class SongCard extends React.Component {
  render() {
    let { songName,singer,lyrics } = this.props

    return (
      <div>
        <Card raised className="card-container">
          <CardMedia
            className="card-media"
            component="img"
            height="140"
            image={this.props.thumbnail}
            />
            <div className="card-content">
              <CardContent>
                <Typography variant="h6">Name: {songName}</Typography>
                <br/>
                <Typography variant="body2">Singer: {singer}</Typography>
                <br/>
                <Typography variant="body2">lyrics: {lyrics}</Typography>
              </CardContent>
            </div>
        </Card>
      </div>
    )
  }
}

SongCard.propTypes = {
  song: PropTypes.shape({
    songName: PropTypes.string.isRequired,
    singer: PropTypes.string.isRequired,
    lyrics: PropTypes.string.isRequired
  })
}