export default class Card {

  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._image = data.link;
    this._alt = data.name;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
     const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');
    cardImage.src = this._image;
    cardImage.alt = this._alt;
    cardTitle.textContent = this._name;
    this._setEventListeners(cardImage, cardTitle);
    return this._element;
  }

  _setEventListeners(cardImage, cardTitle) {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeCardHeard();
    });

    this._element.querySelector('.card__recycle-bin').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {    
      this.handleCardClick();                                                        
    });                                                                              

  }

  _likeCardHeard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_target');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null; 
  }

}






