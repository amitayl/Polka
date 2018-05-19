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

function setViewed(notificationsToUpdate, loggedInUserId) {
  return new Promise((resolve, reject) => {
    loggedInUserId = new mongo.ObjectID(loggedInUserId);

    // get user's notifications
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER).findOne(
          { _id: loggedInUserId },
          { _id: 0, notifications: 1 }, (err, res) => {
            if (err) {
              reject();
              return;
            }
            const notificationsFromDB = res.notifications;
            
            // for each notifications to update, find the matching DB notification
            // change it's isViewed to true 
            notificationsToUpdate.forEach(notificationToUpdate => {
              notificationsFromDB.forEach(notificationFromDB => {
                if (notificationToUpdate._id === notificationFromDB._id) {
                  notificationFromDB.isViewed = true;
                };
              })
            })

            // set the updated DB Notifications back into the user
            DBService.dbConnect().then(db => {
              db
                .collection(DBService.COLLECTIONS.USER).updateOne(
                  { _id: loggedInUserId },
                  { $set: { notifications: notificationsFromDB }}, 
                  (err, res) => {
                    if (err) reject(err)
                    else resolve()
                  })
            })
          })
    })
  })
}

module.exports = {
  query,
  remove,
  setViewed
};
