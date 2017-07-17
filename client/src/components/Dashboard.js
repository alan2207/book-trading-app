import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import MyBooks from '../containers/dashboard/MyBooks';
import AddBook from '../containers/dashboard/AddBook';
import RequestsSent from '../containers/dashboard/RequestsSent';
import RequestsRecieved from '../containers/dashboard/RequestsRecieved';

// dashboard component - user controlls books and trade requests
class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <h3 className="has-text-centered title is-3">Dashboard</h3>
                <div className="tabs is-centered">
                    <ul>
                        <li><Link to="/dashboard/mybooks">My Books</Link></li>
                        <li><Link to="/dashboard/requestssent">Requests Sent</Link></li>
                        <li><Link to="/dashboard/requestsrecieved">Requests Recieved</Link></li>
                        <li><Link to="/dashboard/addbook">Add Book</Link></li>
                    </ul>
                </div>
                <Switch>
                <Route exact path="/dashboard" render={() => <p>Welcome to the dashboard.</p>} />
                <Route path="/dashboard/mybooks" component={MyBooks} />
                <Route path="/dashboard/requestssent" component={RequestsSent} />
                <Route path="/dashboard/requestsrecieved" component={RequestsRecieved} />
                <Route path="/dashboard/addbook" component={AddBook} />
                </Switch>
            </div>
        )
    }
}


export default Dashboard;