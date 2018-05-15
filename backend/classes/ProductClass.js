const mongo = require('mongodb');

class Product {
    constructor({title, desc, imgs, categories, ownerId}) {
        this.createdAt = Date.now();
        this.isLive = true;
        this.bidIds = [];
        this.viewCount = 0;

        this.title = title;
        this.desc = desc;
        this.imgs = imgs;
        this.categories = categories;
        this.ownerId = new mongo.ObjectID(ownerId);
    }
}

module.exports = Product;