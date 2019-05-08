import React, {useEffect, useState} from 'react'
import axios from 'axios'
import AuctionResults from './AuctionResults'

import {upload_url_mongo} from '../../config'

export default class extends React.Component {
  state = {
    results: [],
    error: null,
  }
  componentDidMount() {
    let {state, city, street} = this.props
    axios
      .get(upload_url_mongo, {
        params: {
          state,
          city,
          street,
        },
      })
      .then(resp => {
        this.setState({
          results: resp.data.data.results,
          error: resp.data.data.error,
        })
      })
      .catch(e => {
        this.setState({results: []})
      })
  }
  render() {
    let {error, results} = this.state
    return <div>{!error ? <AuctionResults results={results} /> : ''}</div>
  }
}
