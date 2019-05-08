import React, {useState} from 'react'
import merge from 'lodash.merge'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import {getPropertyDetails} from '../../apis/zillow-api'
import {
  currencyFormat,
  currencyFormat2,
  avg,
  calculateOffer,
  currencyToNumber2,
  currencyToNumber3,
} from '../../utils'

import ToolkitProvider, {
  CSVExport,
  Search,
} from 'react-bootstrap-table2-toolkit'

const {SearchBar} = Search
const {ExportCSVButton} = CSVExport

const columns = [
  {
    dataField: 'complete_address',
    text: 'Property Address',
  },
  {
    dataField: 'zillow',
    text: 'Zillow',
  },
  {
    dataField: 'pennymac',
    text: 'Pennymac USA',
  },
  {
    dataField: 'eppraisal',
    text: 'Eppraisal',
  },
  {
    dataField: 'attom',
    text: 'AttomData',
  },
  {
    dataField: 'chase',
    text: 'Chase',
  },
  {
    dataField: 'hybridestate',
    text: 'Calculations',
  },
]

export default function UploadsTable({initProperties, ...props}) {
  const [latestProperties, setLatestProperties] = useState(initProperties)
  const [loading, setLoading] = useState(false)
  //console.log('Latest properties ', latestProperties)
  const rowEvents = {
    onClick: (e, row, index) => {
      //console.log(row)
      //debugger;
      setLoading(true)
      //console.log('Latest prop before ', latestProperties)
      const hidden_details_array = [
        row.address,
        row.city,
        row.state,
        row.zip,
      ]
      //debugger;
      const payload_object = {
        addr: `${hidden_details_array[0]}`,
        cityorzip: `${hidden_details_array[3]}`,

        pennymacaddr: `${hidden_details_array[0]}, ${
          hidden_details_array[1]
        }, ${hidden_details_array[2]} ${hidden_details_array[3]}`,
        address1: `${hidden_details_array[0]}`,
        address2: ` ${hidden_details_array[1]}, ${hidden_details_array[2]}`,

        zip: `${hidden_details_array[3]}`,
        zillow_ad: `${hidden_details_array[0]}`,
      }
      getPropertyDetails(payload_object).then(resp => {
        const {
          zillow: z,
          chase: c,
          eppraisal: e,
          pennymac: p,
          attom: a,
        } = resp
        //console.log(resp)
        //debugger;
        const ch = c ? Number(c.price) : 0
        const zil = z ? Number(z.resl[0].zestimate[0].amount[0]._) : 0
        const epp = e ? currencyToNumber2(e.data.eppraisal.value) : 0
        const pen = p ? currencyToNumber2(p.Valuation.Estimate) : 0
        const at = a.data.amount ? Number(a.data.amount.value) : 0
        

        const est = avg(ch, zil, epp, pen, at)
        const max40 = calculateOffer(est, 40)
        const min25 = calculateOffer(est, 25)

        const chase = c && ch !== 0 ? '$' + currencyFormat2(ch) : 'n/a'
        const zillow = z ? '$' + currencyFormat(zil) : 'n/a'
        const eppraisal = e ? e.data.eppraisal.value : 'n/a'
        const pennymac = p ? '$' + p.Valuation.Estimate : 'n/a'
        const attom = a.data.amount ? '$' + currencyFormat(at) : 'n/a'
        
        const hybridestate = `AVM: $${currencyFormat(
          est,
        )}, 
        40% off: ${max40}, 
        Rehab: ${min25}`
        //debugger;
        //console.log(index)
        const lp = merge({}, latestProperties[latestProperties.findIndex(v => v.address === row.address)], {
          zillow,
          chase,
          pennymac,
          eppraisal,
          attom,
          hybridestate,
        })
        // const arr = {...{...latestProperties[index]},zillow,chase,eppraisal,pennymac,attom};
        // console.log('Arr',arr);
        // console.log('Merged', merge(...latestProperties,arr));
        // console.log('Latest prop ',latestProperties)

        // console.log('Final merge ',[merge(...latestProperties,arr)]);
        //setLatestProperties([merge(...latestProperties,arr)]);
        const filteredLatestProperties = latestProperties.filter(
          prop => prop.address !== latestProperties[latestProperties.findIndex(v => v.address === row.address)]
          )
        // const filteredLatestProperties = latestProperties.filter(
        //   prop => prop.address.toUpperCase() !== latestProperties[index].address.toUpperCase(),
        // )
        //,
        setLatestProperties([lp,...filteredLatestProperties])
        //setLatestProperties(merge([],latestProperties,lp));
        setLoading(false)
      })
    },
  }
  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <ToolkitProvider
      keyField="id"
      data={latestProperties}
      columns={columns}
      exportCSV
      search
    >
      {props => (
        <div className="mt-3">
          <div className="row">
            <div className="col-12">
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
