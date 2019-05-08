import React from 'react'
import AddressForm from './AddressForm'
import {Spinner} from 'reactstrap'
import axios from 'axios'
import {upload_url_mongo} from '../../config'
import {Link} from 'react-router-dom'
import ReactGA from 'react-ga'
import {Container, Row, Col, Toast, ToastHeader, ToastBody} from 'reactstrap'
function uppercase(val) {
  if (typeof val === 'string') {
    return val.trim().toUpperCase()
  }
  return val
}
export default class QuickView extends React.Component {
  state = {
    address: null,
    error: null,
    results: [],
    loading: false,
  }
  componentDidMount() {
    this.props.history.listen(location => ReactGA.pageview(location.pathname))
  }
  search = () => {
    this.setState({loading: true})
    let {city, state, street} = this.state.address
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
        this.setState({
          results: resp.data.data.results,
          error: resp.data.error,
          loading: false,
        })
      })
      .catch(e => {
        //console.log('Error',e);
        this.setState({error: 'Not found!'})
      })
  }
  setResults = obj => {
    this.setState(obj)
  }
  setAddress = address => {
    this.setState({address})
  }
  render() {
    let {address, results, error, loading} = this.state
    return (
      <div className="container mt-4">
        <h1 className="display-3 text-center mb-3">search in uploaded csv</h1>
        <AddressForm
          setAddress={this.setAddress}
          setResults={this.setResults}
        />
        <h1
          className="text-info text-center mb-3 suggest-address"
          onClick={this.search}
        >
          {address && (
            <p>
              {address.street} {address.city} {address.state}
              {', '}
              {address.postalCode}
            </p>
          )}
        </h1>
        {loading && (
          <Container>
            <Row>
              <Col sm="12" md={{size: 6, offset: 6}}>
                <Spinner color="secondary" />
              </Col>
            </Row>
          </Container>
        )}
        {!error && (
          <div className="container">
            <div className="row">
              {results.map(result => {
                return (
                  <div className="col-md-6 col-lg-4 col-sm-12" key={result._id}>
                    <div className="p-3 my-2 rounded">
                      <Toast>
                        <ToastHeader>
                          {`${result.Street} ${result.City}, ${result.State} ${
                            result.Zip
                          }`}
                        </ToastHeader>
                        <ToastBody>
                          <p>
                            <b>Auction Location:</b>{' '}
                            {result['Auction Location']}
                          </p>
                          <p>
                            <b>Amount:</b> {result['Amount']}
                          </p>
                          <p>
                            {result['Time']}
                            {' | '}
                            {result['Date']}
                          </p>
                          <p>
                            <b>Borrower:</b>{' '}
                            {result['Borrower'] ? result['Borrower'] : 'N/A'}
                          </p>
                        </ToastBody>
                      </Toast>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}
