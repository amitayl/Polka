const DBService = require('../DBService.js');
const mongo = require('mongodb');

function isExists(ownerProductId, bidderProductId) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection(DBService.COLLECTIONS.BID)
        .find({})
        .toArray((err, bids) => {
          if (err) reject();
          else {
            const bid = bids.find(bid => {
              return (
                bid.owner.productId === ownerProductId &&
                bid.bidder.productId === bidderProductId
              );
            });

            if (bid) resolve(true)
            else resolve(false);
          }
        });
    });
  });
}

module.exports = isExists;
