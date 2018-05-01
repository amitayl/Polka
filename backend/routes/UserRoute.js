const UserService = require('../services/UserService')


module.exports = (app) => {

    app.post(`/signup`, (req, res) => {
        const user = req.body;
        UserService.addUser(user)
            .then(addedUser => res.json(addedUser))
            .catch(err => {
                console.log(err)
                res.status(500).send('Could not add car')
            })
    })
    app.post('/checkLogin', (req, res) => {
        const credentials = req.body
        UserService.checkLogin(credentials)
            .then(user => res.json(user))
            .catch(err => res.status(401).send('Wrong user/pass'))
    });



}

