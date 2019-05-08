import React, {useEffect, useState} from 'react'
import {
  currencyToNumber,
  currencyToNumber3,
  currencyFormat,
  avg,
  calculateOffer,
} from '../../utils'
//import useDeepCompareEffect from 'use-deep-compare-effect'

export default function HyBridEstate({
  zillow,
  eppraisal,
  pennymac,
  chase,
  attom,
  realtor,
  children,
  setHybridEstateData,
}) {
  const [estimate, setEstimate] = useState('')
  const [maxOffer, setMaxOffer] = useState('')
  const [minOffer, setMinOffer] = useState('')
  useEffect(() => {
    let z = currencyToNumber(zillow)
    let e = currencyToNumber(eppraisal)
    let p = currencyToNumber(pennymac)
    let r = currencyToNumber3(realtor)
    let c = Number(chase)
    let a = Number(attom)
    // console.log('z',z)
    // console.log('e',e)
    // console.log('p',p);
    // console.log('c',c);
    let est = avg(z, e, p, a, c, r)
    let maxOffer = calculateOffer(est, 40)
    let minOffer = calculateOffer(est, 25)
    //console.log(est, maxOffer, minOffer)
    setEstimate('$' + currencyFormat(est))
    setMaxOffer(maxOffer)
    setMinOffer(minOffer)
    setHybridEstateData({
      estimate: '$' + currencyFormat(est),
      hs_min: minOffer,
      hs_max: maxOffer,
    })
  }, [estimate, maxOffer, minOffer])
  return children({estimate, maxOffer, minOffer})
}
