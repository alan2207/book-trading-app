import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import Request from './Request';

// displaying requests recieved by other users
class RequestsRecieved extends React.Component {

    componentDidMount() {
        this.props.getTrades();
    }

    renderRequests() {
        return this.props.trades.filter((trade) => {
            return trade.to.user === localStorage.getItem('username');
        }).map((trade) => {
            return (
                <Request key={trade._id} action="recieved" trade={trade} />
            );
        })
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <td className="has-text-centered">In</td>
                        <td className="has-text-centered">Out</td>
                        <td className="has-text-centered">Options</td>
                    </tr>
                </thead>
                <tbody>
                {this.renderRequests()}
                </tbody>
            </table>
        )
    }
}



function mapStateToProps(state) {
    return {
        trades: state.trades
    };
}


export default connect(mapStateToProps, actions)(RequestsRecieved);