import React from 'react';

import {connect} from 'react-redux';

import * as actions from '../actions';

// single book component
class Book extends React.Component {
    constructor(props) {
        super(props);
    }


    // handle initializing a trade
    handleSubmit(e) {
        e.preventDefault();
        this.props.initializeTrade(localStorage.getItem('username'), e.target.firstChild.firstChild.firstChild.firstChild.value, this.props.book.owner, this.props.book.title);
    }

    // handle deletion of the book
    handleBookDelete() {
        this.props.deleteBook(this.props.book._id);
    }

    // rendering all options - books to trade with owned by the current user
    renderSelectOptions() {
        if(this.props.books) {
            return this.props.books.map((book, index) => {
                return (
                    <option key={index} value={book.title}>{book.title}</option>
                )
            })
        }
    }

    // render buttons and options properly
    renderOptions() {
        if(this.props.book.owner !== localStorage.getItem('username')) {
            return (
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="field">
                        <p className="control">
                            <span className="select is-fullwidth">
                            <select required defaultValue="" disabled={!this.props.authenticated} >
                                <option disabled="true" value="">Trade For</option>
                                {this.renderSelectOptions()}
                            </select>
                            </span>
                        </p>
                        </div>
                    <footer className="card-footer">
                        <button type="submit" className="card-footer-item button is-dark" disabled={!this.props.authenticated}>Trade</button>
                    </footer>
                </form>
            )
        } else {
            return (
                <div>
                    <div className="field">
                        <p className="control">
                            <span className="select is-fullwidth">
                            <select required defaultValue="" disabled >
                                <option disabled="true" value="">Trade For</option>
                            </select>
                            </span>
                        </p>
                    </div>
                    <footer className="card-footer">
                        <button onClick={this.handleBookDelete.bind(this)} className="card-footer-item button is-danger">Delete Book</button>
                    </footer>
                </div>
            )
        }
    }



    render() {
        
        return (
            <div key={this.props.book._id} className="column is-4">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">{this.props.book.title}</p>
                    </header>
                        <div style={{overflow: 'auto'}} className="card-content">
                        <img className="book-image" height="150" src={this.props.book.image} />
                        <div className="content">
                            <p>Author: <strong>{this.props.book.authors[0]}</strong></p>
                            <p>Pages: <strong>{this.props.book.pageCount}</strong></p>
                            <p>Published: <strong>{this.props.book.date}</strong></p>
                            <p>Owner: <strong>{this.props.book.owner}</strong></p>
                        </div>
                    </div>
                    {this.renderOptions()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}



export default connect(mapStateToProps, actions)(Book);