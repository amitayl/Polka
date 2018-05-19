const DBService = require('../DBService.js');
const mongo = require('mongodb');
const UserService = require('../UserService.js');

function getRespondedBids(loggedInUserId) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      loggedInUserId = new mongo.ObjectID(loggedInUserId);

      _getTransactions(loggedInUserId, db).then(transactions => {
        if (transactions.length === 0) return resolve();
        _replaceProductIdsWithData(transactions, db)
          .then(transactions => {
            const notificationTransactions = transactions.map(transaction => {
              const type =
                typeof transaction.owner.isReviewed === 'boolean'
                  ? 'acceptedBid'
                  : 'declinedBid';
              return { type, bid: transaction, isViewed: transaction.isViewed };
            });

            resolve(notificationTransactions);
            db.close();
          })
          .catch(err => {
            ('couldnt replace product ids with data', err);
            db.close();
          })

          .catch(err => {
            ('couldnt get user transactions', err);
          });
      });
    });
  });
}

function _getTransactions(loggedInUserId, db) {
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
          notifications: {
            $filter: {
              input: '$notifications',
              as: 'notification',
              cond: { $ne: ['$$notification.type', 'newBid'] }
            }
          }
        }
      },
      {
        $lookup: {
          from: DBService.COLLECTIONS.TRANSACTION,
          localField: 'notifications.transactionId',
          foreignField: '_id',
          as: 'transactions'
        }
      }
    ];

    db
      .collection(DBService.COLLECTIONS.USER)
      .aggregate(pipeline, (err, res) => {
        
        const notifications = res[0].notifications;
        const transactions = res[0].transactions;

        notifications.forEach(notification => {
          transactions.forEach(transaction => {
            if (notification.transactionId === transaction._id);
            transaction.isViewed = notification.isViewed;
          });
        });

        resolve(transactions);
      });
  });
}

function _replaceProductIdsWithData(transactions, db) {
  return new Promise((resolve, reject) => {
    const filter = {
      $or: []
    };

    transactions.forEach(transaction => {
      const ownerProductId = {
        _id: new mongo.ObjectID(transaction.owner.productId)
      };
      const bidderProductId = {
        _id: new mongo.ObjectID(transaction.bidder.productId)
      };
      filter.$or.push(ownerProductId, bidderProductId);
    });

    const colsToGet = { _id: 1, title: 1, desc: 1, imgs: 1 };

    db
      .collection(DBService.COLLECTIONS.PRODUCT)
      .find(filter, colsToGet)
      .toArray((err, products) => {
        if (err) reject(err);
        else {
          transactions.forEach(transaction => {
            const ownerProduct = products.find(product => {
              return (
                product._id.toString() ===
                transaction.owner.productId.toString()
              );
            });
            delete transaction.owner.productId;
            transaction.owner.product = ownerProduct;

            const bidderProduct = products.find(product => {
              return (
                product._id.toString() ===
                transaction.bidder.productId.toString()
              );
            });
            delete transaction.bidder.productId;
            transaction.bidder.product = bidderProduct;
          });

          transactions.forEach(transaction => {
            transaction.createdAt = Date.now();
          });

          resolve(transactions);
        }
      });
  });
}

module.exports = getRespondedBids;
