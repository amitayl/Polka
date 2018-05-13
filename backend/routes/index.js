module.exports = app => {
    const addUserRoutes = require('./UserRoutes.js');
    addUserRoutes(app);
    
    const addProductRoutes = require('./ProductRoutes.js');
    addProductRoutes(app);
    
    const addBidRoutes = require('./BidRoutes.js');
    addBidRoutes(app);
    
    const addNotificationRoutes = require('./NotificationRoutes.js');
    addNotificationRoutes(app);

    // const addTransactionRoutes = require('./TransactionRoutes.js');
    // addTransactionRoutes(app);
}