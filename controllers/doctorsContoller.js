const Doctors = require("../models/doctors");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const getAllDoctors = async (req, res) => {
   console.log(req.get('host'));
   const allDoctors = await Doctors.find({});
   res.send(allDoctors);
}

const createDoctors = async (req, res) => {
   try {
      const newDoctor = new Doctors({ ...req.body, avatar: req.file ? `/uploads/doctors/${req.file.filename}` : 'none' });
      const savedDoctor = await newDoctor.save();
      res.send(savedDoctor);
   } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
         // Send a custom error response to the client
         res.status(400).send('same Doctor already exists');
      } else {
         res.status(500).send('Error: ' + err.message);
      }
   }
}

const updateDoctors = async (req, res) => {
   try {
      const updatedDoctor = await Doctors.findOneAndUpdate({ _id: req.params.id }, req.body, {
         new: true
      });
      res.send(updatedDoctor);
   } catch (err) {
      res.status(500).send('Error: ' + err.message);
   }
}

const loginDoctor = async (req, res) => {
   const { login, password, rememberMe } = req.body;
   const foundDoc = await Doctors.findOne({ doctorLogin: login, password });
   if (!foundDoc) {
      return res.status(401).json({ error: 'Invalid username or password' });
   }

   const token = jwt.sign({ userId: foundDoc._id }, process.env.SECRET_COOKIES_KEY, {
      expiresIn: '1h', // Token expiration time
   });

   const refreshToken = jwt.sign({ userId: foundDoc._id }, process.env.SECRET_REFRESH_KEY, {
      expiresIn: '14d', // Refresh token expiration time (longer)
   });

   const refreshTokenCookieConfig = rememberMe ? { httpOnly: true, expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) } : { httpOnly: true }

   res.cookie('token', token, { httpOnly: true });
   res.cookie('refreshToken', refreshToken, refreshTokenCookieConfig);

   return res.status(200).json({ msg: 'Login successful', user: foundDoc });
}
const deleteDoctors = async (req, res) => {
   const deletedDoctor = await Doctors.deleteOne({ _id: req.params.id });
   res.send(deletedDoctor);
}


module.exports = {
   deleteDoctors,
   updateDoctors,
   createDoctors,
   getAllDoctors,
   loginDoctor
}