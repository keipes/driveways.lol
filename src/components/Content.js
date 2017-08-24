import React from 'react';
import {ControlLabel, FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import _ from 'underscore';
import CIKResult from './xbrl/CIKResult';

export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            disabled: true,
        };
    }
    render() {
        let max = 0;
        let sum = 0;
        this.state.results.forEach((result) => {
            if (result.score > max) {
                max = result.score;
            }
            sum += result.score;
        });
        const mean = sum / this.state.results.length;
        return (<div>
            <form
                onSubmit={(e) => {e.preventDefault();}}>
                <FormGroup
                    controlId="formBasicText"
                    validationState={true}>
                    <ControlLabel>Lookup Company</ControlLabel>
                    <FormControl
                        type="text"
                        disabled={this.state.disabled}
                        value={this.state.value}
                        placeholder="Amazon Com Inc"
                        onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Fuzzy search a company name.</HelpBlock>
                </FormGroup>
            </form>
            <div className="d-cik-results">
                {
                    this.state.results.map((result, idx) => {
                        return <CIKResult result={result} key={idx} maxScore={max} meanScore={mean}/>
                    })
                }
            </div>
        </div>);
    }

    handleChange(e) {
        e.preventDefault();
        this.query_debounced(e.target.value, 100);
    }

    componentDidMount() {
        this.setState({
            disabled: false
        });
        // this.query('amazon com inc', 100);
    }

    query_debounced = _.debounce(this.query, 300);

    query(query, limit) {
        fetch('https://api.driveways.lol/ciksearch', {
            method: "POST",
            headers: new Headers({
                'content-type': 'application/json',
                'accept': 'application/json'
            }),
            // mode: 'no-cors',
            body: JSON.stringify({
                query: query,
                limit: limit
            })
        }).then((response) => {
            const contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        }).then((json) => {
            console.log(json);
            this.setState(json);
            // this.state = json;
        }).catch((error) => {
            console.error(error);
        });
    }
}