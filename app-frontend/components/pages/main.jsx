var React = require("react");
var Header = require("./../layouts/header.jsx");
var Footer  = require("./../layouts/footer.jsx");

var Main = React.createClass({
  render :function(){
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>);
  }
});

module.exports = Main;