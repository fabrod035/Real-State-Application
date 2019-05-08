import React, {useReducer, useState, useEffect} from 'react'
import ChartView from './ChartView'
import {currencyToNumber2, currencyToNumber3,avg} from '../../utils'
function useSetState(initialState) {
  const [state, setState] = useReducer(
    (state, newState) => [...state, ...newState],
    initialState,
  )
  return [state, setState]
}

export default function Chart({data}) {
  const [convertedData, setConvertedData] = useSetState([])
  useEffect(() => {
    let {zillow, eppraisal, pennymac, chase, attom, realtor} = data
    let z = typeof zillow === 'number' ? zillow : currencyToNumber2(zillow)
    let e =
      typeof eppraisal === 'number' ? eppraisal : currencyToNumber2(eppraisal)
    let p =
      typeof pennymac === 'number' ? pennymac : currencyToNumber2(pennymac)
    let c = typeof chase === 'number' ? chase : currencyToNumber2(chase)
    let a = typeof attom === 'number' ? attom : currencyToNumber2(attom)
    let r = typeof realtor === 'number' ? realtor : currencyToNumber3(realtor)
    let hybridestate = avg(z,e,p,c,a,r);
    //console.log(hybridestate);
    setConvertedData([
      {estimator: 1, value: z},
      {estimator: 2, value: c},
      {estimator: 3, value: e},
      {estimator: 4, value: p},
      {estimator: 5, value: a},
      {estimator: 6, value: r},
      {estimator:7, value:hybridestate}
    ])
    //console.log(z, e, p, c)
  }, [])
  return <ChartView data={convertedData} />
}
{
  /*<ChartView data={data}/>*/
}
