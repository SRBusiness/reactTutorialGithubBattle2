var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Popular = require('./Popular');
var Results = require('./Results');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />

          
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={() => {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

// <Route path='/popular' component={Popular} />
// rendering a Route component and passing two props 1) path 2) component
// this component is only going to be rendered when a user is at /popular

// using switch it will show the found found one
module.exports = App;
