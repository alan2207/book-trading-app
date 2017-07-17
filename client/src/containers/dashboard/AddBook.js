import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

// component for adding new book to current users collection
class AddBook extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        this.props.addBook(document.getElementById('addBook').value);
    }

    render() {
        return (
            <div>
                <h4>Add a book to your collection:</h4>
                <form className="field has-addons" onSubmit={this.handleSubmit.bind(this)}>
                    <p className="control">
                        <input id="addBook" className="input" type="text" placeholder="Add a book"/>
                    </p>
                    <p className="control">
                        <button type="submit" className="button is-black">
                            Add
                        </button>
                    </p>
                </form>
            </div>
        )
    }
}

export default connect(null, actions)(AddBook);