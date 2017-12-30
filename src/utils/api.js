// import axios from 'axios';
var axios = require('axios');

module.exports = {
  fetchPopularRepos: function(language) {
    const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  }
};

// build the URL with the proper language based on what we pass in

// making a request to the github API, getting back the response, before we return the response to whatever invoked method fetchPopularRepos we are formatting it a little bit
