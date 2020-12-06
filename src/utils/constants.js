const selectors = {
  formSelector: '.popup__container',  
  inputSelector: '.popup__input',    
  submitButtonSelector: '.popup__button',  
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',  
  errorClass: 'popup__input_error-text'
}

const popupProfileForm = document.querySelector('.popup_profile');
const popupAddImagesForm = document.querySelector('.popup_add-images');
const profileButtonAddImages = document.querySelector('.profile__button-add-images'); 
const profileButton = document.querySelector('.profile__button');
const submitAddImages = document.querySelector('.popup__button_create');
const submitProfile  = document.querySelector('.popup__button_save');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const popupViewImagesSelector = '.popup_view-images';
const cardId = '#card';
const cardsContainerSelector = '.cards';
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';
const popupProfileSelector = '.popup_profile';
const popupAddImagesSelector = '.popup_add-images';
const profileAvatar = '.profile__avatar';

export {
  selectors, 
  popupProfileForm, 
  popupAddImagesForm, 
  profileButtonAddImages, 
  profileButton, 
  submitAddImages, 
  submitProfile, 
  inputName,
  inputJob,
  popupViewImagesSelector,
  cardId,
  cardsContainerSelector,
  profileNameSelector,
  profileJobSelector,
  popupProfileSelector,
  popupAddImagesSelector,
  profileAvatar
};
