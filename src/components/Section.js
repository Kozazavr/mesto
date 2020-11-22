export default class Section {
  constructor({items, renderer}, selectorContainer) {
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }
    
  renderCards() {
    this._items.map(item => {
      this.renderer(item);
    });
  }

  addItem(cards) {
    this._getContainer().prepend(cards);
  }
}



