import React from 'react';

export default class CIKResult extends React.Component {
    render() {
        const url = 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=' + this.props.result.cik;
        let quality_class = 'd-cik-result-poor';
        if (this.props.result.score === this.props.maxScore) {
            quality_class = 'd-cik-result-good';
        } else if (this.props.result.score >= this.props.meanScore) {
            quality_class = 'd-cik-result-fair';
        }
        return (
            <a href={url} className={"d-cik-result " + quality_class}
                 key={this.props.key}
                 onClick={this.handleClick.bind(this)}>{this.props.result.name}</a>
        );
    }

    handleClick() {
        const url = 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=' + this.props.result.cik;
        window.open(url);
    }
}
