const DBService = require('../DBService.js');
const mongo = require('mongodb');
const Bid = require('../../classes/BidClass.js');

function decline(notification) {
  return new Promise((resolve, reject) => {
    const prms = [];

    // remove bid from owner notifications
    /* const ownerId = new mongo.ObjectID(notification.owner._id);
      const notificationId = new mongo.ObjectID(notification._id);
      const prmRemoveBidFromOwner = DBService.dbConnect().then(db => {
        db
          .collection(DBService.COLLECTIONS.USER)
          .updateOne(
            { _id: ownerId },
            { $pull: { notifications: { bidId: notificationId } } },
            (err, _) => {
              if (err) throw Error(err);
              else return;
            }
          ); */

    // remove bid from product bid ids

    // const ownerProductId = new mongo.ObjectID(notification.owner.product._id);
    // const notificationId = new mongo.ObjectID(notification._id);
    // const prmRemoveBidfromProduct = DBService.dbConnect().then(db => {
    //   db
    //     .collection(DBService.COLLECTIONS.PRODUCT)
    //     .updateOne(
    //       { _id: ownerProductId },
    //       { $pull: { bidIds: notificationId } },
    //       (err, _) => {
    //         if (err) throw Error(err);
    //         else return;
    //       }
    //     );
    // });
    // prms.push(prmRemoveBidfromProduct);

    // remove bid from bids
    // const notificationId = new mongo.ObjectID(notification._id);
    // const prmRemoveBidFromBids = DBService.dbConnect().then(db => {
    //   db
    //     .collection(DBService.COLLECTIONS.BID)
    //     .deleteOne(
    //       { _id: notificationId },
    //       (err, _) => {
    //         if (err) throw Error(err);
    //         else return;
    //       }
    //     );
    // });
    // prms.push(prmRemoveBidFromBids);

    // send decline notification
    const bidderId = new mongo.ObjectID(notification.bidder._id);
    const declineNotification = { type: 'declinedBid', bid: notification };

    const prmSendDeclineNotification = DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.USER)
        .updateOne(
          { _id: bidderId },
          { $push: { notifications: declineNotification } },
          (err, _) => {
            if (err) throw Error(err);
            else return;
          }
        );
    });
    prms.push(prmSendDeclineNotification);

    Promise.all(prms).then(() => {
      resolve();
    });
  });
  // });
}

module.exports = decline