export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._profileName = nameSelector; 
    this._profileJob = jobSelector;   
    this._profileAvatar = avatarSelector;
    this._userName = document.querySelector(this._profileName);
    this._userJob = document.querySelector(this._profileJob);
    this._profileAvatar = document.querySelector(this._profileAvatar);
  }

  getUserInfo() {
    this._userInfo = { userName: this._userName.textContent, userJob: this._userJob.textContent};
    return this._userInfo;
  }

  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userJob.textContent =  item.about;
    this._profileAvatar.alt = item.name;
    this._profileAvatar.src = item.avatar;
    
  }

  setUserInfoProfile(item) {
    this._userName.textContent = item.name;
    this._userJob.textContent =  item.about;
  }
}


 
//     getUserInfo() {
//       this._userInfo = { userName: this._userName.textContent, userJob: this._userJob.textContent, 
//         userAvatar: this._profileAvatar.link};
//       return this._userInfo;
//     }
  

