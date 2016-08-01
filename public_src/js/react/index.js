
var React = require('react');
var SideBarComponent = require('./sidebar/sidebar');
var TopBarComponent = require('./topbar/topbar');
var ModalComponent = require('./modals/modals');
var MessageBar = require('./messagebar/messagebar');

var App = React.createClass({
    render: function() {
        console.log(this.props);
        return (
          <div className="app-container">
            <ModalComponent />
            <MessageBar />
            <div>
              {this.props.children}
            </div>
          </div>
        )
    }
});

module.exports = App;
