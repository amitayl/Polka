class User {
  constructor({ email, password, img, desc, loc, nickName, desiredCategories }) {
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
    this.desiredCategories = desiredCategories;
  }
}

module.exports = User;