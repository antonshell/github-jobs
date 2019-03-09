import React, {Component} from 'react';

class ProductRow extends Component {

    render() {
        let job = this.props.job;
        let href = '/job/' + String(job.id);
        let locationHref = '/?location=' + String(job.location);

        return (

            <div>
                <div className="hr-line-dashed"></div>
                <div className="search-result">
                    <h3>
                        <a href={href}>
                            {job.title}
                        </a>
                    </h3>
                    <a href={locationHref} className="search-link">{job.location}</a>
                    <p>
                        {job.company} – {job.type}
                    </p>
                </div>
            </div>
        );
    }
}

export default ProductRow;