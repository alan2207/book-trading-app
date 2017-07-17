import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

import Book from '../components/Book';


function divideArr(arr, div) {
	var result = [];
	var part = [];
	for (var i = 1; i <= arr.length; i++) {
		part.push(arr[i-1]);
		if(i%div === 0 || i === arr.length) {
			result.push(part);
			part = [];
		}
	}
	return result;
}

// rendering all the books on the page
class Books extends React.Component {

    componentDidMount() {
        this.props.getBooks();
    }

    renderBooks() {
        if(this.props.books.length) {
            const books = divideArr(this.props.books, 3)
            
            return books.map((row, index) => {
                return (
                    <div key={index} className="columns">
                        {
                            row.map((book) => {
                                return <Book key={book._id} books={this.props.books.filter(book => book.owner === localStorage.getItem('username'))} book={book} />                    
                            })
                        }
                    </div>
                )
            })
        }
    }


    render() {
        return (
            <div>
                {this.renderBooks()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books
    };
}

export default connect(mapStateToProps, actions)(Books);