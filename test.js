const axios = require('axios')
const qs = require('qs')
const config = require('./config')

const processData = {
  token: '',
  email: '',
  user: {}
}

const authenticate = (email, password, username) => {
  const data = qs.stringify({
    username: username,
    email: email,
    password: password
  });

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };

  axios
    .post(
      `${config.url}/authenticate`,
      data,
      headers
    )
    .then(resp => {
      var token = resp.data.token;

      processData.token = token;
      processData.email = email;

      console.log('------------------------------------------------------------------------------------')
      console.log(processData);

      userRead();
    })
    .catch(error => {
      if (error.response !== undefined) {
        console.log('error: ', `${error.response.status} - ${error.response.statusText}`)
        console.log('error: ', `${error.response.data.errors}`)
      } else {
        console.log('error: ', error);
      }
    })
    ;
}

const userRead = () => {
  const headers = { 'Authorization': "Bearer " + processData.token };

  console.log('------------------------------------------------------------------------------------')
  console.log('headers:', headers);

  axios
    .get(
      `${config.url}/user/1`,
      null,
      headers
    )
    .then(resp => {
      var user = resp.data;

      processData.user = user;

      console.log('------------------------------------------------------------------------------------')
      console.table(processData);
    })
    .catch(error => {
      console.log('------------------------------------------------------------------------------------')
      if (error.response !== undefined) {
        console.log('error: ', `${error.response.status} - ${error.response.statusText}`)
        console.log('error: ', `${error.response.data.errors}`)
      } else {
        console.log('error: ', error);
      }
    })
    ;
}

console.table(config);
authenticate(config.email, config.password, config.username);
