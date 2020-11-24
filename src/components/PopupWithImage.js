import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(card, selectorPopup) {
    super(selectorPopup);
    this._card = card;
  }
  
  open(popupElement) {
    const targetImage = this._card.querySelector('.card__image');
    const targetTitle = this._card.querySelector('.card__title');
    const popupPicture = popupElement.querySelector('.popup__picture');
    const popupPictureTitle = popupElement.querySelector('.popup__picture-title');
    popupPicture.src = targetImage.src;
    popupPictureTitle.textContent = targetTitle.textContent;
    super.open(popupElement);
  }
}