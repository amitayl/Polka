const mongo = require('mongodb');

class Bid {
  constructor({ owner, bidder }) {
    this.createdAt = Date.now();
    this.owner = owner;
    this.bidder = bidder;
  }
}

module.exports = Bid;
