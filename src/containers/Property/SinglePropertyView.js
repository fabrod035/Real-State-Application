import React from 'react'
import HyBridEstate from './HybridEstate'
import {parse} from 'json2csv'
import {saveAs} from 'file-saver'

import Zillow from './Zillow'
import PennyMac from './PennyMac'
import Eppraisal from './Eppraisal'
import AttomData from './AttomData'
import Chase from './Chase'
import Realtor from './Realtor'

import Chart from '../../components/Chart'

import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap'
import {ListGroup, ListGroupItem} from 'reactstrap'
import classnames from 'classnames'
import {normalizeZillowProperty, currencyFormat} from '../../utils'

export default class SinglePropertyView extends React.Component {
  //const {[eppraisal.data]:eppraisal} = property;
  //const zillow = property.zillow;
  //property.eppraisal

  state = {
    activeTab: '1',
    hybridestate: null,
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  downloadCSV = myData => {
    //let opts = {flatten: true, defaultValue: 'N/A', excelStrings: true}
    try {
      const csv = parse(myData)
      const blob = new Blob([csv], {
        // type:
        //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
        type: 'text/csv;charset=utf-8;',
      })
      //console.log(csv);
      const name = this.props.filename
      saveAs(blob, name + '_mioymequities.csv')
    } catch (err) {
      console.error(err)
    }
  }
  setHybridEstateData = data => {
    this.setState({hybridestate: data})
  }
  render() {
    let {property} = this.props
    let {zillow: z} = property
    let {chase} = property
    let {realtor} = property
    if (z.resl.length === 0) {
      return <h2>No data</h2>
    }
    // debugger;
    let zillow =
      property.zillow.resl.length > 1
        ? property.zillow.resl.map(normalizeZillowProperty)
        : normalizeZillowProperty(property.zillow.resl[0])
    let attom = property.attom //.data ? property.attom.data[0] : property.attom
    let pennymac = property.pennymac
    let pennymacSubject = pennymac ? pennymac.SubjectProperty.Subject : ''
    //console.log('Zillllllowwww', zillow);
    //console.log('Zilllow',property.zillow.resl[0]);
    //console.log(zillow);
    return (
      <div>
        <div className="row">
          <div className="col-md-2 col-lg-2 offset-md-10 offset-lg-10">
            <button
              className="btn btn-success"
              onClick={() =>
                this.downloadCSV({
                  Zillow:
                    property.zillow.resl.length > 1
                      ? property.zillow.resl.map(normalizeZillowProperty)[0]
                          .zestimate
                      : normalizeZillowProperty(property.zillow.resl[0])
                          .zestimate,
                  Eppraisal: property.eppraisal.data.eppraisal.value
                    ? property.eppraisal.data.eppraisal.value
                    : null,
                  Realtor: realtor.value ? realtor.value : 0,
                  PennymacUSA: pennymac
                    ? '$' + pennymac.Valuation.Estimate
                    : null,
                  
                  Chase: chase
                    ? chase.msg
                      ? 'N/A'
                      : '$' + currencyFormat(chase.price)
                    : 'N/A',
                  AttomData: attom.data.amount
                    ? '$' + currencyFormat(attom.data.amount.value)
                    : 0,
                    'Avg. Market Value': this.state.hybridestate.estimate,
                  'Avg. Value Off (40%)': this.state.hybridestate.hs_max,
                  'Rehab': this.state.hybridestate.hs_min,
                })
              }
            >
              Download CSV
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 col-lg-6">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '1'})}
                  onClick={() => {
                    this.toggle('1')
                  }}
                >
                  Zillow
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '2'})}
                  onClick={() => {
                    this.toggle('2')
                  }}
                >
                  Chase
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '3'})}
                  onClick={() => {
                    this.toggle('3')
                  }}
                >
                  Eppraisal
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '4'})}
                  onClick={() => {
                    this.toggle('4')
                  }}
                >
                  PennyMac
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '5'})}
                  onClick={() => {
                    this.toggle('5')
                  }}
                >
                  AttomData
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '6'})}
                  onClick={() => {
                    this.toggle('6')
                  }}
                >
                  Mioym Equities
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({active: this.state.activeTab === '7'})}
                  onClick={() => {
                    this.toggle('7')
                  }}
                >
                  Realtor
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Zillow zillow={zillow} />
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Chase chase={chase} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Eppraisal property={property} />
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    {pennymac ? (
                      <PennyMac
                        pennymac={pennymac}
                        pennymacSubject={pennymacSubject}
                      />
                    ) : (
                      <p className="mt-3 mb-3">No data from pennymac.</p>
                    )}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="5">
                <Row>
                  <Col sm="12">
                    <AttomData attomData={attom} />
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId="6">
                <Row>
                  <Col sm="12">
                    <HyBridEstate
                      zillow={
                        zillow.length > 1
                          ? zillow[0].zestimate
                          : zillow.zestimate
                      }
                      pennymac={pennymac ? pennymac.Valuation.Estimate : null}
                      eppraisal={property.eppraisal.data.eppraisal.value}
                      chase={chase ? (chase.msg ? 0 : chase.price) : 0}
                      attom={attom.data.amount ? attom.data.amount.value : 0}
                      realtor={realtor.value ? realtor.value : 0}
                      setHybridEstateData={this.setHybridEstateData}
                    >
                      {({estimate, maxOffer, minOffer}) => {
                        return (
                          <Row className="shadow mb-3">
                            <Col className="bg-grey__head">
                              <ListGroup flush>
                                <ListGroupItem>
                                  <h3 className="mt-3">Average Market Value: {estimate}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                  40% off: {maxOffer}
                                </ListGroupItem>
                                <ListGroupItem>
                                  Rehab: {minOffer}
                                </ListGroupItem>
                              </ListGroup>
                            </Col>
                          </Row>
                        )
                      }}
                    </HyBridEstate>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="7">
                <Row>
                  <Col sm="12">
                    <Realtor realtor={realtor} />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
          <div className="col-md-8 col-sm-12 col-lg-6">
            <div className="ml-2">
              <Chart
                data={{
                  zillow:
                    property.zillow.resl.length > 1
                      ? property.zillow.resl.map(normalizeZillowProperty)[0]
                          .zestimate
                      : normalizeZillowProperty(property.zillow.resl[0])
                          .zestimate,
                  eppraisal: property.eppraisal.data.eppraisal.value
                    ? property.eppraisal.data.eppraisal.value
                    : 0,
                  pennymac: pennymac ? pennymac.Valuation.Estimate : 0,
                  chase: chase ? (chase.msg ? 0 : chase.price) : 0,
                  realtor: realtor.value ? realtor.value : 0,
                  attom: attom.data.amount
                    ? Number(attom.data.amount.value)
                    : 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
