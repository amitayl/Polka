const TransactionService = require('./TransactionService')
const DBService = require('./DBService')
const send = require('./bid-service/send.js');
const accept = require('./bid-service/accept.js');
const decline = require('./bid-service/decline.js');
const isExists = require('./bid-service/isExists.js');
const mongo = require('mongodb');

function getBids (userId)
{
  let a = '5afbe389543dfa2e888097bf'
  const b = new mongo.ObjectID(a)


  console.log ('dada')
  return new Promise((resolve, reject) => {
    DBService.dbConnect()
      .then(db => {
        db.collection(DBService.COLLECTIONS.BID)
        // .
        // findOne({{'bidder.productId' : b}})
        
        // .then (x=>{
        //   console.log ('x' ,x);
        //   resolve();
        // })
        // 
        .findOne({'bidder.productId' : b} )
        .then (x=>{
          console.log ('x' ,x);
          resolve();
        })
        // .then 
        

        //   { $project: { _id: 0, prodIds: 1 } },
        //   { $unwind: '$prodIds' },
        //   {
        //     $lookup: {
        //       from: DBService.COLLECTIONS.PRODUCT,
        //       localField: 'prodIds',
        //       foreignField: '_id',
        //       as: 'products'
        //     }
        //   },
        // ])
        // .toArray(x=> {
        //   console.log ('x' , x)
        //   resolve();
        // })
       
        
        })
      })

}

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
  remove,
  getBids

};