import {
  initialCards, 
  selectors,
  popupProfileForm,
  popupAddImagesForm,
  profileButtonAddImages,
  profileButton,
  submitAddImages,
  submitProfile,
  nameImage,
  linkImage,
  popupViewImages,
  inputName,
  inputJob
} from '../utils/constants.js';
import Card from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'; 

function rendererSection (items) {
  const cardSection = new Section({items: items, renderer: (item)=> {
    const card = new Card(item, '#card', () => {
      viewPopupImage.open({name: targetTitle, link: targetImage});  ////неверно написан метод open, открытие попапа картинки пока не работает по другому!!!
    }).generateCard();
    const viewPopupImage = new PopupWithImage(card, '.popup_view-images');
    cardSection.addItem(card);
  }}, '.cards');
  cardSection.renderCards();
}

const validatePopupProfile = new FormValidator(selectors, popupProfileForm);
validatePopupProfile.enableValidation();
const validatePopupAddImages = new FormValidator(selectors, popupAddImagesForm);
validatePopupAddImages.enableValidation();

const userInfo = new UserInfo({name: '.profile__name', job: '.profile__job'});

const profilePopup = new Popup('.popup_profile');
const popupAddImage = new Popup('.popup_add-images');  

profileButtonAddImages.addEventListener('click', function () {
  validatePopupAddImages.inactiveButton(submitAddImages);
  validatePopupAddImages.hideInputError(popupAddImagesForm, nameImage);
  validatePopupAddImages.hideInputError(popupAddImagesForm, linkImage);
  popupAddImage.open(popupAddImagesForm);
});  

profileButton.addEventListener('click', function () {  
  inputName.value = Object.keys(userInfo.getUserInfo());    
  inputJob.value = Object.values(userInfo.getUserInfo());   
  validatePopupProfile.activeButton(submitProfile); 
  validatePopupProfile.hideInputError(popupProfileForm, inputName);
  validatePopupProfile.hideInputError(popupProfileForm, inputJob);
  profilePopup.open(popupProfileForm);
}); 

const submitProfileForm = new PopupWithForm({selectorPopup: '.popup_profile', submitForm: (item) => {  
  userInfo.setUserInfo(item);
  profilePopup.close(); ///не работает метод close
} 
});

const submitAddImageForm = new PopupWithForm({selectorPopup: '.popup_add-images', submitForm: (item) => {  
  const array = [item];
  rendererSection(array);
  submitAddImageForm.close();  ///не работает метод close
} 
});

submitProfileForm.setEventListener();
submitAddImageForm.setEventListener();

rendererSection(initialCards.reverse());







 
  


