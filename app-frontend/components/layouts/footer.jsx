var React = require("react");

module.exports = React.createClass({
    render: function() {
        return (
                <footer className="site-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <h5>Kipit© 2015</h5>
                            </div>
                            <div className="col-sm-6 social-icons">
                                <a href="#">
                                    <span className="fa fa-facebook"></span>
                                </a>
                                <a href="#">
                                    <span className="fa fa-twitter"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
        );
    }
    });
