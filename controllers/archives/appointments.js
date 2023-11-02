const { AppointmentsArchive } = require("../../models/appointments");

const getAllAppointments = async (req, res) => {
   const { startDate, endDate } = req.body;
   try {
      const allAppointments = await AppointmentsArchive.find({
         createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
         }
      }).sort({ createdAt: -1 });
      res.send(allAppointments);
   } catch (error) {
      // Handle error appropriately, e.g., send an error response
      console.error(error);
      res.status(500).send("Internal Server Error");
   }
}

module.exports = {
   getAllAppointments
}