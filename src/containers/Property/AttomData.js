import React, {useState, useEffect} from 'react'
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap'
import {JsonTable} from 'react-json-to-html'
import {currencyFormat} from '../../utils'

function parseJSON(json) {
  return JSON.parse(json)
}

export default function AttomData({attomData: attom}) {
  //console.log(attomData);
  if (attom.data.failed) {
    return (
      <Row>
        <Col>
          <p className="mt-3 mb-3">No data found</p>
        </Col>
      </Row>
    )
  }
  return (
    <Row className="h-50">
      <Col sm="12" className="mt-1 mb-1">
        {/*<JsonTable json={attomData} />*/}
        {attom.data ? (
          <ListGroup flush>
            <ListGroupItem>
              <h3 className="mt-1 mb-1">
                Estimate: ${currencyFormat(attom.data.amount.value)}
              </h3>
            </ListGroupItem>
            <ListGroupItem>
              Valuation Range: ${currencyFormat(attom.data.amount.low)} - $
              {currencyFormat(attom.data.amount.high)}
            </ListGroupItem>
          </ListGroup>
        ) : (
          'something went wrong'
        )}
      </Col>
    </Row>
  )
}
