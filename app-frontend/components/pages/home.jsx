var React = require('react');
var Features = require("./features.jsx");

module.exports = React.createClass({
    render: function() {
        return (
            <div>
              <div className="jumbotron hero">
                <div className="col-lg-6 col-lg-push-3 col-md-6 col-md-push-3 col-sm-8 col-sm-push-2 col-xs-12 container get-it">
                  <h1>
                      <strong>
                          <em>Kipit</em>
                      </strong>
                  </h1>
                  <p>Personal finance Management just got better.</p>
                  <p>
                      <a className="btn btn-success btn-lg" role="button" href="#">
                          <span className="fa fa-google"></span>
                          Google Play</a>
                      <a className="btn btn-primary btn-lg" role="button" href="">
                          <span className="fa fa-apple"></span>
                          App Store</a>
                  </p>
              </div>
    </div>
        <div> <p className="text-center">
            <strong>What
                <em>Kipit</em>
                helps you do</strong>
        </p> </div>
        <section id="fcards" className="features">
       <Features url="./assets/data/featuresCard.json" />
    </section>
  </div>
      );
    }
});
