export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getCards(cards) {
    return fetch(`${this._url}${cards}`, {
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  getProfileData(me) {
    return fetch(`${this._url}${me}`, {
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }
  
  getAllNeedData(me, cards) {
    return Promise.all([this.getProfileData(me), this.getCards(cards)]);
  }

  addCard(data, cards) {
    return fetch(`${this._url}${cards}`, {
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

  editProfile(data, me) {
    return fetch(`${this._url}${me}`, {
      method: "PATCH", 
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  setLike(cardId) {
    return fetch(`${this._url}${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  unLike(cardId) {
    return fetch(`${this._url}${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  editAvatar(url, avatar) {  
    return fetch(`${this._url}${url}`,  {
      method: "PATCH", 
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
  }

}





