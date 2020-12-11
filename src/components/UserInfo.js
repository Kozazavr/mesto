export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._profileName = nameSelector; 
    this._profileJob = jobSelector;   
    this._profileAvatar = avatarSelector;
    this._userName = document.querySelector(this._profileName);
    this._userJob = document.querySelector(this._profileJob);
    this._userAvatar = document.querySelector(this._profileAvatar);
  }

  getUserInfo() {
    this._userInfo = { userName: this._userName.textContent, userJob: this._userJob.textContent};
    return this._userInfo;
  }

  setUserInfo(item) {
    this.setUserInfoProfile(item);
    this.setUserAvatarProfile(item);
  }

  setUserInfoProfile(item) {
    this._userName.textContent = item.name;
    this._userJob.textContent =  item.about;
  }

  setUserAvatarProfile(item) {
    this._userAvatar.src = item.avatar;
  }
}




