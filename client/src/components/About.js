import React from 'react';

export default function(props) {
    return (
        <div>
            <h2 className="title is-2 has-text-centered">About</h2>

            <p>This is a fullstack web application, built using the MERN stack. It was made as a part of FreeCodeCamp's Backend Curriculum.</p>

            <br/>
            <p>The frontend and the backend are completely separated, which makes it easy to integrate the app with other frontends.</p>

            <br/>
            <p>The app uses Google Books API to get the information about books.</p>
            
            <br/>
            <h3 className="title is-3">User Stories:</h3>

            <ul>
                <li>I can create new user profile.</li>
                <li> I can view all books posted by every user.</li>
                <li>I can add a new book.</li>
                <li>I can remove existing book from my collection.</li>
                <li>I can update my settings to store my full name, city, and state.</li>
                <li> I can propose a trade and wait for the other user to accept the trade.</li>
                <li>I can cancel propose sent by me.</li>
                <li>I can accept or reject others proposals.</li>
            </ul>

            <br/>


            <h3 className="title is-3">Technologies Used:</h3>
            <div className="columns">

                <div className="column">
                    <h4 className="title is-4">Frontend:</h4>
                    <ul>
                        <li>Bulma</li>
                        <li>React</li>
                        <li>Redux</li>
                        <li>React Router</li>
                        <li>Redux Thunk</li>
                        <li>Redux Form</li>
                        <li>Axios</li>
                        <li>Webpack</li>
                        <li>Babel</li>
                    </ul>
                </div>

                <div className="column">
                    <h4 className="title is-4">Backend:</h4>
                    <ul>
                        <li>Node</li>
                        <li>Express</li>
                        <li>MongoDB</li>
                        <li>React Router</li>
                        <li>Mongoose</li>
                        <li>Passport with JWT authentivation.</li>
                    </ul>
                </div>


            </div>
        </div>
    )
}