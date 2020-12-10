export default class Card { 
  
  constructor(data, theBestWebProggerInMyRoomId, cardSelector, {handleCardClick, handleDeleteIconClick, likeCardHeard}) { 
    this.checked = false;
    this.Proverka = false;
    this._name = data.name; 
    this._image = data.link; 
    this._ownerId = data.owner._id;
    this.theBestWebProggerInMyRoomId = theBestWebProggerInMyRoomId;
    this._alt = data.name; 
    this._data = data;
    this._cardSelector = cardSelector; 
    this.handleCardClick = handleCardClick; 
    this.handleDeleteIconClick = handleDeleteIconClick;
    this.likeCardHeard = likeCardHeard;
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
    this._setEventListeners(); 
    this._targetLike(this._setLikeChecked(this.theBestWebProggerInMyRoomId));
    return this._element; 
  } 

  _setEventListeners() { 
    this._element.querySelector('.card__like').addEventListener('click', () => { 
      this.likeCardHeard(this._isLike()); 
         
    }); 
 
    this._element.querySelector('.card__recycle-bin').addEventListener('click', () => { 
       this.handleDeleteIconClick();
    }); 
 
    this._element.querySelector('.card__image').addEventListener('click', () => {     
      this.handleCardClick();                     
    });                                                                               
  } 

  _isLike() {
    if(!this.checked) {
      this.checked = true;
      return this._setLikeChecked(this.theBestWebProggerInMyRoomId);
    } else {
      this.Proverka = !this.Proverka;
      return this.Proverka;
    }
  }

  _setLikeChecked(iddd) {
    let array = this._data.likes;
    this.Proverka = array.some(item => {return item._id === iddd}); 
    return this.Proverka;
  }

  _targetLike(checked) {
    if(checked) {
      this._element.querySelector('.card__like').classList.add('card__like_target');
    };
  }

} 




