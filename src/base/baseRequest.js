const axios = require('axios');
const apiUrl = 'http://localhost:8000/api/';

export default {
  apiUrl,
  getHeaders(){
    let token = window.localStorage.getItem('token');
    if(token == null){
      return {}
    }
    return { Authorization: 'Bearer ' + token}
  },
  get(url, params = null){
    return axios.get(
        apiUrl+url,
        {headers: this.getHeaders(), params}
      );
  },
  post(url,data) {
    return axios.post(
      apiUrl+url,
      data, 
      {headers: this.getHeaders()},
      {headers:  {'Content-Type': 'multipart/form-data'}},
    );
  },
  put(url,data) {
    return axios.put(
      apiUrl+url,
      data, 
      {headers: this.getHeaders()},
      {headers:  {'Content-Type': 'multipart/form-data'}},
    );
  },
  delete(url,data) {
    return axios.delete(
      apiUrl+url,
      {headers: this.getHeaders()},
      data, 
    );
  },
}
