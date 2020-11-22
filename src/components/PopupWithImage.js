import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(card, selectorPopup) {
    super(selectorPopup);    //селектор попапа
    this._card = card;      ///разметка карточки
  }
  
  open({name, link}) {  //название карточки и ссылка ///Сам по себе текущий попап будет доступен через this, когда вы исправить класс Popup
    const popupPicture = this._openPopup.querySelector('.popup__picture');
    const popupPictureTitle = this._openPopup.querySelector('.popup__picture-title');
    popupPicture.src = link.src;  ///  <img class="card__image" alt="Фото" src="#"> 
    console.log(popupPicture.src);
    popupPictureTitle.textContent = link.textContent;  
    popupPictureTitle.textContent = name.textContent;   /// <h2 class="card__title"></h2>
    super.open();
  }
}