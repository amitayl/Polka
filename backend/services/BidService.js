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
    const newBid = new Bid(bidData);
    console.log(newBid);

    // add a new bid to bids collection
    DBService.dbConnect().then(db => {
      db.collection(DBService.COLLECTIONS.BID).insertOne(newBid, (err, res) => {
        if (err) reject(err);
        else {
          const addedBid = res.ops[0];

          // push a notification to the owner,
          const bidNotification = { type: 'newBid', bidId: newBid._id };
          db
            .collection(DBService.COLLECTIONS.USER)
            .updateOne(
              { _id: newBid.owner._id },
              { $set: { notifications: [...notifications, bidNotification] } },
              (err, res) => {
                if (err) reject(err);
                else resolve();
              }
            );
        }
        db.close();
      });
    });

    // connect the bid to the owner product
  });
}

module.exports = {
  send
};
