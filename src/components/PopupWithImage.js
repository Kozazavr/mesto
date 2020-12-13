import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this.popupPicture = this._openPopup.querySelector('.popup__picture');
    this.popupPictureTitle = this._openPopup.querySelector('.popup__picture-title');
  }
  
  open({name, link}) { 
    this.popupPicture.src = link;  
    this.popupPictureTitle.alt =name;  
    this.popupPictureTitle.textContent = name;   
    super.open();
  }
}