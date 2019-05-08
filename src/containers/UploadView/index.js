import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import axios from 'axios'
import Loader from '../../components/Loader'
import {ToastContainer, toast} from 'react-toastify'

import {upload_url_firebase} from '../../config'
import UploadsTable from './UploadsTable'
//import UPTables from './UPTables';

export default class UploadView extends React.Component {
  //const [name, setName] = useState('')
  //const [data, setData] = useState([])
  state = {
    name: '',
    data: [],
  }
  save = data => {
    this.setState({data})
  }
  componentDidMount() {
    axios
      .get(upload_url_firebase + '/' + this.props.match.params.id)
      .then(resp => {
        this.setState({name: resp.data.data.file}) // name
        //this.setState({data:resp.data.data.data}); // data
        //setData(resp.data.data.data); // actual json
        const array = resp.data.data.data.map(prop => {
          return {
            //   id:,
            complete_address: `${prop.ADDRESS} ${prop.CITY} ${
              prop.STATE
            } ${prop.ZIP}`,
            zillow: '',
            pennymac: '',
            eppraisal: '',
            attom: '',
            realtor: '',
            hybridestate: '',
            chase: '',
            address: prop.ADDRESS,
            city: prop.CITY,
            state: prop.STATE,
            zip: prop.ZIP,
          }
        })
        this.setState({data: array})
        //console.log(array);
        //debugger;
        toast.success('Successfully Loaded!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
      .catch(e => {
        setTimeout(() => window.location.reload(), 10000)
        toast.success('Please wait!', {
          position: toast.POSITION.TOP_RIGHT,
        })
      })
  }
  render() {
    if (this.state.data.length > 0) {
      //console.log('In index ', this.state.data)
      return (
        <Container>
          <ToastContainer />
          <Row>
            <Col>
              <h1 className="mt-4">File: {this.state.name}</h1>
              <UploadsTable initProperties={this.state.data} />
            </Col>
          </Row>
        </Container>
      )
    }
    return <Loader />
  }
}
