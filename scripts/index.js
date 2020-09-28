let page = document.querySelector('.page');
let page__container = page.querySelector('.page__container');
let popup = page__container.querySelector('.popup');
let popup__container = popup.querySelector('.popup__container');
let popup__name = popup__container.querySelector('.popup__name');
let popup__occupation = popup__container.querySelector('.popup__occupation');
let profile = page__container.querySelector('.profile');
let profile__info = profile.querySelector('.profile__info');
let profile__button = profile__info.querySelector('.profile__button');
let profile__name = profile__info.querySelector('.profile__name');
let profile__occupation = profile__info.querySelector('.profile__occupation');
let popup__plus = popup__container.querySelector('.popup__plus');
let popup__button = popup__container.querySelector('.popup__button');


function openPopup () {
  popup.classList.toggle('popup_opened');
  popup__name.value = profile__name.textContent;
  popup__occupation.value = profile__occupation.textContent;
}

profile__button.addEventListener('click', openPopup);


function closePopup () {
  popup.classList.toggle('popup_opened');
}

popup__plus.addEventListener('click', closePopup);


 function formSubmitHandler (evt) {
    evt.preventDefault();
    let valueName = popup__name.value;
    profile__name.textContent = valueName;
    let valueOccupation = popup__occupation.value;
    profile__occupation.textContent = valueOccupation;
    closePopup();
  
 }

popup.addEventListener('submit', formSubmitHandler);










