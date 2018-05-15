const DB_URL = 'mongodb://polka:polka@ds263109.mlab.com:63109/polka_db';
const mongo = require('mongodb');

const COLLECTIONS = {
  POLKA: 'polka',
  USER: 'user',
  PRODUCT: 'product',
  BID: 'bid',
  TRANSACTION: 'transaction',
  NOTIFICATION: 'notification'
};
Object.freeze(COLLECTIONS);

function dbConnect() {
  let prmConnect = new Promise((resolve, reject) => {
    mongo.MongoClient.connect(DB_URL, (err, db) => {
      if (err) reject(err);
      else resolve(db);
    });
  });
  prmConnect.catch(err => console.error(err));
  return prmConnect;
}

function cleanDB() {
  console.log('cleaning DB');
  dbConnect().then(db => {
    // clean out DB
    db.collection(COLLECTIONS.BID).remove({});
    db.collection(COLLECTIONS.TRANSACTION).remove({});
    db.collection(COLLECTIONS.PRODUCT).remove({});
    db.collection(COLLECTIONS.USER).remove({}, (err, res) => {
      const khen = {
        createdAt: Date.now(),
        productIds: [],
        notifications: [],
        email: 'khen@gmail.com',
        password: '1234',
        img:
          'https://res.cloudinary.com/amielsosa/image/upload/v1526230457/idp7l2q6ozdskqe1o4v6.jpg',
        desc: 'i love nina',
        location: null,
        nickName: 'khen'
      };

      const khenProduct = {
        createdAt: Date.now(),
        title: 'Kidney',
        imgs: [
          'https://res.cloudinary.com/amielsosa/image/upload/v1526230505/qsyjjlnn0efhlkz0hfvz.png'
        ],
        categories: ['toys'],
        desiredSwapCategories: ['vintage'],
        desc: 'My own kidneys, you better give me something good',
        bidIds: [],
        location: 'Ramat Gan',
        isLive: true
      };

      const asaf = {
        createdAt: Date.now(),
        productIds: [],
        notifications: [],
        email: 'asafshpigler@gmail.com',
        password: '1234',
        img:
          'https://res.cloudinary.com/amielsosa/image/upload/v1526230457/idp7l2q6ozdskqe1o4v6.jpg',
        desc: 'MY NAME S',
        location: null,
        nickName: 'asaf'
      };

      const asafProduct = {
        createdAt: Date.now(),
        title: 'Galaxy',
        imgs: [
          'https://res.cloudinary.com/amielsosa/image/upload/v1526309411/wasusw7drx53apkcomo2.jpg'
        ],
        categories: ['toys'],
        desiredSwapCategories: ['vintage'],
        desc: 'a new galaxy phone, j7',
        bidIds: [],
        location: 'Tel aviv',
        isLive: true
      };

      addUserAndHisProduct(khen, khenProduct);
      addUserAndHisProduct(asaf, asafProduct);

      function addUserAndHisProduct(user, product) {
        db.collection(COLLECTIONS.USER).insertOne(user, (err, res) => {
          const userId = res.insertedId;
          product.ownerId = userId;
          db.collection(COLLECTIONS.PRODUCT).insertOne(product, (err, res) => {
            const productId = res.insertedId;
            console.log('product inserted id', productId);
            db
              .collection(COLLECTIONS.USER)
              .updateOne(
                { _id: new mongo.ObjectID(userId) },
                { $push: { productIds: productId } }
              );
          });
        });
      }
    });
  });
}

// cleanDB();

module.exports = {
  COLLECTIONS,
  dbConnect
};
