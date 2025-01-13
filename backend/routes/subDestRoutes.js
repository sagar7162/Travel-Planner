const express = require("express");
const router = express.Router();
const {createSubDest , editSubDest, deleteSubDest } = require('../controllers/subDestController');


router.put('/trip/:id/newsubdest', createSubDest);

router.put('/trip/:id/editsubdest', editSubDest);

router.delete('/trip/:id/delsubdest', deleteSubDest);

module.exports = router;