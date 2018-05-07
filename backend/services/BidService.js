const DBService = require('./DBService');
const mongo = require('mongodb');

class Bid {
  constructor({ owner, bidder }) {
    this.createdAt = Date.now();

    this.owner = owner;
    this.bidder = bidder;
  }
}

function send(bidData) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      const bidCollection = db.collection(DBService.COLLECTIONS.BID);
      const productCollection = db.collection(DBService.COLLECTIONS.PRODUCT);

      isBidExists(bidCollection, bidData).then(isBidExists => {
        if (isBidExists) reject('bid exists');
        else {
          const newBid = new Bid(bidData);
          addBidToDB(bidCollection, newBid).then(bidFromDB => {
            const prmLinkBid = linkBidToOwnerProduct(productCollection, newBid);
            const prmPushNotification = pushNotificationToOwner();

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
    console.log(bidData);
    bidCollection.findOne(bidData, (err, bid) => {
      if (err) reject(err);
      else resolve(!!bid);
    });
  });
}

function addBidToDB(bidCollection, newBid) {
  return new Promise((resolve, reject) => {
    bidCollection.insertOne(newBid, (err, res) => {
      if (err) reject(err);
      else resolve(res.ops[0]);
    });
  });
}

function linkBidToOwnerProduct(productCollection, bid) {
  // get owner product
  console.log('bid in link bid to owner product', bid);
  // push to the owner's notifications our bid notification
  productCollection.updateOne(
    { _id: bid.owner.productId },
    { $push: { bidIds: bid._id } },
    (err, res) => {
      if (err) reject(err);
      else resolve();
    }
  );
}

function pushNotificationToOwner(bidCollection, newBid) {
  const bidNotification = { type: 'newBid', bidId: newBid._id };
  bidCollection.updateOne(
    { _id: newBid.owner._id },
    { $push: { notifications: [...notifications, bidNotification] } },
    (err, res) => {
      if (err) reject(err);
      else resolve();
    }
  );
}

module.exports = {
  send
};
