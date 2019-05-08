import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import './Root.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.unregister()
