import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  }
  
  open({name, link}) { 
    const popupPicture = this._openPopup.querySelector('.popup__picture');
    const popupPictureTitle = this._openPopup.querySelector('.popup__picture-title');
    popupPicture.src = link;  
    popupPictureTitle.alt =name;  
    popupPictureTitle.textContent = name;   
    super.open();
  }
}
    
