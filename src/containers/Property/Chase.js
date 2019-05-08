import React from 'react'
import {Row, Col} from 'reactstrap'
import {ListGroup, ListGroupItem} from 'reactstrap'
import {currencyFormat} from '../../utils'

export default function Chase({chase}) {
  return (
    <Row className="shadow mb-3">
      <Col sm="12" className="bg-grey__head">
        {chase && chase.msg ? (
          <p className="mt-3 mb-3">No data found</p>
        ) : (
          <ListGroup flush>
            <ListGroupItem>
              <h3 className="mt-1 mb-1">
                Estimate: ${currencyFormat(chase.price)}
              </h3>
            </ListGroupItem>
            <ListGroupItem>
              Valuation Range:{' '}
              {'$' +
                currencyFormat(chase.low) +
                ' - ' +
                '$' +
                currencyFormat(chase.high)}
            </ListGroupItem>
          </ListGroup>
        )}
      </Col>
    </Row>
  )
}
