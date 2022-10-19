import axios from 'axios';

const apis = {
  // Posts APIS
  posts: {
    getComments: () => axios.get('https://jsonplaceholder.typicode.com/comments'),
  },
};

export default apis;
