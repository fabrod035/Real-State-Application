import React from 'react'
import CsvViewer from 'react-csv-viewer'
import {Jumbotron, Container} from 'reactstrap'

export default function() {
  return (
    <Jumbotron align="center">
      <Container>
        <h1 className="display-4 text-center mb-3">Select CSV File</h1>
        <CsvViewer />
      </Container>
      <Container className="w-50 mt-3">
        <p className="lead">
          This is a simple but powerful <attr>CSV</attr> file viewer.
        </p>
        <hr className="my-2" />
        <p>It can be used to view large csv files too.</p>
      </Container>
    </Jumbotron>
  )
}
