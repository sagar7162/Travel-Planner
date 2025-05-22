const Trip = require("../models/Trip");
const User = require("../models/User");
const { decode } = require("../middlewares/authMiddleware");

// iss file me logged in user k trips ki list, create new trip, trip me user add, trip delete karne k function h

//get array of all created trips

const getTrips = async (req, res) => {
  if (!req.cookies.authToken) {
    return res.status(401).json({ error: "please signin first" });
  }

  try {
    // Decode token to get user id
    const userObj = decode(req.cookies.authToken);

    // Query the database for the updated user data
    //console.log("userObj in getTrips:", userObj);
    const user = await User.findById(userObj._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Use the updated trips array from the database
    let id_tripName = await getTripName(user.trips);
    res.status(200).json({ trips: id_tripName });
  } catch (error) {
    console.error("Error decoding token or fetching trips:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTripName = async (arr) => {
  let nameArr = [];
  
  if (!arr || arr.length === 0) {
    console.log("No trips found for user");
    return nameArr; // Return empty array if no trips
  }
  
  for (let trip of arr) {
    console.log("Fetching trip ID:", trip);
    try {
      let tripObj = await Trip.findById(trip);
      if (!tripObj) {
        console.error(`Trip not found for ID: ${trip}`);
        continue; // Skip this iteration if tripObj is null
      }
      // Return both _id and trip name
      nameArr.push({ _id: tripObj._id, trip: tripObj.name });
    } catch (error) {
      console.error(`Error fetching trip with ID ${trip}:`, error);
      // Continue to next trip even if there's an error
    }
  }
  console.log("Sending to frontend these trips:", nameArr);
  return nameArr;
};

//creating trip

const createNewTrip = async (req, res) => {
  /*{
    "name" : "",
    "startDate" : ,
    "endDate" : ,
  }*/
  let { name, startDate, endDate } = req.body;

  const currUser = decode(req.cookies.authToken);
  if (!currUser) {
    return res.status(401).json({
      error: "user not authenticated!",
    });
  }

  //create new trip
  try {
    // Create the new trip
    const newTrip = await Trip.create({
      name,
      startDate,
      endDate,
      users: [currUser._id],
    });

    console.log("Trip created with ID:", newTrip._id);

    // Find the user and add the trip to their trips array
    const user = await User.findById(currUser._id);
    if (!user) {
      console.error("User not found when adding trip");
      return res.status(404).json({ message: "User not found" });
    }

    // Add the trip to the user's trips array
    user.trips.push(newTrip._id);
    
    // Save the updated user
    await user.save();
    
    console.log("Updated user trips array:", user.trips);

    res.status(201).json({
      message: "Trip created successfully",
      trip: newTrip,
    });
  
  } catch(error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ message: "Error creating trip", error });
  }
};

// add users to a trip

const addUsers = async (req, res) => {
  //req.body = {add : [email1, email2...]}
  let userArr = req.body.add;

  const tripId = req.params.id; // Access the trip ID from the URL
  console.log("adding to trip(backend):", tripId)
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
        //console.log("adding trip to user database...", user)
        user.trips.push(tripId);
        await user.save();
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

// Get users for a specific trip
const getTripUsers = async (req, res) => {
  try {
    if (!req.cookies.authToken) {
      return res.status(401).json({ error: "Please sign in first" });
    }
    
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId).populate('users', 'name email');
    
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }
    
    res.status(200).json({ 
      success: true, 
      users: trip.users
    });
  } catch (error) {
    console.error("Error fetching trip users:", error);
    res.status(500).json({ 
      success: false, 
      error: "Error fetching trip users" 
    });
  }
};

module.exports = { createNewTrip, addUsers, deleteTrip, getTrips, getTripUsers };
