const getNewBids = require('./notification-service/getNewBids.js');
const getDeclinedBids = require('./notification-service/getDeclinedBids.js');

function query(loggedInUserId) {
  return getNewBids(loggedInUserId).then(bids => {
    console.log(bids);
    getDeclinedBids(loggedInUserId).then(declinedBids => {
      console.log(declinedBids);
    });
    return bids;
  });
}

module.exports = {
  query
};
