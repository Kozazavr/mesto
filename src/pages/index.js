import {
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
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css'; 

function createCard(item, count) {
  const card = new Card(item, cardId, () => {  
    viewPopupImage.open({name: item.name, link: item.link});
  }).generateCard();
  card.querySelector('.card__counter').textContent = count;
  return card;
}

const viewPopupImage = new PopupWithImage(popupViewImagesSelector);

// const cardSection = new Section({items: initialCards.reverse(), renderer: (item)=> {
//   cardSection.addItem(createCard(item));
// }}, cardsContainerSelector);

const userInfo = new UserInfo({nameSelector: profileNameSelector, jobSelector: profileJobSelector, avatarSelecto: profileAvatar});


///////////////////////////////////////

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-18/cards",
  headers: {
    "authorization": "314f493f-d410-4af8-924a-085e955b4269",
    "content-type": "application/json"
  }
}); 

const api2 = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-18/users/me",
  headers: {
    "authorization": "314f493f-d410-4af8-924a-085e955b4269",
    "content-type": "application/json"
  }
}); 

const api3 = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-18/users/me",
  headers: {
    "authorization": "314f493f-d410-4af8-924a-085e955b4269",
    "content-type": "application/json"
  }
}); 

const editUserPopup = new PopupWithForm({selectorPopup: popupProfileSelector, submitForm: (item) => {  
  const dataUser = {name: item.popup_name, about: item.popup_job};
  const profiNew = api3.editProfile(dataUser);
  profiNew.then((data) => {
    userInfo.setUserInfoProfile(data);
    const profi = api2.getInfoFromServer();
    profi.then((data) => {
      const userInfo = new UserInfo({nameSelector: profileNameSelector, jobSelector: profileJobSelector});
      userInfo.setUserInfoProfile(data);
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  }) ;
  editUserPopup.close();
}
});

const cards = api.getInfoFromServer();
cards.then((data) => {
  const cardSection = new Section({items: data, renderer: (item)=> {
    const count = item.likes.length;
    cardSection.addItem(createCard(item, count));
  }}, cardsContainerSelector);
  cardSection.renderCards();
})
.catch((err) => {
  console.log(err);
});

const profi = api2.getInfoFromServer();
profi.then((data) => {
  const userInfo = new UserInfo({nameSelector: profileNameSelector, jobSelector: profileJobSelector, avatarSelector: profileAvatar});
  userInfo.setUserInfo(data);
})
.catch((err) => {
  console.log(err);
});

const addCardPopup = new PopupWithForm({selectorPopup: popupAddImagesSelector, submitForm: (item) => {  
  const dataCard = {name: item.popup_name, link: item.popup_job, id: item.id};
  const container = document.querySelector(cardsContainerSelector);
  const newCards = api.addCard(dataCard);
  newCards.then((data) => {
    console.log(data._id);
    return container.prepend(createCard(data, 0));
  })
  .catch((err) => {
    console.log(err);
  });
  addCardPopup.close();
}
});
  
 
// const cardSection = new Section({items: item, renderer: (item)=> { 
  //     const dataCard = {name: item.popup_name, link: item.popup_job};
  //     cardSection.addItem(createCard(dataCard));
  //   }}, cardsContainerSelector);
  //   cardSection.renderCards();
  //   addCardPopup.close();
  //   }
  // });


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

editUserPopup.setEventListener();
addCardPopup.setEventListener();  
viewPopupImage.setEventListener(); 





// const profiNew = api3.editProfile({name: "ssss", about: "Korben"});
// profiNew.then((data) => {
//  console.log(data);
//  userInfo.setUserInfoProfile(data);
// })
// .catch((err) => {
//   console.log(err);
// });


// const editUserPopup = new PopupWithForm({selectorPopup: popupProfileSelector, submitForm: (item) => {  
//   const dataUser = {name: item.popup_name, about: item.popup_job};
//   console.log(dataUser);
//   userInfo.setUserInfo(item);
//   editUserPopup.close();
// } 
// });


// const addCardPopup = new PopupWithForm({selectorPopup: popupAddImagesSelector, submitForm: (item) => {  
//   const dataCard = {name: item.popup_name, link: item.popup_job, id: item.id};
//   const container = document.querySelector(cardsContainerSelector);
//   const newCards = api.addCard(dataCard);
//   newCards.then((data) => {
//     console.log(data._id);
//     return container.prepend(createCard(data));
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//   addCardPopup.close();
// }
// });