const DBService = require('../DBService.js');
const mongo = require('mongodb');
const { emitGetNotifications } = require('../SocketService.js');

function accept(bid) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      const bidId = new mongo.ObjectID(bid._id);
      const ownerProductId = new mongo.ObjectID(bid.owner.product._id);

      const prms = [
        removeNotificationFromOwner(bid, db),
        createTransactionPushNotification(bid, db),
        removeBidFromBids(bidId, db),
        removeBidfromOwnerBidIds(ownerProductId, bidId, db),
        removeProductsFromShelfs(bid, db),
        // removeProductsIdsFromUsers(bid, db)
      ];

      Promise.all(prms)
        .then(values => {
          resolve(values[1]);
          db.close();
        })
        .catch(() => {
          reject();
          db.close();
        });
    });
  });
}

function removeNotificationFromOwner(bid, db) {
  const ownerId = new mongo.ObjectID(bid.owner.product.ownerId);
  const bidId = new mongo.ObjectId(bid._id);

  return new Promise((resolve, reject) => {
    db
      .collection(DBService.COLLECTIONS.USER)
      .updateOne(
        { _id: ownerId },
        { $pull: { notifications: { bidId } } },
        (err, res) => {
          if (err) reject();
          else resolve();
        }
      );
  });
}

function createTransactionPushNotification(bid, db) {
  const transaction = {
    owner: {
      _id: new mongo.ObjectID(bid.owner.product.ownerId),
      productId: new mongo.ObjectID(bid.owner.product._id),
      isReviewed: false
    },
    bidder: {
      _id: new mongo.ObjectID(bid.bidder.product.ownerId),
      productId: new mongo.ObjectID(bid.bidder.product._id),
      isReviewed: false
    },
    isDeal: true
  };

  return new Promise((resolve, reject) => {
    db
      .collection(DBService.COLLECTIONS.TRANSACTION)
      .insertOne(transaction, (err, { insertedId }) => {
        if (err) reject();
        else {
          const bidderId = new mongo.ObjectID(bid.bidder.product.ownerId);

          pushNotification(bidderId, insertedId, db)
            .then(() => {
              emitGetNotifications(bidderId);
              resolve(insertedId)
            })
            .catch(() => reject());
        }
      });
  });
}

function pushNotification(ownerId, insertedId, db) {
  const notification = {
    type: 'acceptBid',
    transactionId: insertedId,
    isViewed: false
  };

  return new Promise((resolve, reject) => {
    db
      .collection(DBService.COLLECTIONS.USER)
      .updateOne(
        { _id: ownerId },
        { $push: { notifications: notification } },
        (err, res) => {
          if (err) reject();
          else resolve();
        }
      );
  });
}

function removeBidFromBids(bidId, db) {
  return new Promise((resolve, reject) => {
    db
      .collection(DBService.COLLECTIONS.BID)
      .deleteOne({ _id: bidId }, (err, res) => {
        if (err) reject();
        else resolve();
      });
  });
}

function removeBidfromOwnerBidIds(ownerProductId, bidId, db) {
  return new Promise((resolve, reject) => {
    db
      .collection(DBService.COLLECTIONS.PRODUCT)
      .updateOne(
        { _id: ownerProductId },
        { $pull: { bidIds: bidId } },
        (err, res) => {
          if (err) reject();
          else resolve();
        }
      );
  });
}

function removeProductsFromShelfs(bid, db) {
  const ownerProductId = new mongo.ObjectID(bid.owner.product._id);
  const bidderProductId = new mongo.ObjectID(bid.bidder.product._id);

  const filter = {
    $or: [{ _id: ownerProductId }, { _id: bidderProductId }]
  };

  return new Promise((resolve, reject) => {
    db
      .collection(DBService.COLLECTIONS.PRODUCT)
      .update(filter, { $set: { isLive: false } }, {multi: true}, (err, res) => {
        if (err) reject();
        else resolve();
      });
  });
}

function removeProductsIdsFromUsers(bid, db) {
  return new Promise((resolve, reject) => {
    const ownerId = new mongo.ObjectID(bid.owner.product.ownerId);
    const ownerProductId = new mongo.ObjectID(bid.owner.product._id);

    const prmOwnerUpdate = new Promise((resolve, reject) => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .updateOne(
          { _id: ownerId },
          { $pull: { productIds: ownerProductId } },
          (err, res) => {
            if (err) reject();
            else resolve();
          }
        );
    });
    
    const bidderId = new mongo.ObjectID(bid.bidder.product.ownerId);
    const bidderProductId = new mongo.ObjectID(bid.bidder.product._id);

    const prmBidderUpdate = new Promise((resolve, reject) => {
      db
      .collection(DBService.COLLECTIONS.USER)
      .updateOne(
        { _id: bidderId },
        { $pull: { productIds: bidderProductId } },
        (err, res) => {
          if (err) reject();
          else resolve();
        }
      );
    });
  Promise.all([prmOwnerUpdate, prmBidderUpdate])
    .then(() => resolve())
    .catch(() => reject());
  });
}

module.exports = accept;
