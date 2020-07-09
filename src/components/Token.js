import React from "react"
import "../App.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dropdown from 'react-dropdown';
import {abi,bytecode} from './contract'
import Web3 from 'web3';
import { Transaction } from 'ethereumjs-tx'
class Token extends React.Component {
  state={
    totalSupply:'',
    tokenName:'',
    coinbase:'',
    keys:'',
    privateKey:''
  }
  componentDidMount = () =>{
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
    this.setState({
        keys,
        coinbase:keys[0]
    })
  }
  componentWillUpdate = () =>{

  }
  _onCoinbaseSelect = (option) =>{
    const keys = JSON.parse(localStorage.getItem('keys'))
    this.setState({coinbase:option.value})
    let privateKey;
    keys.forEach((key)=>{
      if(key.address===this.state.coinbase)
        return privateKey = key.privateKey
    })
    this.setState({
      privateKey
    })
  }
  handleSupplyChange = (e) =>{
    this.setState({totalSupply:e.target.value})
  }
  handleNameChange = (e) =>{
    this.setState({tokenName:e.target.value})
  }
  deployToken = async () =>{
    const web3 = new Web3('https://rinkeby.infura.io/v3/249ade10d1654c31a077253a72842946')//TODO fetch URL from db and use that value
    console.log(abi)
    var contract = new web3.eth.Contract(abi);
    const hexdata = contract.deploy({
      data: '0x' + bytecode.object,
      arguments:[this.state.totalSupply,this.state.tokenName]
      }).encodeABI()
    const nonce =await web3.eth.getTransactionCount(this.state.coinbase,"pending")
    const gasPrice = 10;
    const gasPriceHex = web3.utils.toHex(gasPrice);
    const gasLimitHex = web3.utils.toHex(6000000);
    let rawTx = {
      nonce: nonce,
      gasPrice:'0x3b9aca00',   //gasPriceHex,
      gasLimit:gasLimitHex,
      data:hexdata,
      from:this.state.coinbase
    }
    const privKey = new Buffer(this.state.privateKey.slice(2),'hex')
    let tx = new Transaction(rawTx,{chain:'rinkeby'})
    tx.sign(privKey)
    const serializedTx = tx.serialize()
    const receipt = await web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'))
    console.log(receipt)
    const { contractAddress } = receipt
    console.log('contract deployed at',contractAddress)
    let tokens = localStorage.getItem('tokens')
    console.log("old Tokens",tokens)
    if(!tokens){
      tokens = []
    }else{
      tokens = JSON.parse(localStorage.getItem('tokens'))
    }
    tokens.push({tokenName:this.state.tokenName,tokenAddress:contractAddress})
    console.log(tokens)
    localStorage.setItem('tokens',JSON.stringify(tokens))
  }
    render(){
        return (
        <div className="App">
            <header className="App-header">
            <div className="top-right-corner">
                <Dropdown options={this.state.keys} value={this.state.coinbase} onChange={this._onCoinbaseSelect}/>
            </div>
            <p className="acc-head">ERC-20 TOKEN</p>
            <TextField
              id="margin-dense"
              label="Token Name"
              style={{ margin: 8 }}
              placeholder=""
              helperText="name of the token"
              margin="normal"
              variant="outlined"
              color="secondary"
              onChange={this.handleNameChange}
            />
            <TextField
              id="margin-dense"
              label="Total Supply"
              style={{ margin: 8 }}
              placeholder=""
              helperText="total max supply of token"
              margin="normal"
              variant="outlined"
              color="secondary"
              onChange={this.handleSupplyChange}
            />
            <TextField
              id="margin-dense"
              label="Decimals"
              style={{ margin: 8 }}
              placeholder=""
              helperText="max decimal places"
              margin="normal"
              variant="outlined"
              color="secondary"
            />
            <Button size="large" variant="outlined" color="secondary" onClick={this.deployToken} disableElevation> DEPLOY TOKEN </Button>
            </header>
          </div>
        )
    }
}

export default Token