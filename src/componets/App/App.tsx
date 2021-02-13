import React from 'react';
import logo from '../../assets/logo.svg';
import Counter from '../counter/Counter';

import './App.scss';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <span>Learn </span>
            </header>
        </div>
    );
}

export default App;
