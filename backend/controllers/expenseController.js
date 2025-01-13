const Trip = require("../models/Trip");
const { decode } = require("../middlewares/authMiddleware");

const userObj = await decode(req.cookies.authToken);
const userId = userObj._id;

const editExpense = async (req, res) => {
  /*
    req.body = {
        subDestId : xyz
        cost : xyz
    }
    */
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId); // Find the trip by ID
    const { cost, subDestId } = req.body;
    const subDestination = await trip.subDestinations.id(subDestId);
    
    const expenditures = subDestination.expenditures;
    let found = false;
    for(let obj in expenditures){
        if(obj.user == userId){
            found = true;
            obj.amount = cost;
        }
    }

    if(!found){
        expenditures.push({
            user : userId,
            amount : cost
        })
    }
  } catch (error) {
    res.status(402).json({
        error : error
    })
  }
};




module.exports = {editExpense};