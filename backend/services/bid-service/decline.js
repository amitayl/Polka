const DBService = require('../DBService.js');
const mongo = require('mongodb');

function decline(bid) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      const bidId = new mongo.ObjectID(bid._id);
      const ownerProductId = new mongo.ObjectID(bid.owner.product._id);

      const prms = [
        removeNotificationFromOwner(bid, db),
        createTransactionPushNotification(bid, db),
        removeBidFromBids(bidId, db),
        removeBidfromOwnerBidIds(ownerProductId, bidId, db)
      ];

      Promise.all(prms)
        .then(() => {
          resolve();
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
  const bidId = new mongo.ObjectID(bid._id);

  return new Promise((resolve, reject) => {
    db.collection(DBService.COLLECTIONS.USER).updateOne(
      { _id: ownerId },
      { $pull: { notifications: {bidId} } },
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
      productId: new mongo.ObjectID(bid.owner.product._id)
    },
    bidder: {
      _id: new mongo.ObjectID(bid.bidder.product.ownerId),
      productId: new mongo.ObjectID(bid.bidder.product._id)
    },
    isDeal: false
  };

  return new Promise((resolve, reject) => {
    db
      .collection(DBService.COLLECTIONS.TRANSACTION)
      .insertOne(transaction, (err, { insertedId }) => {
        if (err) reject();
        else {
          const bidderId = transaction.bidder._id;

          pushNotification(bidderId, insertedId, db)
            .then(() => resolve())
            .catch(() => reject());
          resolve();
        }
      });
  });
}

function pushNotification(ownerId, insertedId, db) {
  const notification = {
    type: 'declinedBid',
    transactionId: insertedId
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
  // get owner product and remove bid id
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

module.exports = decline;
