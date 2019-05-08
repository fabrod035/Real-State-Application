import React from 'react'
import PropertyList from './PropertyList'
import Loader from '../../components/Loader'
import HelpToast from './HelpToast'
// import AuctionDataQuery from './AuctionDataQuery'
import AddressForm from './AddressForm'

import {ToastContainer, toast} from 'react-toastify'
import ReactGA from 'react-ga'
import 'react-toastify/dist/ReactToastify.css'
import {getPropertyDetailsExceptZillow} from '../../apis/zillow-api'

import {zillow_url, zillow_updated_url,realtor_url,zillow_single_url} from '../../config'
import {currencyToNumber,currencyToNumber3,avg,normalizeZillowProperty} from '../../utils';
let removeHash = value => value.replace('# ', '')



function calculateAvg(attom,chase,eppraisal,pennymac,zillow,realtor){
  let zill = zillow.resl.length > 1
        ? zillow.resl.map(normalizeZillowProperty)
        : normalizeZillowProperty(zillow.resl[0])
        
  let z = currencyToNumber(zill.length > 1
                          ? zill[0].zestimate
                          : zill.zestimate)
    let e = currencyToNumber(eppraisal.data.eppraisal.value)
    let p = currencyToNumber(pennymac ? pennymac.Valuation.Estimate : null)
    let r = currencyToNumber3(realtor.value ? realtor.value : 0)
    let c = Number(chase ? (chase.msg ? 0 : chase.price) : 0)
    let a = Number(attom.data.amount ? attom.data.amount.value : 0)
    let average = avg(z,e,p,a,c,r);
    return average;
}





function uppercase(val) {
  if (val) {
    return val.toUpperCase()
  }
  return val
}
function cleanAddress(value) {
  if (value) {
    return value.replace(/[-_/.]/g, '')
  }
  return value
}
const api = zillow_url
//const api = "https://e97ab9db.ngrok.io/.netlify/functions/api/property?";
function constructAddress(houseNumber, street) {
  return houseNumber && street
    ? `${houseNumber} ${street}`
    : houseNumber
    ? houseNumber
    : street
}

export default class Home extends React.Component {
  componentDidMount() {
    this.props.history.listen(location => ReactGA.pageview(location.pathname))
  }
  state = {
    results: [],
    checks: [],
    loader: false,
    realtor:null,
    avg:null,
    address_final: '',
    cityorzip: '',
    address: {
      city: '',
      postalCode: '',
      state: '',
      street: '',
      houseNumber: '',
      county: '',
    },
    error: '',
  }
  handleChange = e => {
    let {target} = e
    let {name} = target
    this.setState(() => {
      return {
        [name]: target.value,
      }
    })
  }
  search = e => {
    e.preventDefault()
    let {address_final, cityorzip: citystatezip,address} = this.state
    let {houseNumber,street,city,state,postalCode} = address;
    if(!houseNumber && !street){
      toast.error('Please type complete address',{
        position:toast.POSITION.TOP_RIGHT
      })
      return;
    }
    // getPropertyDetailsExceptRealtor({
    //   addr:`${houseNumber} ${street}`,
    //   cityorzip:postalCode,
    //   pennymacaddr:`${houseNumber} ${street}, ${city}, ${state} ${postalCode}`,
    //   address1:`${houseNumber} ${street}`,
    //   address2: `${city}, ${state}`,
    //   zip:postalCode,
    //   zillow_ad:`${houseNumber} ${street}`
    // }).then(data => {
    //   console.log('Finals data ', data);
    //   //const avg = calculateAvg(data);
    //   //this.setState({avg})
    // })
    this.setState({loader: true})
    fetch(
      api +
        `addr=${encodeURIComponent(
          cleanAddress(address_final),
        )}&pin=${citystatezip}`,
    )
      .then(resp => resp.json())
      .then(results => {
        if (results.status === 404) {
          this.setState({loader: false, results: []})
          toast.error(results.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
          return
        }
        //this.setState({results: results.resl, loader: false})
        if (results.resl.length < 2) {
          Promise.all(
            [...results.resl
              .map(({zpid}) => zpid[0])
              .map(val =>
                fetch(zillow_updated_url + `zpid=${val}`).then(resp =>
                  resp.json(),
                ),
              ),
               fetch(
            `${zillow_single_url}addr=${encodeURIComponent(
              cleanAddress(`${houseNumber} ${street}`),
            )}&pin=${postalCode}`,
          ).then(resp => resp.json()),getPropertyDetailsExceptZillow({
      addr:`${houseNumber} ${street}`,
      cityorzip:postalCode,
      pennymacaddr:`${houseNumber} ${street}, ${city}, ${state} ${postalCode}`,
      address1:`${houseNumber} ${street}`,
      address2: `${city}, ${state}`,
      zip:postalCode,
      zillow_ad:`${houseNumber} ${street}`
    })]
          ).then(arr => {
            let data = arr.pop();
            let {attom,chase,eppraisal,zillow,pennymac} = data;
            //this.setState({checks: data})
            //console.log('Realtor ', arr);
            let zillo = arr.pop()
            console.log(attom,chase,eppraisal,pennymac,zillo);
            const avg = calculateAvg(attom,chase,eppraisal,pennymac,zillow,zillo);
            this.setState({
              results: results.resl,
              checks: arr.map(val => ({
                code: val.data.message.code,
                zpid: val.data.request.zpid,
              })),
              realtor:zillo,
              avg,
              loader: false,
            })
            return
          })
        }
        this.setState({results: results.resl, loader: false})
      })
  }

  reset = () => {
    this.setState({results: [], checks: []}) //, address_final: ''
  }

  setAddress = val => {
    if (typeof val === 'object') {
      this.setState({address: val})
      this.setState({
        cityorzip: val.postalCode,
        address_final: constructAddress(val.houseNumber, val.street),
      })
    } else {
      //this.setState((state)=>({error:'Not found'}))
    }
  }

  render() {
    let {
      results,
      loader,
      error,
      address_final,
      cityorzip,
      checks,
      address,
      realtor,
      avg
    } = this.state
    return (
      <div>
        {!loader && results.length === 0 && (
          <div>
            <div className="masthead">
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-sm-12 col-md-12 com-lg-12 d-flex justify-content-center">
                    <div
                      className="bg-white p-4 shadow-lg rounded"
                      align="center"
                      style={{minHeight: '75vh'}}
                    >
                      <ToastContainer />
                      <h2 className="mt-4">Home Value Estimator</h2>
                      <p>
                        <b>
                          Ex. "Add.: Vista Ave, City/State/Zip: Hamilton MO"
                        </b>
                      </p>
                      <form>
                        <div className="mt-4 mb-4">
                          {!!error ? (
                            {error}
                          ) : (
                            <h2
                              className="text-info mb-4"
                              onClick={this.search}
                              style={{cursor: 'pointer'}}
                            >
                              {this.state.address.houseNumber}{' '}
                              {this.state.address.street}{' '}
                              {this.state.address.city}{' '}
                              {this.state.address.state}{' '}
                              {this.state.address.postalCode}{' '}
                            </h2>
                          )}
                          <div className="col-auto">
                            <AddressForm setAddress={this.setAddress} />
                          </div>
                        </div>
                      </form>
                      <HelpToast />
                      {loader ? <Loader /> : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12">
              {loader ? (
                <Loader />
              ) : results.length > 0 ? (
                <div>
                  <button
                    className="btn btn-primary mt-4 float-right"
                    onClick={this.reset}
                  >
                    Reset
                  </button>
                  {/*<AuctionDataQuery
                    state={uppercase(address.state)}
                    city={uppercase(address.city)}
                    street={uppercase(address.street)}
                  />*/}
                  <PropertyList
                    results={results}
                    checks={checks}
                    address_final={address_final}
                    cityorzip={cityorzip}
                    realtor={realtor}
                    avg={avg}
                    {...this.props}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
