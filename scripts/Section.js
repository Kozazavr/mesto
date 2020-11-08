class Section {
  constructor(items, renderer, selectorContainer) {
    this._items = items;
    this.renderer = renderer;
    this._selectorContainer = selectorContainer;
  }
    
  _getContainer() {
    const cardContainer = document
    .querySelector(this._selectorContainer);
    return cardContainer;
  }

  renderCards() {
    const cards = this._items.map(item => this.renderer(item));
    this.addItem(cards);
    return cards;
  }

  addItem(cards) {
    this._getContainer().prepend(...cards);
  }
}

export {Section};

