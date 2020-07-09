import React from "react"
import "../App.css"
import ExchgForm from './ExchgForm'
class Exchange extends React.Component {
    render(){
        return (
        <div className="App">
            <header className="App-header">
            <p className="acc-head">EXCHANGE</p>
              <ExchgForm/>
            </header>
          </div>
        )
    }
}

export default Exchange