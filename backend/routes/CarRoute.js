const CAR_URL = '/data/car';
// const CarService = require('../services/CarServiceWithFile')
const CarService = require('../services/CarService')

module.exports = (app) => {

    app.get(CAR_URL, (req, res) => {
        CarService.getCars()
            .then(cars => {
                res.json(cars)
            })
            .catch(err => res.status(500).send(err.message))
    })


    app.get(`${CAR_URL}/:carId`, (req, res) => {
        const carId = req.params.carId;
        CarService.getById(carId)
            .then(car => {
                res.json(car)
            })
            .catch(err => res.status(500).send(err.message))
    })

    app.delete(`${CAR_URL}/:carId`, (req, res) => {
        const carId = req.params.carId;
        if (!carId) {
            res.status(500).send('Missing CarID to delete')
        }
        CarService
            .deleteCar(carId)
            .then(_ => res.end())
            .catch(err => res.status(500).send('Could not delete car'))
    })
    app.post(CAR_URL, (req, res) => {
        const car = req.body;
        CarService
            .addCar(car)
            .then(car => res.json(car))
            .catch(err => res.status(500).send('Could not add car'))
    })

    app.put(`${CAR_URL}/:carId`, (req, res) => {
        const carId = req.params.carId;
        const car = req.body;
        CarService
            .updateCar(car)
            .then(car => res.json(car))
            .catch(err => res.status(500).send('Could not update car'))
    })

}