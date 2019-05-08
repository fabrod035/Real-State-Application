import React from 'react'
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap'

export default function Realtor({realtor}) {
  //console.log(attomData);
  if (Number(realtor.value) === 0) {
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
        {realtor.value ? (
          <ListGroup flush>
            <ListGroupItem>
              <h3 className="mt-1 mb-1">Estimate: {realtor.value}</h3>
            </ListGroupItem>
          </ListGroup>
        ) : (
          'something went wrong'
        )}
      </Col>
    </Row>
  )
}
