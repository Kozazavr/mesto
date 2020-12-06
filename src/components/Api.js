export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getInfoFromServer() {
    return fetch(this._url, {
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  addCard(data) {
    return fetch(this._url, {
      method: "POST", 
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  editProfile(data) {
    return fetch(this._url, {
      method: "PATCH", 
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
    })
    // .then((res) => {
    //   if(res.ok) {
    //     return res.json();
    //   }
    //   return Promise.reject(`Ошибка: ${res.status}`);
    // })
  })
}
}





