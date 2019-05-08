export function currencyFormat(value) {
  if (!value) {
    return
  }
  return new Intl.NumberFormat().format(value)
}

export function currencyFormat2(value) {
  if (!value) {
    return 0
  }
  return new Intl.NumberFormat().format(value)
}

export function prettyAddress(obj) {
  let {street, zipcode, city, state} = obj
  return street + ' ' + city + ' ' + state + ' ' + zipcode
}
export function prettyMapAddress(obj) {
  let {street, zipcode, city, state} = obj
  return street + ', ' + city + ', ' + state + ' ' + zipcode
}
export function prettyDetails(obj) {
  let {street, zipcode, city, state} = obj
  return street[0] + ',' + city[0] + ',' + state[0] + ',' + zipcode[0]
}

export function isNa(value) {
  if (!value) {
    return 'N/A'
  }
  return '$' + value
}

export function calculateOffer(amount, pv) {
  // amount -> string
  // amount -> undefined
  try {
    const amt = Number(amount)
    const percent_value = Number(pv)
    if (!isNaN(amt)) {
      if (amt < 30000 && percent_value === 25) {
        return 0
      }
      const fourtyPercent = (amt * percent_value) / 100
      return isNa(currencyFormat(fourtyPercent))
    }
  } catch (e) {
    console.log(e)
    return 0
  }
}

export function currencyToNumber(currency) {
  // console.log('Currency: ',currency)
  // console.log('Currency: ',typeof currency)
  if (!currency) {
    return null
  }
  return Number(currency.replace(/[$,]/g, ''))
}

export function currencyToNumber2(currency) {
  if (!currency || currency === 'n/a') {
    return 0
  }
  return Number(currency.replace(/[$,]/g, ''))
}
export function currencyToNumber3(currency) {
  if (!currency || currency === 'n/a') {
    return 0
  }
  return Number(currency.replace(/[a-zA-Z$,]/g, '').trim())
}

// export function getHSEstimate(z, e, p,a,c) {
//   let calc = Math.floor((a && c)? (a+c)/2:(a?a:c))
//   const val = Math.floor(
//     z && e && p
//       ? (z + e + p) / 3
//       : (z && e) || (z && p) || (p && e)
//       ? z && p
//         ? (z + p) / 2
//         : p && e
//         ? (p + e) / 2
//         : z && e
//         ? (z + e) / 2
//         : z
//         ? z
//         : e
//         ? e
//         : p
//         ? p
//         : 0
//       : (z?z:(e?e:(p?p:0))),
//   )
//   if(calc !== 0 && val !== 0){
//     let final = (val+calc)/2;
//     return {currency: isNa(currencyFormat(final)), number: val}
//   }else if(calc === 0){
//     return val;
//   }else {
//     return calc;
//   }
// }
export const avg = (...vals) =>
  vals
    .filter(v => typeof v === 'number' && v !== 0 && !isNaN(v))
    .reduce((acc, val, i, arr) => {
      if (i === arr.length - 1) {
        return (acc + val) / arr.length
      }
      return acc + val
    }, 0)

export function normalizeZillowProperty(property) {
  // debugger;
  const zpid = property.zpid[0]
  const address = {
    street: property.address[0].street[0],
    zipcode: property.address[0].zipcode[0],
    city: property.address[0].city[0],
    state: property.address[0].state[0],
  }
  const yearBuilt = property.yearBuilt ? property.yearBuilt[0] : 'n/a'
  const lotSizeSqFt = property.lotSizeSqFt ? property.lotSizeSqFt[0] : 'n/a'
  const finishedSqFt = property.finishedSqFt ? property.finishedSqFt[0] : 'n/a'
  const bathrooms = property.bathrooms ? property.bathrooms[0] : 'n/a'
  const bedrooms = property.bathrooms ? property.bathrooms[0] : 'n/a'
  const totalRooms = property.totalRooms ? property.totalRooms[0] : 'n/a'
  const lastSoldDate = property.lastSoldDate ? property.lastSoldDate[0] : 'n/a'
  const lastSoldPrice = property.lastSoldPrice
    ? property.lastSoldPrice[0]._
    : 'n/a'
  const zestimate = property.zestimate[0].amount[0]._
    ? '$' + currencyFormat(property.zestimate[0].amount[0]._)
    : 'n/a'
  const valuationRange = property.zestimate[0].valuationRange[0].high[0]._
    ? 'Low: ' +
      property.zestimate[0].valuationRange[0].low[0]._ +
      ' High: ' +
      property.zestimate[0].valuationRange[0].high[0]._
    : 'n/a'
  return {
    zpid,
    address,
    yearBuilt,
    lotSizeSqFt,
    finishedSqFt,
    bathrooms,
    bedrooms,
    totalRooms,
    lastSoldDate,
    lastSoldPrice,
    zestimate,
    valuationRange,
  }
}
