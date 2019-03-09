import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Search from '../pages/Search';
import Job from '../pages/Job';

import { Route } from 'react-router-dom'

class MainLayout extends Component {
  render() {
    return (
        <div className="primary-layout">

            <Header/>

            <main>
                <Route path="/" exact component={Search} />
                <Route path="/job/:id" exact component={Job} />
            </main>

            <Footer/>

        </div>
    );
  }
}

export default MainLayout;
