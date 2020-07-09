import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from "./App"
import Account from "./components/Account"
import Token from "./components/Token"
import Exchange from "./components/Exchange"
import Wallet from "./components/Wallet"
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

ReactDOM.render(
    <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="accounts">
                        <NavIcon>
                        <i class="fas fa-user" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Accounts
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="tokens">
                        <NavIcon>
                        <i class="fab fa-bitcoin" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Create Token
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="exchange">
                        <NavIcon>
                        <i class="fas fa-exchange-alt" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Exchange
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="wallet">
                        <NavIcon>
                        <i class="fas fa-wallet" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Wallet
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>
                <Route path="/" exact component={props => <Home />} />
                <Route path="/accounts" component={props => <Account />} />
                <Route path="/tokens" component={props => <Token />} />
                <Route path="/exchange" component={props => <Exchange />} />
                <Route path="/wallet" component={props => <Wallet />} />
            </main>
        </React.Fragment>
    )}
    />
</Router>, 
    document.getElementById("root")
    
)
