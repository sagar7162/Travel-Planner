const express = require("express");
const router = express.Router();
const {createSubDest , editSubDest, deleteSubDest, sendSubTrips } = require('../controllers/subDestController');

router.get('/trip/:id/subdestinations', sendSubTrips);

router.put('/trip/:id/newsubdest', createSubDest);

router.put('/trip/:id/editsubdest', editSubDest);

router.delete('/trip/:id/delsubdest', deleteSubDest);

module.exports = router;