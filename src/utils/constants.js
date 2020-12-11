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
const popupEditAvatar = document.querySelector('.popup_avatar');
const profileButtonAddImages = document.querySelector('.profile__button-add-images'); 
const profileButton = document.querySelector('.profile__button');
const profileButtonEditAvatar = document.querySelector('.profile__button-edit-avatar');
const submitAddImages = document.querySelector('.popup__button_create');
const submitProfile  = document.querySelector('.popup__button_save');
const submitEditAvatar = document.querySelector('.popup__button_avatar');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const inputAvatar = document.querySelector('.popup__input_type_avatar');
const popupViewImagesSelector = '.popup_view-images';
const cardId = '#card';
const cardsContainerSelector = '.cards';
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';
const popupProfileSelector = '.popup_profile';
const popupAddImagesSelector = '.popup_add-images';
const profileAvatar = '.profile__avatar';
const popupSubmitForm = '.popup_delete-images';
const popupAvatar = '.popup_avatar';


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
  profileAvatar,
  popupSubmitForm,
  popupAvatar,
  profileButtonEditAvatar,
  inputAvatar,
  submitEditAvatar,
  popupEditAvatar,
  // popupSubmit,
  // valueProfileSubmit,
  // valueAddImageSubmit
};
