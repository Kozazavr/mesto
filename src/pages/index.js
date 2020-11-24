import {
  initialCards, 
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
  popupAddImagesSelector
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'; 

const viewPopupImage = new PopupWithImage(popupViewImagesSelector);

const cardSection = new Section({items: initialCards.reverse(), renderer: (item)=> {
    const card = new Card(item, cardId, () => {  
      const targetImage = card.querySelector('.card__image');
      const targetTitle = card.querySelector('.card__title');
      targetImage.addEventListener('click', () => {
        viewPopupImage.open({name: targetTitle.textContent, link: targetImage.src});
        viewPopupImage.setEventListener();  
      });
    }).generateCard();
    cardSection.addItem(card);
}}, cardsContainerSelector);

const cardRenderer = new Section({items: []}, cardsContainerSelector);  
const userInfo = new UserInfo({nameSelector: profileNameSelector, jobSelector: profileJobSelector});

const editUserPopup = new PopupWithForm({selectorPopup: popupProfileSelector, submitForm: (item) => {  
  userInfo.setUserInfo(item);
  editUserPopup.close();
} 
});

const addCardPopup = new PopupWithForm({selectorPopup: popupAddImagesSelector, submitForm: (item) => {  
  const dataCard = {name: item.popup_name, link: item.popup_job};
  const form = new Card(dataCard, cardId).generateCard();
  cardRenderer.addItem(form);
  addCardPopup.close();
} 
});

const validatePopupProfile = new FormValidator(selectors, popupProfileForm);
validatePopupProfile.enableValidation();
const validatePopupAddImages = new FormValidator(selectors, popupAddImagesForm);
validatePopupAddImages.enableValidation();

profileButtonAddImages.addEventListener('click', function () {
  validatePopupAddImages.inactiveButton(submitAddImages);
  validatePopupAddImages.hideInputError(popupAddImagesForm);
  addCardPopup.open();
});  

profileButton.addEventListener('click', function () {  
  inputName.value = userInfo.getUserInfo().userName;    
  inputJob.value = userInfo.getUserInfo().userJob;   
  validatePopupProfile.activeButton(submitProfile); 
  validatePopupProfile.hideInputError(popupProfileForm);
  editUserPopup.open();
}); 

cardSection.renderCards();
editUserPopup.setEventListener();
addCardPopup.setEventListener();









 
  


