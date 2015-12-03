var React = require('react');
var {Router, Route, IndexRoute} = require('react-router');
var ReactDOM = require('react-dom');
var Main = require('./components/pages/main.jsx');
var Home = require('./components/pages/home.jsx');

module.exports = (
    <Router>
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
        </Route>
    </Router>
)