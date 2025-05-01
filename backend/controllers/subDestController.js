const Trip = require("../models/Trip");

const createSubDest = async (req, res) => {
  try {
    const { name, description } = req.body.subDestinations; // Destructure name and description from the body

    const tripId = req.params.id;
    const trip = await Trip.findById(tripId); // Find the trip by ID

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Push the new subDestination to the subDestinations array
    trip.subDestinations.push({
      name: name,
      description: description,
      expenditures: [],
    });

    // Save the updated trip
    await trip.save();

    // Send a response back to the client
    res.status(200).json({
      message: "Sub-destination added successfully",
      subDestination: {
        name,
        description,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



const editSubDest = async (req, res) => {
try{
  const { subDestId, name, description } = req.body;
  const trip = await Trip.findById(req.params.id); // Find the trip by ID
  const subDestination = trip.subDestinations.id(subDestId);

  if (name) subDestination.name = name;
  if (description) subDestination.description = description;

  trip.save();

  res.status(200).json({
    message: "Sub-destination updated successfully",
    subDestination,
});
} catch(error){
    res.status(401).json(
        {
            error : "server error"
        }
    )
}
};


const deleteSubDest = async (req, res)=>{
    try{
        const { subDestId, name, description } = req.body;
        const trip = await Trip.findById(req.params.id); // Find the trip by ID
        const subDestination = trip.subDestinations.id(subDestId);

        if (!subDestination) {
            return res.status(404).json({ message: "Sub-destination not found" });
        }

        subDestination.remove(); // Remove the sub-destination

        // Save the updated trip
        await trip.save();

        res.status(201).josn(
            {
                message : 'deleted successfully'
            }
        )
    }
    catch(error){
        res.json({
            error : error
        })
    }
}


const sendSubTrips = async (req, res)=>{
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId); // Find the trip by ID

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
  let resSend = [];
    for(subdes of trip.subDestinations){
      console.log(subdes);
      resSend.push(subdes);
    }

    res.json({
      message : "subdestinations",
      subdestinations : resSend
    })

}catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = { createSubDest , editSubDest, deleteSubDest, sendSubTrips};
