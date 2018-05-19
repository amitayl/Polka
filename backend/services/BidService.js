const TransactionService = require('./TransactionService')
const DBService = require('./DBService')
const send = require('./bid-service/send.js');
const accept = require('./bid-service/accept.js');
const decline = require('./bid-service/decline.js');
const isExists = require('./bid-service/isExists.js');
const mongo = require('mongodb');

function remove(bid) {
  // let bid_id = new mongo.ObjectID(bidId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect()
      .then(db => {
        db.collection('bids').deleteOne({ _id: bid._id }, function (err, res) {
          if (err) reject(err)
          else {
            resolve();
          }      
      })
    })
  })
}

module.exports = {
  send,
  accept,
  decline,
  isExists,
  remove
};