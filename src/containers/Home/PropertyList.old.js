import React, {useState, useEffect} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import {currencyFormat, prettyAddress, isNa, prettyDetails} from '../../utils'
import ToolkitProvider, {
  CSVExport,
  Search,
} from 'react-bootstrap-table2-toolkit'

const {SearchBar} = Search
const {ExportCSVButton} = CSVExport

//const products = [];
const columns = [
  {
    dataField: 'id',
    text: 'Property ID',
  },
  {
    dataField: 'address',
    text: 'Property Address',
  },
  {
    dataField: 'amount',
    text: 'Zestimate®',
  },
  {
    dataField: 'low',
    text: 'Valuation Range (low)',
  },
  {
    dataField: 'high',
    text: 'Valuation Range (high)',
  },
  {
    dataField: 'latest',
    text: 'is updated?',
  },
]

// {
//   dataField: 'max_offer',
//   text: 'Max Offer (40%)',
// },
// {
//   dataField: 'min_offer',
//   text: 'Min Offer (25%)',
// }

export default function PropertyList({
  results,
  address_final,
  cityorzip,
  checks,
  ...props
}) {
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      //console.log('E', e)
      //console.log('ROW', row)
      //console.log('rowIndex', rowIndex)
      //street city state zip

      //debugger;
      const arr = row.details.split(',')

      //console.log(arr)
      console.log(arr)
      let zip = arr.pop()
      let state = arr.pop()
      let city = arr.pop()
      let cityandstate = city + ', ' + state
      console.log(address_final)
      console.log(arr)
      props.history.push(
        `/property?addr=${encodeURIComponent(
          arr.join(' '),
        )}&pin=${zip}&cityandstate=${cityandstate}&zpid=${
          row.id
        }&zillow=${arr.join(' ')}`,
      )
    },
  }
  const [properties, setProperties] = useState([])
  useEffect(() => {
    const properties = results.map(result => {
      let {address, zpid} = result
      if (checks.length !== 0) {
        return {
          id: zpid[0],
          details: prettyDetails(address[0]),
          address: prettyAddress(address[0]),
          details: prettyDetails(address[0]),
          amount: isNa(currencyFormat(result.zestimate[0]['amount'][0]._)),
          low: isNa(
            currencyFormat(result.zestimate[0]['valuationRange'][0].low[0]._),
          ),
          high: isNa(
            currencyFormat(result.zestimate[0]['valuationRange'][0].high[0]._),
          ),
          latest:
            checks.filter(
              val =>
                String(val.code) === '0' &&
                String(val.zpid) === String(zpid[0]),
            ).length > 0
              ? 'True'
              : 'False',
        }
      }

      return {
        id: zpid[0],
        details: prettyDetails(address[0]),
        address: prettyAddress(address[0]),
        details: prettyDetails(address[0]),
        amount: isNa(currencyFormat(result.zestimate[0]['amount'][0]._)),
        low: isNa(
          currencyFormat(result.zestimate[0]['valuationRange'][0].low[0]._),
        ),
        high: isNa(
          currencyFormat(result.zestimate[0]['valuationRange'][0].high[0]._),
        ),
        latest: 'N/A',
      }
      // max_offer: calculateOffer(result.zestimate[0]['amount'][0]._, 40),
      // min_offer: calculateOffer(result.zestimate[0]['amount'][0]._, 25),
    })
    setProperties(properties)
    //console.log(properties);
    //console.log(results);
  }, [checks])
  //console.log(results);
  return (
    <ToolkitProvider
      keyField="id"
      data={properties}
      columns={columns}
      exportCSV
      search
    >
      {props => (
        <div className="mt-3">
          <div className="row">
            <div className="col-12">
              <h3>Search results for: {address_final + ', ' + cityorzip}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <ExportCSVButton {...props.csvProps} className="btn btn-primary">
                Export CSV!!
              </ExportCSVButton>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-12">
                  <SearchBar {...props.searchProps} />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <BootstrapTable
            {...props.baseProps}
            pagination={paginationFactory()}
            rowEvents={rowEvents}
            rowClasses="property-result-row"
          />
        </div>
      )}
    </ToolkitProvider>
  )
}
