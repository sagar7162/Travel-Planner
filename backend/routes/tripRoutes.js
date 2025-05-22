const express = require("express");
const router = express.Router();
const {createNewTrip, addUsers, deleteTrip, getTrips, getTripUsers} = require('../controllers/tripController');

router.get('/trip', getTrips);

router.post('/trip/new', createNewTrip);

router.put('/trip/:id/users', addUsers);

router.get('/trip/:id/users', getTripUsers);

router.delete('/trip/:id/trip', deleteTrip);


module.exports = router;