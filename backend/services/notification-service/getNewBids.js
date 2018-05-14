const DBService = require('../DBService.js');
const mongo = require('mongodb');
const UserService = require('../UserService.js');

function getNewBids(loggedInUserId) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      loggedInUserId = new mongo.ObjectID(loggedInUserId);

      _getNotificationsWithBidData(loggedInUserId, db)
        .then(notificationsWithBidData => {
          _replaceBidsInnerPointersWithData(notificationsWithBidData, db)
            .then(finalNotifications => {
              resolve(finalNotifications);
              db.close();
            })
            .catch(err => {
              db.close();
            });
        })
        .catch(err => {
          db.close();
        });
    });
  });
}

function _getNotificationsWithBidData(loggedInUserId, db) {
  return new Promise((resolve, reject) => {
    const pipeline = [
      {
        $match: {
          _id: loggedInUserId
        }
      },
      {
        $project: {
          _id: 0,
          notifications: 1
        }
      },
      {
        $unwind: '$notifications'
      },
      {
        $lookup: {
          from: DBService.COLLECTIONS.BID,
          localField: 'notifications.bidId',
          foreignField: '_id',
          as: 'bid'
        }
      },
      { $unwind: '$bid' }
    ];

    db
      .collection(DBService.COLLECTIONS.USER)
      .aggregate(pipeline, (err, res) => {
        const notifications = res;

        notifications.forEach((notification, idx) => {
          delete notification.notifications;
          notification.type = 'newBid';
        });

        if (err) reject(err);
        else resolve(notifications);
      });
  });
}

function _replaceBidsInnerPointersWithData(notifications, db) {
  return new Promise((resolve, reject) => {
    const prms = [];

    notifications.forEach(notification => {
      let ownerProductId = notification.bid.owner.productId;
      let bidderProductId = notification.bid.bidder.productId;

      const filter = {
        $or: [
          { _id: new mongo.ObjectID(ownerProductId) },
          { _id: new mongo.ObjectID(bidderProductId) }
        ]
      };
      const ColsToGet = { _id: 1, imgs: 1, ownerId: 1, title: 1, desc: 1 };

      const findProductPrm = new Promise((resolve, reject) => {
        db
          .collection(DBService.COLLECTIONS.PRODUCT)
          .find(filter, ColsToGet)
          .toArray((err, products) => {
            products.forEach(product => {
              const productId = product._id.toString();
              ownerProductId = ownerProductId.toString();
              bidderProductId = bidderProductId.toString();

              if (ownerProductId === productId)
                notification.bid.owner.product = product;
              else notification.bid.bidder.product = product;
            });
            resolve();
          });
      });

      prms.push(findProductPrm);
    });

    Promise.all(prms).then(() => resolve(notifications));
  });
}

module.exports = getNewBids;
