import {
  initialCards, 
  selectors,
  popupProfile,
  popupAddImages,
  profileButtonAddImages,
  profileButton,
  submitAddImages,
  submitProfile,
  nameImage,
  linkImage,
  popupViewImages
} from '../utils/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'; 

const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
          
function clearInputs (popup) {
  const form = popup.querySelector('.popup__container');
  form.reset();
}

const userInfo = new UserInfo({name: '.profile__name', job: '.profile__job'});

const profileSubmitForm = new PopupWithForm({selectorPopup: '.popup_profile', submitForm: (item) => {
  userInfo.setUserInfo(item);
  profilePopup.close(popupProfile);
} 
});

const addImagesSubmitForm = new PopupWithForm({selectorPopup: '.popup_add-images', submitForm: (item) => {
  const array = [item];
  rendererSection(array);
  addImagesSubmitForm.close(popupAddImages);
} 
});

profileSubmitForm.setEventListener(popupProfile);
addImagesSubmitForm.setEventListener(popupAddImages);

const profilePopup = new Popup('.popup_profile');
const addPopup = new Popup('.popup_add-images');

function rendererSection (items) {
  const cardSection = new Section({items: items, renderer: (item)=> {
    const card = new Card(item, '#card', () => {
      viewPopup.open(popupViewImages);
    }).generateCard();
    const viewPopup = new PopupWithImage(card, '.popup_view-images');
    cardSection.addItem(card);
  }}, '.cards');
  cardSection.renderCards();
}

const validatePopupProfile = new FormValidator(selectors, popupProfile);
validatePopupProfile.enableValidation();
const validatePopupAddImages = new FormValidator(selectors, popupAddImages);
validatePopupAddImages.enableValidation();

profileButtonAddImages.addEventListener('click', function () {
  validatePopupAddImages.inactiveButton(submitAddImages);
  validatePopupAddImages.hideInputError(popupAddImages, nameImage);
  validatePopupAddImages.hideInputError(popupAddImages, linkImage);
  clearInputs(popupAddImages);
  addPopup.open(popupAddImages);
});  


profileButton.addEventListener('click', function () {  
  inputName.value = Object.keys(userInfo.getUserInfo());    ////
  inputJob.value = Object.values(userInfo.getUserInfo());   /////
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

rendererSection(initialCards.reverse());







 
  


