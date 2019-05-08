import {useState, useReducer, useEffect, useRef} from 'react'
import isEqual from 'lodash/isEqual'
import * as zillow from '../../apis/zillow-api'

function useSetState(initialState) {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    initialState,
  )
  return [state, setState]
}

function Query({
  addr,
  zpid,
  cityorzip,
  children,
  pennymacaddr,
  address1,
  address2,
  zip,
  zillow_ad,
}) {
  const [state, setState] = useSetState({
    fetching: true,
    data: {},
  })
  useEffect(() => {
    if (isEqual(previousInputs.current, [addr, cityorzip])) {
      return
    }
    //setState({fetching:true});
    zillow
      .getPropertyDetails({
        addr,
        cityorzip,
        pennymacaddr,
        address1,
        address2,
        zip,
        zillow_ad,
      })
      .then(data => {
        //console.log(data)
        //console.log(data);
        //console.log(zpid);
        // debugger;
        if (data.zillow.resl.length > 1) {
          let z = {
            ...data.zillow,
            resl: data.zillow.resl.filter(
              zill => String(zill.zpid[0]) === String(zpid),
            ),
          }
          setState({data: {...data, zillow: z}, fetching: false})
          return
        }
        setState({data, fetching: false})
        //console.log(data)
        // setState({data:false, fetching: false})
      })
      .catch(e => {
        //console.log(e)
        setState({data: false, fetching: false})
      })
  })
  const previousInputs = useRef()
  useEffect(() => {
    previousInputs.current = [addr, cityorzip]
  })

  return children(state)
}

export default Query
