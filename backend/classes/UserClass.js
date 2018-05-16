class User {
  constructor({ email, password, img, desc, loc, nickName }) {
    this.createdAt = Date.now();
    this.productIds = [];
    this.notifications = [];
    this.reviews = [];

    this.email = email;
    this.password = password;
    this.img = img;
    this.desc = desc;
    this.loc = loc;
    this.nickName = nickName;
  }
}

module.exports = User;