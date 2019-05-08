import React from 'react'
import axios from 'axios'
import {upload_url_mongo} from '../../config'
import uniqueRandomArray from 'unique-random-array'
function uppercase(val) {
  if (typeof val === 'string') {
    return val.trim().toUpperCase()
  }
  return val
}
function AddressItem({label, value, onChange, placeholder}) {
  return (
    <div className="row form-group justify-content-start">
      <div className="col-xl-12 col-md-12 col-lg-12">
        <input
          type="text"
          defaultValue={value}
          onChange={onChange}
          className="form-control"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

function AddressSuggest({query, onChange}) {
  return (
    <AddressItem
      value={query}
      onChange={onChange}
      placeholder="start typing address"
    />
  )
}

export default class AddressForm extends React.Component {
  constructor(props) {
    super(props)
    // User has entered something in address suggest field
    this.onQuery = this.onQuery.bind(this)
    this.getEmptyAddress = this.getEmptyAddress.bind(this)
    const address = this.getEmptyAddress()
    this.state = {
      address: address,
      query: '',
      //locationId: '',
    }

    this.onQuery = this.onQuery.bind(this)
  }
  getEmptyAddress() {
    return {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    }
  }
  onQuery(evt) {
    const query = evt.target.value
    if (!query.length > 0) {
      const address = this.getEmptyAddress()
      return this.setState({
        address: address,
        query: '',
        locationId: '',
      })
    }

    const self = this
    const proxies = [
      {app_id: 'cphBq9TpWrcj6M1xzsMI', app_code: '5V2ffnepOep_MteDjxopiw'},
      {app_id: '5qynimU7MJo63wgO6e9N', app_code: 'ULauTuEfATQoShRhyg2Y3Q'},
      {app_id: '5qynimU7MJo63wgO6e9N', app_code: 'ULauTuEfATQoShRhyg2Y3Q'},
      {app_id: 'EwHYtitMFGXnasKwp5Tw', app_code: 'k2-JLxmxfK9YS8DzDSXqIQ'},
    ]
    const rand = uniqueRandomArray(proxies)
    const cred = rand()
    axios
      .get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json', {
        params: {
          ...cred,
          query,
          maxresults: 1,
        },
      })
      .then(function(response) {
        const address = response.data.suggestions[0]
          ? response.data.suggestions[0].address
          : 'Not found'
        //const id = response.data.suggestions[0].locationId
        self.props.setAddress(address)
        self.setState({
          address: address,
          query: query,
          //locationId: id,
        })
      })
    let {
      address: {street, city, state},
    } = this.state
    let {setResults} = this.props
    setResults({loading: true})
    axios
      .get(upload_url_mongo, {
        params: {
          state: uppercase(state),
          city: uppercase(city),
          street: uppercase(street),
        },
      })
      .then(resp => {
        //console.log('Resp',resp);
        setResults({
          results: resp.data.data.results,
          error: resp.data.error,
          loading: false,
        })
      })
      .catch(e => {
        //console.log('Error',e);
        setResults({error: 'Not found!'})
      })
  }

  render() {
    return (
      <div class="container">
        <AddressSuggest query={this.state.query} onChange={this.onQuery} />
      </div>
    )
  }
}
