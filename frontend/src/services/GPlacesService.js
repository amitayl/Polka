import axios from 'axios';
const API_KEY = "AIzaSyAQx4_iSaU6oOWROI2P7bIoRi7E3EH-h1w";

// console.log(google);    
// service = new google.maps.places.PlacesService(map);
// service.nearbySearch(request, callback);

// `https://maps.googleapis.com/maps/api/js`;
// import(specefier).then(something => {
    // console.log({something});
// })

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getDetailsByCoords({lat, lng}) {
    let prm = axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&key=${API_KEY}`);
}

export default {
    getDetailsByCoords
}