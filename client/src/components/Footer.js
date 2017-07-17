import React from 'react';

// just the footer of the page
export default class Footer extends React.Component {

    render() {
      return (
          <footer className="footer">
            <div className="container">
              <div className="content has-text-centered">
                <p>
                  Created as the part of Free Code Camp's Backend Curriculum
                </p>
                <p>
                  <a className="icon" href="https://github.com/alan2207/book-trading-app" target="_blank">
                    <i className="fa fa-github"></i>
                  </a>
                </p>
              </div>
            </div>
          </footer>
        )
    }
}

