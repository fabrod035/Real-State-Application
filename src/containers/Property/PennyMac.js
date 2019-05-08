import React from 'react'
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap'
import {JsonTable} from 'react-json-to-html'
import MoreData from './MoreData'

function divide(value, area) {
  return value && area
    ? String(
        Math.floor(Number(value.replace(/[^0-9\.-]+/g, '')) / Number(area)),
      )
    : 0
}

export default function PennyMac({pennymac, pennymacSubject}) {
  return (
    <div>
      <Row className="shadow mb-3">
        <Col lg="6" md="6" className="bg-grey__head">
          <ListGroup flush>
            <ListGroupItem>
              <h3 className="mt-1 mb-1">
                Estimate: ${pennymac.Valuation.Estimate}
              </h3>
            </ListGroupItem>
            <ListGroupItem>
              Price Per Square Foot:{' '}
              <b>
                $
                {divide(
                  pennymac.Valuation.Estimate,
                  pennymac.SubjectProperty.Subject.LivingArea,
                )}
                /sqft
              </b>
            </ListGroupItem>
            <ListGroupItem>
              Living Area:<b> {pennymacSubject.LivingArea} sq. ft.</b>
            </ListGroupItem>
            <ListGroupItem>
              Year Built: <b>{pennymacSubject.YearBuilt}</b>
            </ListGroupItem>
            <ListGroupItem>
              Total Rooms: <b>{pennymacSubject.TotalRooms}</b>
            </ListGroupItem>
            <ListGroupItem>
              Floors: <b>{pennymacSubject.Floors}</b>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col lg="6" md="6" className="bg-grey__head">
          <ListGroup flush>
            <ListGroupItem>
              Bedrooms: <b>{pennymacSubject.Beds}</b>
            </ListGroupItem>
            <ListGroupItem>
              Baths: <b>{pennymacSubject.Baths}</b>
            </ListGroupItem>
            <ListGroupItem>
              Lot Size: <b>{pennymacSubject.LotSize} sq. ft.</b>
            </ListGroupItem>
            <ListGroupItem>
              Type: <b>{pennymacSubject.PropertyType}</b>
            </ListGroupItem>
            <ListGroupItem>
              County: <b>{pennymacSubject.County}</b>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
      <MoreData>
        <Row>
          <Col sm="12">
            <JsonTable json={pennymac} />
          </Col>
        </Row>
      </MoreData>
    </div>
  )
}
