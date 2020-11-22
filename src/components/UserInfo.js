export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._profileName = nameSelector; 
    this._profileJob = jobSelector;   
  }

  getUserInfo() {
    this._name = document.querySelector(this._profileName).textContent;
    this._job = document.querySelector(this._profileJob).textContent;
    this._objectUserInfo = {}; 
    this._objectUserInfo[this._name] = this._job;
    return this._objectUserInfo;
  }

  setUserInfo(item) {
    const popupInputs = Object.values(item);
    document.querySelector(this._profileName).textContent = popupInputs[0];  
    document.querySelector(this._profileJob).textContent = popupInputs[1];
  }
}



