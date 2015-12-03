var React = require("react");

var Cards = React.createClass({
  render: function() {
    return ( <div className={this.props.classCol}><div className="overlay"><p><strong>{this.props.desc}</strong ></p>
      </div ><span className = {this.props.icon} ></span ></div > );
        }
});

var Features = React.createClass({
    getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
    render: function () {
        var cards = [];
        var classes = ["col-sm-3 grey", "col-sm-3 black"];
        this.state.data.forEach(function (value, index) {
            var i = index % 2;
            cards.push( <Cards name = {value.name} desc = {value.description} key={value.name} classCol = {classes[i]} icon={value.icons} /> );
        });
    return (
      <div className="row">{cards}</div >
    );
  }
});



module.exports = Features;