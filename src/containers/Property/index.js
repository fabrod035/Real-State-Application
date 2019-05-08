import React, {useEffect} from 'react'
import {Alert} from 'reactstrap'
import ReactGA from 'react-ga'
import Query from './query'
import SinglePropertyView from './SinglePropertyView'
import Loader2 from '../../components/Loader2'

function Property({location, ...props}) {
  useEffect(() => {
    props.history.listen(location => ReactGA.pageview(location.pathname))
  }, [])
  //console.log(match.params)
  //console.log('Props', props)
  const params = new URLSearchParams(location.search)
  const addr = params.get('addr')
  const cityAndState = params.get('cityandstate')
  const cityorzip = params.get('pin')
  const zpid = params.get('zpid')
  const zillow = params.get('zillow')
  return (
    <div className="container">
      <h1 className="mt-4">{addr + ', ' + cityAndState + ' ' + cityorzip}</h1>
      <hr />
      <Query
        zpid={zpid}
        addr={addr}
        cityorzip={cityorzip}
        pennymacaddr={addr + ', ' + cityAndState + ' ' + cityorzip}
        address1={addr}
        address2={cityAndState}
        zip={cityorzip}
        zillow_ad={zillow}
      >
        {({fetching, data}) => {
          return fetching ? (
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="col">
                  <Loader2 />
                </div>
              </div>
            </div>
          ) : data ? (
            <SinglePropertyView
              property={data}
              filename={addr + ', ' + cityorzip}
            />
          ) : (
            <Alert color="danger">
              Oops! Something went wrong. Please reload the page! Or{' '}
              <button
                className="btn-sm btn-danger"
                onClick={() => window.location.reload()}
              >
                Click Here
              </button>{' '}
              to reload.
            </Alert>
          )
        }}
      </Query>
    </div>
  )
}

export default Property
