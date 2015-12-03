var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand navbar-link" href="#">
                                <span className="glyphicon glyphicon-phone"></span>Kipit</a>
                                <div className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </div>
                        </div>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="nav navbar-nav navbar-right">
                            <li><a className="navbar-brand navbar-link" href="#">
                                <span className="glyphicon glyphicon-link"></span>SignUp</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
});
