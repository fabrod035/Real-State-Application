import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import logo from './logo.png'

//color = #cc1db9 (pinkish)

function Header({history,location,auth}) {
  //
  //console.log('Props',props)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-main shadow fixed-top">
      <Link className="navbar-brand" to="/">
        {/*<img src={logo} className="img-fluid" width="300px"/>*/}
        <h2 onClick={() => {
        history.push('/') 
        if(location.pathname === '/'){
          window.location.reload()
        }}}><span style={{marginRight:'0.2em'}}>MIOYM</span> EQUITIES</h2>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        
        
          <li className="nav-item active">
            <a className="nav-link" onClick={() => {
        history.push('/') 
        if(location.pathname === '/'){
          window.location.reload()
        }}} style={{cursor:'pointer'}}>
              HOME <span className="sr-only">(current)</span>
            </a>
          </li>
          {/*<li className="nav-item active">
            <Link className="nav-link" to="/view-csv">
              View CSV File
            </Link>
          </li>*/}
          {/*<li className="nav-item active">
            <Link className="nav-link" to="/quick-view">
              Quick View
            </Link>
          </li>*/}
          <li className="nav-item">
            <Link className="nav-link" to="/upload">
              CSVs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              PROCESS
            </Link>
          </li>
          
          {JSON.parse(localStorage.getItem('user')).role === 'admin' ? <li className="nav-item">
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
          </li>:''}
          <li>
            <a href="#" className="nav-link" onClick={e => {localStorage.removeItem('user') 
            window.location.reload()}}>Logout</a>
          </li>
          {/*<li className="nav-item">
            <Link className="nav-link" to="/updates">
              Updates
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/help">
              Need Help?
            </Link>
          </li>*/}
          {/*<li className="nav-item">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>*/}
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header);