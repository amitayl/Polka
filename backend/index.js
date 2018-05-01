const express = require('express');
const bodyParser = require('body-parser');
const cors = require('express-cors');

const app = express()
app.use(cors({
    allowedOrigins: [
        'localhost:8080', '127.0.0.1:8080'
    ]
}))
app.use(bodyParser());

const addCarRoutes = require('./routes/CarRoute')
addCarRoutes(app)
const addUserRoutes = require ('./routes/UserRoute')
addUserRoutes(app)
const addPetRoutes = require ('./routes/PetRoute')
addPetRoutes(app)

app.listen(3000, 
    () => console.log('Example app listening on port 3000!')
)


















// CarService
//     // .addCar('Subaru')
//     // .then(_ => {
//         CarService.getCars()
//         .then(cars => {
//             console.log('index cars:', cars);
//         })
//         .catch(err => {
//             console.error(err.message.red);
//         })

//     // })



