import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListener() {
    super.setEventListener();
    this._openPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

}




