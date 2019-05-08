import React, {useState, useEffect} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import {currencyFormat, prettyAddress,prettyMapAddress, isNa, prettyDetails,currencyToNumber3,currencyFormat2} from '../../utils'
import ToolkitProvider, {
  CSVExport,
  Search,
} from 'react-bootstrap-table2-toolkit'

const {SearchBar} = Search
const {ExportCSVButton} = CSVExport

//const products = [];
const columns = [
  {
    dataField: 'address',
    text: 'Property Address',
  },
  {
    dataField: 'listprice',
    text: 'List Price',
  },
  {
    dataField: 'li_twenty',
    text: '20% off List Price',
  },
  {
    dataField: 'avg',
    text: 'Average Market Value',
  },
  {
    dataField: 'fourty',
    text: '40% Off AVM',
  },
  {
    dataField: 'rehab',
    text: 'Rehab',
  },
  {
    dataField:'google_map',
    text:'Google Map',
    events:{
      onClick:(e, column, columnIndex, row, rowIndex) => {
        console.log(e, column, columnIndex, row, rowIndex);
        window.open(row.map,'_blank');
      }
    }
  }
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
  realtor,
  avg,
  ...props
}) {
  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
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
    console.log(realtor)
    const properties = results.map(result => {
      let {address, zpid} = result
      let {latitude,longitude} = address[0];
      if (checks.length !== 0) {
        return {
          id: zpid[0],
          details: prettyDetails(address[0]),
          address: prettyAddress(address[0]),
          details: prettyDetails(address[0]),
          avg:!!avg?'$'+currencyFormat2(avg):'N/A',
          fourty:!!avg?currencyFormat2((avg*40)/100):0,
          rehab:!!avg?currencyFormat2((avg*25)/100):0,
          // map:`https://www.google.com/maps/search/?api=1&query=${latitude[0]},${longitude[0]}`,
          map:`https://www.google.com/maps/place/${encodeURI(prettyMapAddress(address[0]))}`,
          google_map:'Click here',
          listprice:realtor?realtor.value:'N/A',
          li_twenty:realtor?'$'+currencyFormat2((currencyToNumber3(realtor.value)*80)/100):'N/A',
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
        listprice:'N/A',
        li_twenty:'N/A',
        avg:!!avg?'$'+currencyFormat2(avg):'N/A',
        map:`https://www.google.com/maps/place/${encodeURI(prettyMapAddress(address[0]))}`,
        google_map:'Click here',
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
