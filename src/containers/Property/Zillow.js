import React from 'react'
import {Row, Col} from 'reactstrap'
import {JsonTable} from 'react-json-to-html'
import {ListGroup, ListGroupItem} from 'reactstrap'

import MoreData from './MoreData'

export default function Zillow({zillow: z}) {
  return (
    <div>
      {z.length ? (
        z.map(zillow => {
          return (
            <div>
              <Row className="shadow mb-3 mt-2">
                <Col sm="12" lg="12" md="12" className="bg-grey__head">
                  <ListGroup flush>
                    <ListGroupItem>
                      <h3 className="mt-1 mb-1">
                        Zestimate®: {zillow.zestimate}
                      </h3>
                    </ListGroupItem>
                    {/*<ListGroupItem>
            Valuation Range: {zillow.valuationRange}
          </ListGroupItem>*/}
                  </ListGroup>
                </Col>
              </Row>
              <MoreData>
                <Row>
                  <Col sm="12">
                    <JsonTable json={zillow} />
                  </Col>
                </Row>
              </MoreData>
            </div>
          )
        })
      ) : (
        <div>
          <Row className="shadow mb-3">
            <Col sm="12" lg="12" md="12" className="bg-grey__head">
              <ListGroup flush>
                <ListGroupItem>
                  <h3 className="mt-1 mb-1">Zestimate®: {z.zestimate}</h3>
                </ListGroupItem>
                {/*<ListGroupItem>
            Valuation Range: {zillow.valuationRange}
          </ListGroupItem>*/}
              </ListGroup>
            </Col>
          </Row>
          <MoreData>
            <Row>
              <Col sm="12">
                <JsonTable json={z} />
              </Col>
            </Row>
          </MoreData>
        </div>
      )}
    </div>
  )
}
