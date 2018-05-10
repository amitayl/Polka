const DBService = require('../DBService.js');
const mongo = require('mongodb');

function decline(bid) {
  console.log(bid);

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      // const prms;

      const bidId = new mongo.ObjectID(bid._id);
      const ownerProductId = new mongo.ObjectID(bid.owner.product._id);

      const prms = [
        createTransactionPushNotification(bid, db),
        removeBidFromBids(bidId, db),
        removeBidfromOwnerBidIds(ownerProductId, bidId, db),
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
      // draw failed transactions from DB with linkList created();
    });
  });
}

function createTransactionPushNotification(bid, db) {
  const transaction = {
    owner: {
      _id: bid.owner.product.ownerId,
      productId: bid.owner.product._id
    },
    bidder: {
      _id: bid.bidder.product.ownerId,
      productId: bid.bidder.product._id
    },
    isDeal: false
  };

  return new Promise((resolve, reject) => {
    db
      .collection(DBService.COLLECTIONS.TRANSACTION)
      .insertOne(transaction, (err, { insertedId }) => {
        if (err) reject();
        else {
          const ownerId = new mongo.ObjectID(bid.owner.product.ownerId);

          pushNotification(ownerId, insertedId, db)
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
