import React from 'react';

export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        // this.load_data()
    }
    render() {
        console.log('Content');
        return (<div>
            
        </div>);
    }

    // load_data() {
    //     // const req = new Request('api.driveways.lol');
    //     // fetch(req).then((res) => {
    //     //     console.log(res);
    //     // });
    // }

    componentDidMount() {
        const body = {
            "query": "asd",
            "limit": 100
        };
        fetch('https://api.driveways.lol/ciksearch', {
            method: "POST",
            headers: new Headers({
                'content-type': 'application/json',
                'accept': 'application/json'
            }),
            // mode: 'no-cors',
            body: JSON.stringify(body)
        }).then((response) => {
            const contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        }).then((json) => {
            console.log(json);
        }).catch((error) => {
            console.error(error);
        });
    }
}