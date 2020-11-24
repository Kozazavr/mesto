export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._profileName = nameSelector; 
    this._profileJob = jobSelector;   
    this._userName = document.querySelector(this._profileName);
    this._userJob = document.querySelector(this._profileJob);
  }

  getUserInfo() {
    this._userInfo = { userName: this._userName.textContent, userJob: this._userJob.textContent};
    return this._userInfo;
  }

  setUserInfo(item) {
    this._userName.textContent = item.popup_name;
    this._userJob.textContent =  item.popup_job;
  }
}

