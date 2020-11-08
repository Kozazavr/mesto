import {initialCards} from './array.js';
import Card from './card.js';
import FormValidator from './FormValidator.js';
import {Section} from './Section.js';

const selectors = {
  formSelector: '.popup__container',  
  inputSelector: '.popup__input',    
  submitButtonSelector: '.popup__button',  
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',  
  errorClass: 'popup__input_error-text'
}

const popupProfile = document.querySelector('.popup_profile');
const popupAddImages = document.querySelector('.popup_add-images');
const profileButtonAddImages = document.querySelector('.profile__button-add-images'); 
const profileButton = document.querySelector('.profile__button');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupCloseAddImages = document.querySelector('.popup__close_add-images');
const submitAddImages = document.querySelector('.popup__button_create');
const submitProfile  = document.querySelector('.popup__button_save');
const popupPicture = document.querySelector('.popup__picture');
const popupPictureTitle = document.querySelector('.popup__picture-title');
const popupCloseViewImage= document.querySelector('.popup__close_view-image');
const nameImage = document.querySelector('.popup__input_type_image-name');
const linkImage = document.querySelector('.popup__input_type_image-link');
const popupViewImages = document.querySelector('.popup_view-images');
          
function closeEsc (evt) {
  if(evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc); 
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}

function clearInputs (popup) {
  const form = popup.querySelector('.popup__container');
  form.reset();
}

function clickCard(card) {
    const targetImage = card.querySelector('.card__image');
    const targetTitle = card.querySelector('.card__title');
    popupPicture.src = targetImage.src;
    popupPictureTitle.textContent = targetTitle.textContent;
    openPopup(popupViewImages);
  }

function renderer(item) {
  const card = new Card(item, '#card').generateCard();
  card.querySelector('.card__image').addEventListener('click', () => {clickCard(card)});
  return card;
}

function rendererSection (items) {
  const cardSection = new Section(items, renderer, '.cards');
  cardSection.renderCards();
}

const validatePopupProfile = new FormValidator(selectors, popupProfile);
validatePopupProfile.enableValidation();
const validatePopupAddImages = new FormValidator(selectors, popupAddImages);
validatePopupAddImages.enableValidation();

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
}

function formSubmitImages (evt) {
  evt.preventDefault();
  const item = [{name: nameImage.value,
    link: linkImage.value
  }];
  rendererSection(item);
  closePopup(popupAddImages);  
}

profileButtonAddImages.addEventListener('click', function () {
  validatePopupAddImages.inactiveButton(submitAddImages);
  validatePopupAddImages.hideInputError(popupAddImages, nameImage);
  validatePopupAddImages.hideInputError(popupAddImages, linkImage);
  clearInputs(popupAddImages);
  openPopup(popupAddImages);
});  

profileButton.addEventListener('click', function () {  
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validatePopupProfile.activeButton(submitProfile); 
  validatePopupProfile.hideInputError(popupProfile, inputName);
  validatePopupProfile.hideInputError(popupProfile, inputJob);
  openPopup(popupProfile);
}); 

function closePopupOverlay(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(openedPopup);
  }
}

popupProfile.addEventListener('click', closePopupOverlay);
popupAddImages.addEventListener('click', closePopupOverlay);
popupViewImages.addEventListener('click', closePopupOverlay);

popupCloseProfile.addEventListener('click', function () { 
  closePopup(popupProfile);
});  

popupCloseAddImages.addEventListener('click', function () {  
  closePopup(popupAddImages);
});  

popupCloseViewImage.addEventListener('click', function () {  
  closePopup(popupViewImages);
});  

popupProfile.addEventListener('submit', formSubmitHandler);
popupAddImages.addEventListener('submit', formSubmitImages);

rendererSection(initialCards);

