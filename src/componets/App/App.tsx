import React from 'react';
// import Btn from '@material-ui/core/Button';
// import logo from '../../assets/logo.svg';
// import { Button } from '../../ui/Button/Button';
import Counter from '../counter/Counter';
import Table from '../Table/Table';

import classes from './App.module.scss';

function App() {
    return (
        <div className={classes.app}>
            <div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div>
            <Table />
            <Counter />
            <div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div>
            <div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div>
            <div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div><div>1</div>
        </div>
    );
}

export default App;

// <header className={classes.header}>
//     <img src={logo} className={classes.logo} alt="logo" />
//     <Counter />
//     <p>
//         Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <span>Learn </span>
// </header>
// <Button label="Test" />
// <Btn variant="contained">Default</Btn>
