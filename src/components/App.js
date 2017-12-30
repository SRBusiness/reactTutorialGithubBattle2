var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
// var Home = require('./Home');
// var Battle = require('./Battle');
var Popular = require('./Popular');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>
    )
  }
}

// <Route path='/popular' component={Popular} />
// rendering a Route component and passing two props 1) path 2) component
// this component is only going to be rendered when a user is at /popular
module.exports = App;
