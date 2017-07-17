import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

// component for single trade request
class Request extends React.Component {
    constructor(props) {
        super(props);
    }

    // handling rejection of the trade
    handleCancel() {
        this.props.cancelTrade(this.props.trade._id);
    }

    // handling acceptance of the trade
    handleAcept() {
        this.props.acceptTrade(this.props.trade._id);
    }

    // render buttons properly
    renderOptions()  {
        return this.props.action === 'sent' ? <button onClick={this.handleCancel.bind(this)} className="button is-danger">Cancel</button> 
                                            : (
                                                [
                                                    <button onClick={this.handleAcept.bind(this)} key={1} className="button is-primary">Accept</button>,
                                                    <button onClick={this.handleCancel.bind(this)} key={2} className="button is-danger">Reject</button>
                                                ]
                                             )
    }

    render() {
        return (
            <tr>
                <td className="has-text-centered">{this.props.trade.from.book}</td>
                <td className="has-text-centered">{this.props.trade.to.book}</td>
                <td className="has-text-centered">{this.renderOptions()}</td>
            </tr>
            
        )
    }
}

export default connect(null, actions)(Request);