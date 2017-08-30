import React from 'react';
import BodyContainer from './BodyContainer'
import GA from './GA';

export default class RootPage extends React.Component {
    render() {
        return (
            <div>
                <BodyContainer>
                    {this.props.children}
                </BodyContainer>
                <GA/>
            </div>
        );
    }
}
