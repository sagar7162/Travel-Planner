const Trip = require("../models/Trip");
const User = require("../models/User");
const { decode } = require("../middlewares/authMiddleware");

// iss file me logged in user k trips ki list, create new trip, trip me user add, trip delete karne k function h



//get array of all created trips

const getTrips = async(req, res)=>{

  if(!req.cookies.authToken){
    return res.status(401).json({error : "please signin first"});
  }

  const userObj = await decode(req.cookies.authToken);
  res.status(201).json({trips : userObj.trips});
}

//creating trip

const createNewTrip = async (req, res) => {

  /*{
    "name" : "",
    "startDate" : ,
    "endDate" : ,
  }*/
  let { name, startDate, endDate } = req.body;

  const currUser = await decode(req.cookies.authToken);
  if (!currUser) {
    res.json({
      error: "user not authenticated!",
    });
  }

  //create new trip
  try {
    const newTrip = await Trip.create({
      name,
      startDate,
      endDate,
      users: [currUser._id],
    });

    //add newly created trip id into trips array of user

    await User.findByIdAndUpdate(
      currUser._id,
      { $push: { trips: newTrip._id } }, // Add the new trip's _id to the user's trips array
      { new: true } // Return the updated user document
    );

    res.status(201).json({
      message: "Trip created successfully",
      trip: newTrip,
    });
  } catch {
    console.error("Error creating trip:", error);
    res.status(500).json({ message: "Error creating trip", error });
  }
};

// add users to a trip

const addUsers = async (req, res) => {
  //req.body = {add : [email1, email2...]}
  let userArr = req.body.add;

  const tripId = req.params.id; // Access the trip ID from the URL
  const changeTrip = await Trip.findById(tripId);

  if (!changeTrip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  try {
    // Use Promise.all with map to handle asynchronous user lookups
    const userIds = await Promise.all(
      userArr.map(async (email) => {
        const user = await User.findOne({ email });
        if (!user) {
          // Throw an error for missing user
          throw new Error(`User with email ${email} not found`);
        }
        return user._id; // Return the user's ID if found
      })
    );

    // Add the found user IDs to the trip's users array
    changeTrip.users.push(...userIds);

    // Save the updated trip document
    await changeTrip.save();

    res.status(200).json({
      message: "Users added to the trip successfully",
      trip: changeTrip,
    });
  } catch (error) {
    console.error("Error adding users to trip:", error);
    res.status(500).json({ message: "Error adding users to trip", error });
  }
};


//delete a trip

const deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    
    // Find the trip document
    const delTrip = await Trip.findById(tripId);
    if (!delTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const users = delTrip.users; // Get the array of user IDs
    
    // Loop through each user ID and update their trips array
    for (let userId of users) {
      // Find the user document
      let delTripFrmUsr = await User.findById(userId);
      if (!delTripFrmUsr) {
        continue;  // If user not found, skip this user
      }

      let arr = delTripFrmUsr.trips;
      
      // Remove the tripId from the user's trips array
      arr.pull(tripId);
      
      // Save the updated user document
      await delTripFrmUsr.save();
    }

    // Now delete the trip document
    await Trip.findByIdAndDelete(tripId);
    
    // Respond with a success message
    res.status(200).json({ message: "Trip deleted successfully, and users updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = { createNewTrip, addUsers, deleteTrip, getTrips };
