import React from 'react'
import {Row, Col} from 'reactstrap'
import {ListGroup, ListGroupItem} from 'reactstrap'

export default function Eppraisal({property}) {
  return (
    <Row className="shadow mb-3">
      <Col sm="12" className="bg-grey__head">
        <ListGroup flush>
          <ListGroupItem>
            <h3 className="mt-1 mb-1">
              Estimate: {property.eppraisal.data.eppraisal.value}
            </h3>
          </ListGroupItem>
          <ListGroupItem>
            Valuation Range: {property.eppraisal.data.eppraisal.range}
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
  )
}
