import React, { Component } from 'react';
import axios from "axios/index";
import Parser from 'html-react-parser';

class Job extends Component {

    constructor (props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            description: '',
            job: {
                description: ''
            }
        };

        this.apiGet();
    }

    apiGet(){
        let url = '/server/get/' + this.state.id;

        axios({
            method:'get',
            url: url,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            this.setState({ job: res.data });
            this.setState({ description: res.data.description });
        });
    }

    render() {
        //let id = this.props.match.params.id;

        return (
            <div className="container">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/">Search</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {this.state.job.title}
                        </li>
                    </ol>
                </nav>

                <div className="row">

                    <div className="col-lg-9">

                        <div className="card mt-4">
                            <div className="card-body">
                                <h3 className="card-title">
                                    {this.state.job.title}
                                </h3>
                                <h5>{this.state.job.type} / {this.state.job.location}</h5>

                                { Parser(this.state.description) }
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-3">
                        <h1 className="my-4">{this.state.job.company}</h1>


                        {this.state.job.company_logo &&
                            <img src={this.state.job.company_logo} className="img-fluid" alt="Company logo"/>
                        }

                        <br/><br/>

                        {this.state.job.company_url &&
                            <a href={this.state.job.company_url}>{this.state.job.company_url}</a>
                        }
                    </div>

                </div>

            </div>
        );
    }
}

export default Job;