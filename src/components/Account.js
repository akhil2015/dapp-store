import React from "react"
import "../App.css"
import Web3 from 'web3';
import {AccountTable} from './_AccountTable'
import { GenerateDialog } from './GenerateDialog'
const web3 = new Web3()
class Account extends React.Component {
    state = {
        keys:[],

    }
    componentWillMount = () =>{
        localStorage.getItem('keys') && this.setState({
            keys:JSON.parse(localStorage.getItem('keys'))
        })
    }
    componentWillUpdate = (nextProps,nextState) =>{
        localStorage.setItem('keys',JSON.stringify(nextState.keys))
    }
    generateKey = () =>{
        let account = web3.eth.accounts.create(web3.utils.randomHex(32));
        const { address,privateKey } = account;
        const key = {address,privateKey}
        let keys = this.state.keys
        keys.push(key)
        this.setState({newKey:key,keys})
    }
    saveKey = (newKey) =>{
        let keys = this.state.keys
        keys.push(newKey)
        console.log(newKey)
        this.setState({keys})
    }
    handleKeyUpdate = (keys) =>{
        this.setState({keys})
    }
    render(){
        // const addressJSX = this.state.keys.map((account,key) =>
        // <li key={account.address}>{account.address}</li>
        // )
        return (
        <div className="App">
            <header className="App-header">
                <p className="acc-head">ACCOUNTS</p>
                <GenerateDialog
                    saveKey={this.saveKey}
                />
                <AccountTable
                    keys={this.state.keys}
                    handleUpdate={this.handleKeyUpdate}
                />
            </header>
          </div>
        )
    }
}

export default Account