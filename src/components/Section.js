export default class Section {
  constructor({items, renderer}, selectorContainer, api) {   
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(selectorContainer);
    this._api = api;
  }
    
  renderCards() {
    this._items.map(item => {
      this.renderer(item);
    });
  }

  addItem(cards) {
    this._container.prepend(cards);
  }

  // saveItem(data) {
  //   this._api
  //     .addCard({name: data.name, link: data.link})
  //     .then((data) => this.addItem(data))
  //     .catch((err) => console.log(err));
  
  // }

}


// console.log(data);
// console.log(data[0]);
// console.log(data[0].likes);

