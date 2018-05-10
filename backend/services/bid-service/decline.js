const DBService = require('../DBService.js');
const mongo = require('mongodb');
const Bid = require('../../classes/BidClass.js');

function decline(bid) {
  return new Promise((resolve, reject) => {
    // const prms = [];
    console.log({ bid });

    // createTransaction();
    // removeBidfromBids();
    // removeBidfromOwnerBidIds();
    // pushNotificaitonToOwner();

    // draw failed transactions from DB with linkList created();
  });
}

function createTransaction() {
  
}

module.exports = decline;
