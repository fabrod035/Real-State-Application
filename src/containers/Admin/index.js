import React from 'react';
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'
import {keyUrl} from '../../config';

class Admin extends React.Component{
    state = {
        user_key:'',
        admin_key:'',
        keys:[]
    }
    componentDidMount(){
        //console.log('auth admin ',this.props.auth)
        axios.get(keyUrl,{params:{admin_key:this.props.auth.admin_key}}).then(resp => {
            this.setState({keys:Object.keys(resp.data).map(v => ({id:v,data:resp.data[v]}))});
        })
    }
    saveUser = (e) => {
        e.preventDefault()
        axios.get(keyUrl+'/add',{params:{admin_key:this.props.auth.admin_key,user_key:this.state.user_key}}).then(resp => {
            //console.log(resp);
            window.location.reload()
        })
    }
    deleteKey = id => {
        axios.get(keyUrl+'/delete',{params:{admin_key:this.props.auth.admin_key,id}}).then(resp => {
            if(resp.data.removed){
                toast.success('Deleted '+id+' please wait a second.',{
                    position:toast.POSITION.TOP_RIGHT
                })
            }
            setTimeout(() => {
                window.location.reload();
            },1000)
        })
    }
    render(){
        let {keys} = this.state;
        return(
            <div className="jumbotron">
            <ToastContainer/>
            {this.props.auth.role === 'admin' && window.location.pathname === '/admin'? <div>
            <div className="row">
            <div className="col-md-4 offset-md-4 justify-content-center">
            <form class="form-inline">
            <div class="form-group mx-sm-3 mb-2">
            <label for="user_key" class="sr-only">User Key:</label>
                <input class="form-control" id="user_key" type="text" onChange={e => this.setState({user_key:e.target.value})} placeholder="User Key"/><br/>
                </div>
                <div class="form-group mx-sm-3 mb-2">
                <button onClick={this.saveUser} className="btn btn-primary">Add</button>
                </div>
            </form>
            </div>
            </div>
            <div className="row">
            <div className="col-md-4 offset-md-4 justify-content-center">
            <div class="list-group mt-4">
            {keys.length>0 && keys.map(k => {
                return <button type="button" class="list-group-item list-group-item-action" key={k.id} onClick={e => {this.deleteKey(k.id)}} style={{cursor:'pointer'}}>{k.data.key}</button>
            })}
            </div>
            </div>
            </div>
            </div>:''}
            </div>
        )
    }
}

export default Admin