import React from 'react';

import Books from '../containers/Books';

class Home extends React.Component {

    render() {
        return (
            <div>
                <h2 className="has-text-centered title is-2">Book Trading App</h2>
                <Books />
            </div>
        )
    }
}


export default Home;