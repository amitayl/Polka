class User {
  constructor({ email, password, img, desc, location, nickName }) {
    this.createdAt = Date.now();
    this.productIds = [];
    this.notifications = [];

    this.email = email;
    this.password = password;
    this.img = img;
    this.desc = desc;
    this.location = location;
    this.nickName = nickName;
  }
}

module.exports = User;