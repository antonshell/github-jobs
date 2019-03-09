import React, { Component } from 'react';
import JobRow from '../partials/JobRow';
import axios from "axios/index";

class SearchBar extends Component {

    constructor (props) {
        super(props);

        let urlParams = this.parseUrl();
        this.state = {
            searchDescription: this.getString(urlParams.get('search')),
            searchLocation: this.getString(urlParams.get('location')),
            searchType: (urlParams.get('full_time') === 'on'),

            jobs: [],
            suggestions: [],
            exactSearch: '',

            initialized: false,

            resultsCount: 11,
            resultsLabel: 'None',

            page: 1,
            pageSize: 50,
        };

        this.apiSearch();

        this.openNextPage = this.openNextPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    parseUrl(){
        const queryStr = this.props.location.search;
        return new URLSearchParams(queryStr);
    }

    encodeUrl(params){
        return Object.keys(params).map(function(key) {
            let value = params[key];
            value = (value == null) ? '' : value;
            return key + '=' + value;
        }).join('&');
    }

    getString(value){
        return (value == null) ? '' : value;
    }

    buildResultsLabel(search, location){
        let params = [search, location];
        params = params.filter(function (el) {
            return el !== '';
        });
        return params.join(', ');
    }

    componentDidMount() {
        this.refs.searchDescription.focus();
    }

    apiSearch(){
        let params = {
            'search': this.state.searchDescription,
            'location': this.state.searchLocation,
            'page': this.state.page,
        };

        if(this.state.searchType === true){
            params['full_time'] = 'on';
        }

        axios({
            method:'get',
            url: '/server/search',
            params: params,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            const jobs = res.data;
            let resultsLabel = this.buildResultsLabel(this.state.searchDescription, this.state.searchLocation);

            this.setState({ jobs });
            this.setState({ resultsLabel: resultsLabel });
            this.setState({ initialized: true });

            let queryString = this.encodeUrl(params);
            this.props.history.push('?' + queryString)
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state.searchType);

        this.apiSearch();
    }

    openNextPage(){
        let nextPage = this.state.page + 1;
        this.setState({ page: nextPage });
        this.apiSearch();
    }

    handleChange() {
        this.setState({
            searchDescription: this.refs.searchDescription.value,
            searchLocation: this.refs.searchLocation.value
        });
    }

    handleChecked () {
        this.setState({searchType: !this.state.searchType});
    }

    render() {
        return (
            <div className="container bootstrap snippet">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-content">

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputEmail4">Job Description</label>
                                            <input type="text" className="form-control" id="inputEmail4" placeholder="Filter by title, benefits, companies, expertise" value={this.state.searchDescription} ref="searchDescription" onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputPassword4">Location</label>
                                            <input type="text" className="form-control" id="inputPassword4" placeholder="Filter by city, state, zip code or country" value={this.state.searchLocation} ref="searchLocation" onChange={this.handleChange}/>
                                        </div>

                                        <div className="col-auto mt-1">
                                            <label htmlFor="inputPassword4">Full Time Only</label>
                                            <div className="form-check text-center">
                                                <input className="form-check-input" type="checkbox" id="autoSizingCheck2" defaultChecked={this.state.searchType} ref="searchType" onChange={ this.handleChecked }/>
                                            </div>
                                        </div>

                                        <div className="form-group col-md-2">
                                            <label>&nbsp;</label><br/>
                                            <button type="submit" className="btn btn-primary">Search</button>
                                        </div>
                                    </div>
                                </form>

                                {this.state.initialized ?
                                    <small>
                                        <span>{this.state.jobs.length}</span> results found for: <span className="text-navy">"{this.state.resultsLabel}"</span>
                                    </small> : ''
                                }
                                {/*<small>Request time  (0.23 seconds)</small>*/}

                                {this.state.jobs.map(function(job, i){
                                    return <JobRow job={job} key={i} />;
                                })}

                                {!this.state.jobs.length && this.state.initialized ?
                                    <div className="text-center">
                                        <h3>Nothing found</h3>
                                    </div> : ''
                                }

                                {!this.state.initialized ?
                                    <div className="text-center">
                                        <h3>Loading...</h3>
                                    </div> : ''
                                }

                                <div className="hr-line-dashed" />
                                <div className="text-center">
                                    {this.state.jobs.length === this.state.pageSize ?
                                        <button className="btn btn-primary" onClick={this.openNextPage}>Load more jobs</button> : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;