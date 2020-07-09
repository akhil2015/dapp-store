import React from "react"
import "../App.css"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Web3 from 'web3';
import { Transaction } from 'ethereumjs-tx'
import { SimpleTable } from './_Table'
import { TransferDialog } from "./TransferDialog";
import { abi } from './contract'
class Wallet extends React.Component {
    state = {
      coinbase:"",
      keys:["0xbB353B7D29EdF3ef0d930fF58b58ed450097f977","0x07d0e9b198Ea4a8fbb6232c9d57E09B953De2919","0xe2E9EF6179448Dd7A94F72165350edc5e58E90E7"],
      token:"ETH",
      coins:["ETH","GOLD","BNB"],
      balance:'0.00',
      privateKey:'',
      tokenAddress:''
    }
    componentDidMount = () =>{
      this.getBalance().then(balance=>{
        this.setState({
          balance
        })
      })
      const keys = JSON.parse(localStorage.getItem('keys'))
      let privateKey;
      keys.forEach((key)=>{
        if(key.address===this.state.coinbase)
          return privateKey = key.privateKey
      })
      this.setState({
        privateKey
      })
    }
    componentWillMount = () =>{
      const ke = JSON.parse(localStorage.getItem('keys'))
      let keys = []
      ke.forEach(element => {
        keys.push(element.address)
      });
      const tokens = JSON.parse(localStorage.getItem('tokens'))
      let coins = ['ETH'];
      tokens.forEach(element=>{
        coins.push(element.tokenName)
      })
      this.setState({
          coins,
          keys,
          coinbase:keys[0]
      })
    }
    componentDidUpdate = () => {
      this.getBalance().then(balance=>{
        this.setState({
          balance
        })
      })
    }
    getBalance = async () =>{
      const web3 = new Web3('https://rinkeby.infura.io/v3/249ade10d1654c31a077253a72842946')
      if(this.state.token === 'ETH'){
        let balance = await web3.eth.getBalance(this.state.coinbase)
        balance = web3.utils.fromWei(balance, 'ether')
        let floatBal = parseFloat(balance).toFixed(2)
        return floatBal.toString()
      }
      else{
        console.log( this.state.tokenAddress)
        let contract = new web3.eth.Contract(abi, this.state.tokenAddress);
        let balance = await contract.methods.balanceOf(this.state.coinbase).call({from: this.state.coinbase})
        return balance
      }
    } 
    _onTokenSelect = async (option) => {
      await this.setState({token: option.value})
      const tokens = JSON.parse(localStorage.getItem('tokens'))
      let tokenAddress;
      tokens.forEach(element=>{
        if(element.tokenName==this.state.token)
          return tokenAddress = element.tokenAddress
      })
      console.log("this is the tokenadress ", tokenAddress,tokens)
      await this.setState({
        tokenAddress
      }) 
      this.getBalance().then(balance=>{
        this.setState({
          balance
        })
      })
      
    }
    _onCoinbaseSelect = (option) =>{
      this.setState({coinbase:option.value})
      const keys = JSON.parse(localStorage.getItem('keys'))
      const coinbase = this.state.coinbase
      let privateKey;
      keys.forEach((key)=>{
        if(key.address===coinbase)
          return privateKey = key.privateKey
      })
      this.setState({
        privateKey
      })
    }
    transfer = async (amount,receiver) => {
      console.log("sending ",amount, " to ",receiver)
      const web3 = new Web3('https://rinkeby.infura.io/v3/249ade10d1654c31a077253a72842946')
      const nonce = await web3.eth.getTransactionCount(this.state.coinbase,"pending")
      const txParams = {
        nonce: nonce,
        gasPrice: '0x3b9aca00',// web3.utils.numberToHex(1000),
        gasLimit: web3.utils.numberToHex(21000),
        to: receiver,
        value: web3.utils.numberToHex(web3.utils.toWei(amount.toString(), 'ether')),
        chainId: 4 //456719
      }
      console.log(txParams,this.state.privateKey)
      const privKey = new Buffer(this.state.privateKey.slice(2), 'hex');
      let tx = new Transaction(txParams,{chain:'rinkeby'});
      tx.sign(privKey);
      const serializedTx = tx.serialize();
      console.log("got this",'0x' + serializedTx.toString('hex'))
      try{
        const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        console.log(receipt)
      }catch(err){
        console.log(err)
      }
      
    }
    render(){
        return (
        <div className="App">
            <header className="App-header">
              <div className="top-left-corner">
                <Dropdown options={this.state.coins} value={this.state.token} onChange={this._onTokenSelect}/>
              </div>
              <div className="top-right-corner">
                <Dropdown options={this.state.keys} value={this.state.coinbase} onChange={this._onCoinbaseSelect}/>
              </div>
              <h2><span className="balance">{this.state.balance} </span>{this.state.token}</h2>
              <TransferDialog
                transfer={this.transfer}
              />
              <SimpleTable/>
            </header>
          </div>
        )
    }
}

export default Wallet