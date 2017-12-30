var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

// stateless fucntional component
// it has no state, it recieves everything from props
function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return(
    <ul className='languages'>
      {languages.map(function(lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? {color : '#d0021b'} : null}
            onClick={props.onSelect.bind(null, lang)}
            // adding a unique key value
            key={lang}>
              {lang}
          </li>
        )
      }, this)}
    </ul>
  )
}

// in reference the 'this' that is the second arg of the map function
// because the 'this' keywork inside of the function is undefined and different from the specific instance above. This is common when using map. So map allows you to pass in a second arguament (first is the function) is the specifc context you want the function to be invoked in. So if we pass in this then they will be the same inside the function.
// funny story just use an arrow function and the inner part will inherit this from outside...

// .bind in the onclick function
// onClick to be a function that when invoked will call update languge passing it the specfic language
// .bind - in our case the 'this' keyword doesn't matter, pass it null, we have already bound updateLanguage so don't worry about it
// any other arguements we pass after the first arguement will be passed along to the initial function
// so this.updateLanguage.bind(null, lang) is going to return a new function with the lang argument, when we click on it the function will be invoked with the specifc lang that was clicked on.


function RepoGrid(props){
  return (
    <ul className='popular-list'>
      {props.repos.map(function(repo, index){
        return (
          <li
            key={repo.name}
            className='popular-item'
          >
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}


class Popular extends React.Component {
  constructor(props) {
    // always call super for constructors in react
    super(props);
    // initial state for this component, defaults to all
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };
    // we want updateLanguage to always refer to the specific component instance
    // goal is to make it so that the this inside update langugae is the component instance itself which will have a set state property
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  // invoked by react whenever the component is mounted to the DOM
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  // this function allows up to update that state
  // passed a new language, in order to update our state
  updateLanguage(lang) {
    this.setState( function() {
      return {
        selectedLanguage: lang,
        repos: null,
      };
    });

    // this makes the Ajax request to github and returns items
    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(function() {
          return {
            repos: repos
          }
        })
      });
  }

  render() {
    return(
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ?
          <p> LOADING </p>
          : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

// need the ternay operator because it tries to render the github repos before the api promise has returned
module.exports = Popular;
