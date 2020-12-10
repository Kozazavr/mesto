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
  profileAvatar,
  popupSubmitForm,
  popupAvatar
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import './index.css'; 



const viewPopupImage = new PopupWithImage(popupViewImagesSelector);
const userInfo = new UserInfo({nameSelector: profileNameSelector, jobSelector: profileJobSelector, avatarSelector: profileAvatar});
const delPopup = new PopupWithSubmit(popupSubmitForm);
 
const popupSetAvatar = new PopupWithAvatar({selectorPopup: popupAvatar, submitForm: () => {PopupWithAvatar.close()}});///валидация!!!

const buttonAvatar = document.querySelector('.profile__button-edit-avatar');
buttonAvatar.addEventListener('click', () => {
  popupSetAvatar.open();
});


 function createCard(item, count, ownerId) {
   const theBestWebProggerInMyRoomId = ownerId;
   const card = new Card(
    item,
    theBestWebProggerInMyRoomId,
    cardId, 
    {handleCardClick: () => {  
      viewPopupImage.open({name: item.name, link: item.link});
    },
    handleDeleteIconClick: () => {
      delPopup.open();
      delPopup.setSubmitAction(() => {
        api.deleteCard(`cards/${item._id}`) 
        .then((res) => {
           card.remove();
        })
        .catch((err) => {
          console.log(err);
        });
         delPopup.close();
      })
    },
    likeCardHeard: (abc) => {
      if(!abc)
      {
        api.setLike(`cards/likes/${item._id}`)
        .then((res) => {
          const count = res.likes.length;
          card.querySelector('.card__counter').textContent = count;
          card.querySelector('.card__like').classList.add('card__like_target');
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
       api.unLike(`cards/likes/${item._id}`)
       .then((res) => {
        const count = res.likes.length;
        card.querySelector('.card__counter').textContent = count;
        card.querySelector('.card__like').classList.remove('card__like_target');
        })
      }
    }
    }).generateCard();
    card.querySelector('.card__counter').textContent = count;
  return card;
}


const api = new Api({  
  url: "https://mesto.nomoreparties.co/v1/cohort-18/",
  headers: {
    "authorization": "314f493f-d410-4af8-924a-085e955b4269",
    "content-type": "application/json"
  }
}); 



api.getAllNeedData('users/me', 'cards')
.then(arrayPromise => {
  const [profilePromise, cardsPromise] = arrayPromise;
  const ownerId = profilePromise._id;
  userInfo.setUserInfo(profilePromise);
  const cardSection = new Section({items: cardsPromise, renderer: (item)=> {
    const count = item.likes.length; ////////////////////
    if(item.owner._id === ownerId) {
      cardSection.addItem(createCard(item, count, ownerId));
    } else {
      let S = createCard(item, count, ownerId);
      S.querySelector('.card__recycle-bin').classList.add('bin');
      cardSection.addItem(S);
    }
  }}, cardsContainerSelector);
  cardSection.renderCards();
})
.catch((err) => {
  console.log(err);
});
///////

const editUserPopup = new PopupWithForm({selectorPopup: popupProfileSelector, submitForm: (item) => {  
  const dataUser = {name: item.popup_name, about: item.popup_job};
  const profiNew = api.editProfile(dataUser, 'users/me');
  profiNew.then((data) => {
    userInfo.setUserInfoProfile(data);
    const profi = api.getProfileData('users/me');
    profi.then((data) => {
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



const addCardPopup = new PopupWithForm({selectorPopup: popupAddImagesSelector, submitForm: (item) => {  
  const dataCard = {name: item.popup_name, link: item.popup_job, id: item.id};
  const container = document.querySelector(cardsContainerSelector);
  const newCards = api.addCard(dataCard, 'cards');
  newCards.then((data) => {
    return container.prepend(createCard(data, 0, data.owner._id));
  })
  .catch((err) => {
    console.log(err);
  });
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

editUserPopup.setEventListener();
addCardPopup.setEventListener();  
viewPopupImage.setEventListener(); 
delPopup.setEventListener();
popupSetAvatar.setEventListener();
 

// const profi = api.getProfileData('users/me');
// profi.then((data) => {
//   const userInfo = new UserInfo({nameSelector: profileNameSelector, jobSelector: profileJobSelector, avatarSelector: profileAvatar});
//   userInfo.setUserInfo(data);
// })
// .catch((err) => {
//   console.log(err);
// });

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



