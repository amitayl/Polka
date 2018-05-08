const DBService = require('./DBService');
const mongo = require('mongodb');

class Bid {
  constructor({ owner, bidder }) {
    this.createdAt = Date.now();

    owner.productId = new mongo.ObjectID(owner.productId);
    bidder.productId = new mongo.ObjectID(bidder.productId);

    this.owner = owner;
    this.bidder = bidder;
  }
}

function send(bidData) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      const bidCollection = db.collection(DBService.COLLECTIONS.BID);
      const productCollection = db.collection(DBService.COLLECTIONS.PRODUCT);
      const userCollection = db.collection(DBService.COLLECTIONS.USER);

      isBidExists(bidCollection, bidData).then(isBidExists => {
        if (isBidExists) reject('bid exists');
        else {
          const newBid = new Bid(bidData);
          addBidToDB(bidCollection, newBid).then(bidFromDB => {
            const prmLinkBid = linkBidToOwnerProduct(productCollection, newBid);
            const prmPushNotification = pushNotificationToOwner(
              productCollection,
              userCollection,
              newBid
            );

            Promise.all(prmLinkBid, prmPushNotification).then(_ => {
              db.close();
            });
          });
        }
      });
    });
  });
}

function isBidExists(bidCollection, bidData) {
  return new Promise((resolve, reject) => {
    bidCollection.findOne(bidData, (err, bid) => {
      if (err) reject(err);
      else resolve(!!bid);
    });
  });
}

function addBidToDB(bidCollection, bid) {
  return new Promise((resolve, reject) => {
    bidCollection.insertOne(bid, (err, res) => {
      if (err) reject(err);
      else resolve(res.ops[0]);
    });
  });
}

function linkBidToOwnerProduct(productCollection, bid) {
  return new Promise((resolve, reject) => {
    productCollection.updateOne(
      { _id: bid.owner.productId },
      { $push: { bidIds: bid._id } },
      (err, res) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function pushNotificationToOwner(productCollection, userCollection, bid) {
  return new Promise((resolve, reject) => {
    // find owner Id
    productCollection.findOne(
      { _id: bid.owner.productId },
      { ownerId: 1 },
      (err, { ownerId }) => {
        // push a notification
        const bidNotification = { type: 'newBid', bidId: bid._id };

        ownerId = new mongo.ObjectID(ownerId);
        userCollection.updateOne(
          { _id: ownerId },
          { $push: { notifications: bidNotification } },
          (err, addedBidNotification) => {
            if (err) reject(err);
            else resolve();
          }
        );
      }
    );
  });
}

function declineBid(bidId) {
  console.log('bid service backend', { bidId });

  removeBidFromOwnerNotifications();

  // DBService.dbConnect().then(db => {
  //   db
  //     .collection(DBService.COLLECTIONS.USER)
  //     .updateOne({ _id: userId }, (err, removedUser) => {
  //       if (err) reject(err);
  //       else resolve(removedUser);
  //       db.close();
  //     });
  // });
  
  // remove from notifications (also visually)
  // remove from bids array in the product
  // remove frmo bids collection
  // send a declining msg

  return Promise.resolve();
}

module.exports = {
  send,
  declineBid
};
