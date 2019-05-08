import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'
import {toast, ToastContainer} from 'react-toastify'
import ReactGA from 'react-ga'
import {Jumbotron} from 'reactstrap'
import Admin from './containers/Admin';
import Header from './components/Header'
import Footer from './components/Footer'
import About from './containers/About'
import Help from './containers/Help'
import Updates from './containers/Updates'
import Home from './containers/Home'
import UploadView from './containers/UploadView'
import Upload from './containers/Upload'
import CsvView from './containers/CsvView'
import QuickView from './containers/QuickView'
import Property from './containers/Property'

import {authUrl} from './config';
import axios from 'axios';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Jumbotron>
          <h1>Something went wrong. Please refresh the page.</h1>
        </Jumbotron>
      )
    }

    return this.props.children
  }
}

ReactGA.initialize('UA-132349722-2')

class LoginForm extends React.Component {
  state = {
    key:''
  }
  login = (e) => {
    e.preventDefault()
    axios.get(authUrl,{params:{key:this.state.key}}).then(resp => {
      this.props.setUser(resp.data);
    })
  }
  render(){
    return(
      <div className="row">
            <div className="col-md-4 offset-md-4 justify-content-center">
            <h3>Mioym Equities Login</h3>
      <form className="form-inline">
        <input className="form-control" type="text" onChange={(e) => this.setState({key:e.target.value})}/>
        <button className="btn btn-primary" onClick={this.login}>Login</button>
      </form>
      </div>
      </div>
    )
  }
}

class MainApp extends React.Component {
  componentDidMount(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.setState({user})
    }
  }
  state = {
    user:{
      isAuthenticated:false,
      role:''
    }
  }
  setUser = (user) => {
    if(!user.role){
      toast.error('Wrong secret key',{
        position:toast.POSITION.TOP_RIGHT
      })
    }else{
      localStorage.setItem('user',JSON.stringify(user));
    }
    this.setState({user})
  }
  render(){
    let {user} = this.state;
    return (
      user.isAuthenticated ? <Root auth={this.state.user}/> : <div className="jumbotron">
      <ToastContainer/><LoginForm setUser={this.setUser}/>
      </div>
    )
  }
}




const routes = [
  {path: '/', name: 'Home', Component: Home},
  {path: '/about', name: 'About', Component: About},
  {path: '/help', name: 'Help', Component: Help},
  {path: '/updates', name: 'Updates', Component: Updates},
  {path: '/view-csv', name: 'CsvView', Component: CsvView},
  {path: '/quick-view', name: 'Quick View', Component: QuickView},
  {path: '/property', name: 'Property', Component: Property},
  {path: '/upload', name: 'Upload', Component: Upload},
  {path: '/upload/:id', name: 'UploadView', Component: UploadView},
]

class Root extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header auth={this.props.auth}/>
          <div style={{minHeight: '100vh'}}>
            {routes.map(({path, Component}) => (
              <Route key={path} exact path={path}>
                {props => (
                  <CSSTransition
                    in={props.match != null}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page">
                      <ErrorBoundary>
                        <Component {...props} />
                      </ErrorBoundary>
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
            <Route exact path='/admin'>
              {props => (
              <Admin auth={this.props.auth} {...props}/>
              )}
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default MainApp;

{
  /*<Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/updates" component={Updates} />
          <Route exact path="/property" component={Property} />*/
}
