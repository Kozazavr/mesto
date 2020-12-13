export default class Card { 
  
  constructor(data, ownerId, cardSelector, userId, {handleCardClick, handleDeleteIconClick, likeCardHeard}) { 
    this.isChecked = false;
    this.checkId = false;
    this._name = data.name; 
    this._image = data.link; 
    this.likes = data.likes;
    this._alt = data.name; 
    this.ownerId = ownerId;
    this.userId = userId; 
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
    this._targetLike(this._setLikeChecked());
    if(this.userId != this.ownerId) {                                
      this._element.querySelector('.card__recycle-bin').classList.add('card__recycle-bin-hide');
    }
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
    if(!this.isChecked) {
      this.isChecked = true;
      return this._setLikeChecked();
    } else {
      this.checkId = !this.checkId;
      return this.checkId;
    }
  }

  _setLikeChecked() {
    this.checkId = this.likes.some(item => {return item._id === this.ownerId}); 
    return this.checkId;
  }

  _targetLike(check) {
    if(check) {
      this._element.querySelector('.card__like').classList.add('card__like_target');
    };
  }
} 

