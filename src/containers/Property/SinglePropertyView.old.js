import React, {useState, useEffect} from 'react'
import HyBridEstate from './HybridEstate'
import {parse} from 'json2csv'
import {saveAs} from 'file-saver'
import PropertyTabs from './PropertyTabs'

function normalizeProperty(property) {
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
    ? '$' + property.zestimate[0].amount[0]._
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
function divide(value, area) {
  return String(
    Math.floor(Number(value.replace(/[^0-9\.-]+/g, '')) / Number(area)),
  )
}
export default class SinglePropertyView extends React.Component {
  //const {[eppraisal.data]:eppraisal} = property;
  //const zillow = property.zillow;
  //property.eppraisal
  downloadCSV = myData => {
    let opts = {flatten: true, defaultValue: 'N/A', excelStrings: true}
    try {
      const csv = parse(myData, opts)
      const blob = new Blob([csv], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
      })
      //console.log(csv);
      saveAs(blob, 'spreadsheet.xlsx')
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    let {property, address1, address2} = this.props
    let zillow = normalizeProperty(property.zillow.resl[0])
    let pennymac = property.pennymac
    let pennymacSubject = pennymac ? pennymac.SubjectProperty.Subject : ''
    //console.log('Zillllllowwww', zillow);
    //console.log('Zilllow',property.zillow.resl[0]);
    return (
      <div>
        <div className="row">
          <div className="col-md-2 col-lg-2 offset-md-10 offset-lg-10">
            <button
              className="btn btn-success"
              onClick={() =>
                this.downloadCSV({
                  zillow,
                  eppraisal: property.eppraisal.data.eppraisal,
                  pennymac,
                })
              }
            >
              Download CSV
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          {pennymac ? (
            <div className="col">
              <h3 className="bg-success text-white p-2">PennyMac</h3>
              <h4>${pennymac.Valuation.Estimate}</h4>
              <p>
                Price Per Square Foot:{' '}
                <b>
                  $
                  {divide(
                    pennymac.Valuation.Estimate,
                    pennymac.SubjectProperty.Subject.LivingArea,
                  )}
                  /sqft
                </b>
              </p>
              <p>
                Bedrooms: <b>{pennymacSubject.Beds}</b>
              </p>
              <p>
                Baths: <b>{pennymacSubject.Baths}</b>
              </p>
              <p>
                Living Area:<b> {pennymacSubject.LivingArea} sq. ft.</b>
              </p>
              <p>
                Lot Size: <b>{pennymacSubject.LotSize} sq. ft.</b>
              </p>
              <p>
                Type: <b>{pennymacSubject.PropertyType}</b>
              </p>
              <p>
                County: <b>{pennymacSubject.County}</b>
              </p>
              <p>
                Year Built: <b>{pennymacSubject.YearBuilt}</b>
              </p>
              <p>
                Total Rooms: <b>{pennymacSubject.TotalRooms}</b>
              </p>
              <p>
                Floors: <b>{pennymacSubject.Floors}</b>
              </p>
            </div>
          ) : (
            <p className="mt-3 mb-3">No data from pennymac.</p>
          )}
          <div className="col">
            <h3 className="bg-success text-white p-2">Zillow</h3>
            <h4>{zillow.zestimate}</h4>
            <p>
              <b>Valuation Range: </b>
              {zillow.valuationRange}
            </p>
          </div>
          <div className="col">
            <h3 className="bg-success text-white p-2">Eppraisal</h3>
            <h4>{property.eppraisal.data.eppraisal.value}</h4>
            <p>
              <b>Valuation Range: </b>
              {property.eppraisal.data.eppraisal.range}
            </p>
          </div>
          <HyBridEstate
            zillow={zillow.zestimate}
            pennymac={pennymac ? pennymac.Valuation.Estimate : null}
            eppraisal={property.eppraisal.data.eppraisal.value}
          >
            {estimate => {
              return (
                <div className="col">
                  <h3 className="bg-success p-2 text-white">HybridEstate</h3>
                  <h4 className="text-center mb-4">${Math.floor(estimate)}</h4>
                </div>
              )
            }}
          </HyBridEstate>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <PropertyTabs address1={address1} address2={address2} />
          </div>
        </div>
      </div>
    )
  }
}
