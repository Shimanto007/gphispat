import axios from 'axios'
import config from '../config'

function getIRequestProp() {
  let serverUrl = config.BASE_URL;
  return {
    serverUrl: serverUrl,
    requestHeader: {'Content-Type': 'application/json'}
  }
}


async function get(url, parameter) {
  let {serverUrl, requestHeader} = getIRequestProp();
  return axios.get(serverUrl + url, {
    params: parameter,
    headers: requestHeader
  })
}

async function post(url, body) {
  let {serverUrl, requestHeader} = getIRequestProp();
  return await axios.post(serverUrl + url, body, {
    headers: requestHeader
  })
}

async function put(url, body) {
  let {serverUrl, requestHeader} = getIRequestProp();
  return await axios.put(serverUrl + url, body, {
    headers: requestHeader
  })
}

async function patch(url, body) {
  let {serverUrl, requestHeader} = getIRequestProp();
  return await axios.patch(serverUrl + url, body, {
    headers: requestHeader
  })
}

async function remove(url, body) {
  let {serverUrl, requestHeader} = getIRequestProp();
  return await axios.delete(serverUrl + url, {
    data: body,
    headers: requestHeader
  })
}

export const AxiosServices = {
  get,
  post,
  put,
  patch,
  remove
}
