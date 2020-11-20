import {initialCards} from '../components/array.js';
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js'; 
import './index.css'; 

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
const submitAddImages = document.querySelector('.popup__button_create');
const submitProfile  = document.querySelector('.popup__button_save');
const nameImage = document.querySelector('.popup__input_type_image-name');
const linkImage = document.querySelector('.popup__input_type_image-link');
const popupViewImages = document.querySelector('.popup_view-images');

          
function clearInputs (popup) {
  const form = popup.querySelector('.popup__container');
  form.reset();
}

const profilePopup = new Popup('.popup_profile');
const addPopup = new Popup('.popup_add-images');

function rendererSection (items) {
const cardSection = new Section({items: items, renderer: (item)=> {
  const card = new Card(item, '#card').generateCard();
  const viewPopup = new PopupWithImage(card, '.popup_view-images');
  card.querySelector('.card__image').addEventListener('click', () => {viewPopup.open(popupViewImages)});
  cardSection.addItem(card);
}}, '.cards');
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
  profilePopup.close(popupProfile);
}

function formSubmitImages (evt) {
  evt.preventDefault();
  const item = [{name: nameImage.value,
    link: linkImage.value
  }];
  rendererSection(item);
  addPopup.close(popupAddImages);
}

profileButtonAddImages.addEventListener('click', function () {
  validatePopupAddImages.inactiveButton(submitAddImages);
  validatePopupAddImages.hideInputError(popupAddImages, nameImage);
  validatePopupAddImages.hideInputError(popupAddImages, linkImage);
  clearInputs(popupAddImages);
  addPopup.open(popupAddImages);
});  

profileButton.addEventListener('click', function () {  
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validatePopupProfile.activeButton(submitProfile); 
  validatePopupProfile.hideInputError(popupProfile, inputName);
  validatePopupProfile.hideInputError(popupProfile, inputJob);
  profilePopup.open(popupProfile);
}); 

function closePopupOverlay(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if(evt.target.classList.contains('popup_opened')) {
    addPopup.close(openedPopup);
  }
}

popupProfile.addEventListener('click', closePopupOverlay);
popupAddImages.addEventListener('click', closePopupOverlay);
popupViewImages.addEventListener('click', closePopupOverlay);

popupProfile.addEventListener('submit', formSubmitHandler);
popupAddImages.addEventListener('submit', formSubmitImages);

rendererSection(initialCards.reverse());

class PopupWithForm extends Popup {
  constructor(selectorPopup, formSubmit) {
    super(selectorPopup);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {

  }



  // profileButtonAddImages.addEventListener('click', function () {
  //   validatePopupAddImages.inactiveButton(submitAddImages);
  //   validatePopupAddImages.hideInputError(popupAddImages, nameImage);
  //   validatePopupAddImages.hideInputError(popupAddImages, linkImage);
  //   clearInputs(popupAddImages);
  //   addPopup.open(popupAddImages);
  // });  
  
  // profileButton.addEventListener('click', function () {  
  //   inputName.value = profileName.textContent;
  //   inputJob.value = profileJob.textContent;
  //   validatePopupProfile.activeButton(submitProfile); 
  //   validatePopupProfile.hideInputError(popupProfile, inputName);
  //   validatePopupProfile.hideInputError(popupProfile, inputJob);
  //   profilePopup.open(popupProfile);
  // }); 
}