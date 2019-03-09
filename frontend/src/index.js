import React from 'react';
import ReactDOM from 'react-dom';

import MainLayout from './components/layouts/MainLayout';

import 'bootstrap/dist/css/bootstrap.css'

import { BrowserRouter } from 'react-router-dom'

const App = () => (
    <BrowserRouter>
        <MainLayout />
    </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));