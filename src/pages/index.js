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
  profileAvatarSelector,
  popupSubmitFormSelector,
  popupAvatarSelector,
  profileButtonEditAvatar,
  inputAvatar,
  submitEditAvatar,
  popupEditAvatar,
  popupSubmitButtonSelector,
  cardCounterSelector,
  cardLikeSelector,
  cardLikeTargetSelector
} from '../utils/constants.js';
 
import Api from '../utils/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import './index.css'; 

function changeTextButton(popup) {
  popup.querySelector(popupSubmitButtonSelector).textContent = 'Сохранение...';
}

function defaultTextButton(popup) {
  const popupSubmit = popup.querySelector(popupSubmitButtonSelector);
  if(popup === popupProfileForm || popup === popupEditAvatar) {
      popupSubmit.textContent = 'Сохранить';
  } else {
    popupSubmit.textContent = 'Создать';
  }
}

const viewPopupImage = new PopupWithImage(popupViewImagesSelector);
const userInfo = new UserInfo({nameSelector: profileNameSelector, jobSelector: profileJobSelector, avatarSelector: profileAvatarSelector});
const deletePopupImage = new PopupWithSubmit(popupSubmitFormSelector);  

const api = new Api({  
  url: "https://mesto.nomoreparties.co/v1/cohort-18/",
  headers: {
    "authorization": "314f493f-d410-4af8-924a-085e955b4269",
    "content-type": "application/json"
  }
}); 

function createCard(item, count, ownerId, userId) {
  const card = new Card(
    item,
    ownerId,
    cardId, 
    userId,
    {handleCardClick: () => {  
      viewPopupImage.open({name: item.name, link: item.link});
    },
    handleDeleteIconClick: () => {
      deletePopupImage.open();
      deletePopupImage.setSubmitAction(() => {
        api.deleteCard(item._id) 
        .then(() => {
          card.remove();
          deletePopupImage.close();
        })
        .catch((err) => {
          console.log(err);
        });
      });
    },
    likeCardHeard: (check) => {
      if(!check) {
        api.setLike(item._id)
        .then((res) => {
          const count = res.likes.length;
          card.querySelector(cardCounterSelector).textContent = count;
          card.querySelector(cardLikeSelector).classList.add(cardLikeTargetSelector);
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
       api.unLike(item._id)
        .then((res) => {
          const count = res.likes.length;
          card.querySelector(cardCounterSelector).textContent = count;
          card.querySelector(cardLikeSelector).classList.remove(cardLikeTargetSelector);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  }).generateCard();
  card.querySelector(cardCounterSelector).textContent = count;
  return card;
}

api.getInitialData()
.then(arrayPromise => {
  const [profilePromise, cardsPromise] = arrayPromise;
  const ownerId = profilePromise._id;
  userInfo.setUserInfo(profilePromise);
  const cardSection = new Section({items: cardsPromise, renderer: (item)=> {
    let userId = item.owner._id;
    const count = item.likes.length; 
    cardSection.addItem(createCard(item, count, ownerId, userId));
  }}, cardsContainerSelector);
  cardSection.renderCards();
})
.catch((err) => {
  console.log(err);
});

const editUserPopup = new PopupWithForm({selectorPopup: popupProfileSelector, submitForm: (item) => {  
  changeTextButton(popupProfileForm);
  const dataUser = {name: item.popup_name, about: item.popup_job};
  const profileNew = api.editProfile(dataUser);
  profileNew.then((res) => {
    userInfo.setUserInfoProfile(res);
    const profi = api.getProfileData();
    profi.then((res) => {
      userInfo.setUserInfoProfile(res);
<<<<<<< HEAD
      changeTextButton(popupProfileForm);
=======
>>>>>>> nine-work
      editUserPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });
<<<<<<< HEAD
}});

const addCardPopup = new PopupWithForm({selectorPopup: popupAddImagesSelector, submitForm: (item) => {  
  const dataCard = {name: item.popup_name, link: item.popup_job, id: item.id};
  const cardContainer = document.querySelector(cardsContainerSelector);
  const newCards = api.addCard(dataCard, 'cards');
  newCards.then((data) => {
    return cardContainer.prepend(createCard(data, 0, data.owner._id));
  })
  .catch((err) => {
    console.log(err);
  });
  changeTextButton(popupAddImagesForm);
  addCardPopup.close();
=======
>>>>>>> nine-work
}});

const popupSetAvatar = new PopupWithForm({selectorPopup: popupAvatarSelector, submitForm: (item) => {
  changeTextButton(popupEditAvatar);
  const newAvatar = api.editAvatar(item);
  newAvatar.then(() => {
    const profileData = api.getProfileData();
    profileData.then((res) => {
      userInfo.setUserAvatarProfile(res);
      popupSetAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });
}});

const addCardPopup = new PopupWithForm({selectorPopup: popupAddImagesSelector, submitForm: (item) => {  
  changeTextButton(popupAddImagesForm);
  const dataCard = {name: item.popup_name, link: item.popup_job, id: item.id};
  const newCards = api.addCard(dataCard);
  newCards.then((data) => {
    const cardSection = new Section({items: data, renderer: (item)=> {
      cardSection.addItem(createCard(item, 0, data.owner._id, data.owner._id));
    }}, cardsContainerSelector);
    cardSection.renderCard();
    addCardPopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
}});

const validatePopupProfile = new FormValidator(selectors, popupProfileForm);
validatePopupProfile.enableValidation();
const validatePopupAddImages = new FormValidator(selectors, popupAddImagesForm);
validatePopupAddImages.enableValidation();
const validatePopupEditAvatar = new FormValidator(selectors, popupEditAvatar);
validatePopupEditAvatar.enableValidation();

profileButtonAddImages.addEventListener('click', function () {
  validatePopupAddImages.inactiveButton(submitAddImages);
  validatePopupAddImages.hideInputError(popupAddImagesForm);
  defaultTextButton(popupAddImagesForm);
  addCardPopup.open();
});  

profileButton.addEventListener('click', function () {  
  let userData = userInfo.getUserInfo();
  inputName.value = userData.userName; 
  inputJob.value = userData.userJob; 
  validatePopupProfile.activeButton(submitProfile); 
  validatePopupProfile.hideInputError(popupProfileForm);
  defaultTextButton(popupProfileForm);
  editUserPopup.open();
}); 

profileButtonEditAvatar.addEventListener('click', function () {  
  validatePopupEditAvatar.inactiveButton(submitEditAvatar);
  validatePopupEditAvatar.hideInputError(popupEditAvatar, inputAvatar);
  defaultTextButton(popupEditAvatar);
  popupSetAvatar.open();
}); 

editUserPopup.setEventListener();
addCardPopup.setEventListener();  
viewPopupImage.setEventListener(); 
deletePopupImage.setEventListener();
popupSetAvatar.setEventListener();

