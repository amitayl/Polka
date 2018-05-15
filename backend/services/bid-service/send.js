const DBService = require('../DBService.js');
const mongo = require('mongodb');
const Bid = require('../../classes/BidClass.js');
const { Promise } = require('es6-promise');
const isExists = require('./isExists.js');

function send(bidData) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      isExists(bidData.owner.productId, bidData.bidder.productId).then(
        isExists => {

          if (!isExists) {
            const newBid = new Bid(bidData);
            addToDB(newBid, db).then(bidFromDB => {

              const prms = [
                linkToOwnerProduct(newBid, db),
                pushNotificationToOwner(newBid, db)
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

          } else {
            reject();
            db.close();
          }
        }
      );
    });
  });
}

function addToDB(bid, db) {
  return new Promise((resolve, reject) => {
    db.collection(DBService.COLLECTIONS.BID).insertOne(bid, (err, res) => {
      if (err) reject(err);
      else resolve(res.ops[0]);
    });
  });
}

function linkToOwnerProduct(bid, db) {
  return new Promise((resolve, reject) => {
    const bidOwnerProductId = new mongo.ObjectID(bid.owner.productId);
    const bidId = new mongo.ObjectID(bid._id);

    db
      .collection(DBService.COLLECTIONS.PRODUCT)
      .updateOne(
        { _id: bidOwnerProductId },
        { $push: { bidIds: bidId } },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
  });
}

function pushNotificationToOwner(bid, db) {
  return new Promise((resolve, reject) => {
    const bidOwnerProductId = new mongo.ObjectID(bid.owner.productId);

    // find owner Id
    db
      .collection(DBService.COLLECTIONS.PRODUCT)
      .findOne(
        { _id: bidOwnerProductId },
        { ownerId: 1 },
        (err, { ownerId }) => {
          // push a notification to that owner
          const bidNotification = { type: 'newBid', bidId: bid._id };
          ownerId = new mongo.ObjectID(ownerId);

          db
            .collection(DBService.COLLECTIONS.USER)
            .updateOne(
              { _id: ownerId },
              { $push: { notifications: bidNotification } },
              (err, addedBidNotification) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              }
            );
        }
      );
  });
}

module.exports = send;
