import React from 'react'
import {Toast, ToastBody, ToastHeader, Container, Row, Col} from 'reactstrap'

function SingleResult({result}) {
  return (
    <div className="container" key={result._id}>
      <div className="row">
        <div className="col">
          <div className="p-3 my-2 rounded">
            <Toast>
              <ToastHeader>
                {`${result.Street} ${result.City}, ${result.State} ${
                  result.Zip
                }`}
              </ToastHeader>
              <ToastBody>
                <p>
                  <b>Auction Location:</b> {result['Auction Location']}
                </p>
                <p>
                  <b>Amount:</b> {result['Amount']}
                </p>
                <p>
                  {result['Time']}
                  {' | '}
                  {result['Date']}
                </p>
                <p>
                  <b>Borrower:</b>{' '}
                  {result['Borrower'] ? result['Borrower'] : 'N/A'}
                </p>
              </ToastBody>
            </Toast>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function({results}) {
  return (
    <Container>
      <Row>
        {results.map(result => {
          return (
            <Col sm="12" md="6" lg="6" xl="4">
              <SingleResult result={result} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
