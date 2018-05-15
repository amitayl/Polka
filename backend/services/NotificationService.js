const getNewBids = require('./notification-service/getNewBids.js');
const getRespondedBids = require('./notification-service/getRespondedBids.js');
const DBService = require('./DBService.js');
const mongo = require('mongodb');

function query(loggedInUserId) {
  return new Promise((resolve, reject) => {
    getNewBids(loggedInUserId).then(bids => {
      getRespondedBids(loggedInUserId).then(respondedBids => {
        const notifications = [...bids];
        if (respondedBids) notifications.push(...respondedBids);
        
        resolve(notifications);
      });
    });
  });
}

function remove(notification) {
  const bidderId = new mongo.ObjectID(notification.bid.bidder._id);
  const transactionId = new mongo.ObjectId(notification.bid._id);

  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .updateOne(
          { _id: bidderId },
          { $pull: { notifications: { transactionId } } },
          (err, res) => {
            if (err) reject();
            else resolve();
          }
        );
    });
  });
}

module.exports = {
  query,
  remove
};
