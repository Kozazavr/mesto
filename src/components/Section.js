export default class Section {
  constructor({items, renderer}, selectorContainer) {   
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }
    
  renderCards() {
    this._items.sort((a, b) => { 
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    this._items.map(item => {
      this.renderer(item);
    });
  }

  addItem(cards) {
    this._container.prepend(cards);
  }
}
