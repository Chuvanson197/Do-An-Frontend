import axios from 'axios';

const exampleService = {
  getReposByUsername: (username) => axios.get(`https://api.github.com/users/${username}/repos`).then((res) => res.data)
};

export default exampleService;
