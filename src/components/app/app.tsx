import React from 'react';
import app from './app.module.css';
import AppHeader from "../App-Header/App-Header";
import {data} from '../../utils/constants'
import MainSection from '../main-section/main'

const bun = data.filter((i) => i.type === 'bun');
const main = data.filter((i) => i.type === 'main');
const sauce = data.filter((i) => i.type === 'sauce');

function App() {
    return (
        <div className={app.app}>
            <AppHeader/>
            <MainSection bun={bun} main={main} sauce={sauce} />
        </div>
    );
}

export default App;
