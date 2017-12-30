// Link and NavLink will both Render an Anchor tag
// var Link = require('react-router-dom').Link;
// NavLink will allow us to dynamically change styles of anchor tag based on if that anchor tag is active. Change style based on route.

var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>
          Popular
        </NavLink>
      </li>
    </ul>
  )
}

// whenever we are at '/battle' or at '/popular' the route for '/' will also be active
// so we add exact property to home '/' link


// export default Nav;
module.exports = Nav;
