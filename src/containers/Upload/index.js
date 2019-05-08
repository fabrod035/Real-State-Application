import React, {useState, useEffect} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import {Jumbotron, Row, Col} from 'reactstrap'
import axios from 'axios'
import {upload_url_firebase} from '../../config'
import Loader from '../../components/Loader'
import FileUploader from './FileUploader'
import {ToastContainer, toast} from 'react-toastify'
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit'

const {SearchBar} = Search

const columns = [
  {
    dataField: 'file',
    text: 'File Name',
  },
]

export default function Uploads(props) {
  const [uploads, setUploads] = useState([])
  const [loading, setLoading] = useState(false)
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      props.history.push('/upload/' + row.id)
      //setView(data[row.id]);
    },
  }
  useEffect(() => {
    setLoading(true)
    axios
      .get(upload_url_firebase)
      .then(resp => {
        const data = resp.data.data
        
        setLoading(false)
        setUploads(data)
      })
      .catch(e => {
        setTimeout(() => {
          setLoading(false)
          window.location.reload()
        }, 5000)
      })
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <Jumbotron>
      <Row>
        <Col sm="12" md="6" lg="6">
          <h1 className="mb-4">Uploaded CSV files:</h1>
          <p className="mb-4">
            <a href="https://firebasestorage.googleapis.com/v0/b/distribution-crm-3f73d.appspot.com/o/images%2Fupdated_example_file_2.csv?alt=media&token=19668df4-d30d-4dcc-8df1-43a1230207d0">
              Click to download{' '} Example CSV File
            </a>
          </p>
          <ToolkitProvider
            keyField="id"
            data={uploads}
            columns={columns}
            search
          >
            {props => (
              <div className="mt-3">
                <div className="row">
                  <div className="col-12">
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
        </Col>
        <Col sm="12" md="6" lg="6">
          <h1 className="mb-4">Upload CSV/XLSX File</h1>
                    <div
                      className="bg-white p-4 shadow-lg rounded"
                      style={{maxHeight: '75vh'}}
                    >
                      <ToastContainer />
                      <FileUploader />
                    </div>
                  </Col>
      </Row>
    </Jumbotron>
  )
}
