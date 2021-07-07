class Api {
  static headers(token) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + " " + token,
      'dataType': 'json',
    }
  }
  static get(route, token) {
    return this.appetizar(route, null, token, 'GET');
  }

  static put(route, params) {
    return this.appetizar(route, params, 'PUT')
  }

  static post(route, params) {
    return this.appetizar(route, params, null, 'POST')
  }

  static postwithToken(route, params, token) {
    return this.appetizar(route, params, token, 'POST')
  }

  static patch(route, params, token) {
    return this.appetizar(route, params, token, 'PATCH')
  }

  static delete(route, params) {
    return this.appetizar(route, params, 'DELETE')
  }

  static appetizar(route, params, token, verb,) {
    const host = 'https://api.appetizar.io/'
    const url = `${host}${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
    options.headers = Api.headers(token)
    return fetch(url, options).then(resp => {
      let json = resp.json();
      if (resp.ok) {
        return json;
      } else {
        return json;
      }
    }).then(json => json);
  }
}
export default Api
