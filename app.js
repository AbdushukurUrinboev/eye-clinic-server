const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.pluralize(null);

const cookieParser = require('cookie-parser');
const http = require('http');
// const initializeSocket = require('./socket');
const { authenticateToken } = require("./custom-middlewares/authToken")

// api routes

const patientsRoutes = require('./routes/patientsRoutes');
const doctorsRoutes = require('./routes/doctorsRoutes');
const diseaseRoutes = require('./routes/diseasesRoutes');
const categoryRoutes = require('./routes/treatmentCategoryRoutes');
const appointmentsRoutes = require('./routes/appointments');
const patientDeptsRoutes = require('./routes/depts');
const { createAdminUser } = require("./controllers/actions/users")
const usersRoutes = require("./routes/userRoutes")
// archives
const archiveAppointmentsRoutes = require('./routes/appointments-archive');
const paymentRoutes = require('./routes/payments');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://el-aziz.vercel.app");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept-Type"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: true, // Replace with your client's origin
    credentials: true, // Allow cookies
}));

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_REMOTE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}


const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`MongoDB Connection Error: ${err}`);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
    // create admin if not already
    createAdminUser();
});

const server = http.createServer(app);



app.use('/api/patients', authenticateToken, patientsRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/departments', authenticateToken, categoryRoutes);
app.use('/api/diseases', authenticateToken, diseaseRoutes);
app.use('/api/appointments', authenticateToken, appointmentsRoutes);
app.use('/api/patient-depts', authenticateToken, patientDeptsRoutes);
// archives
app.use('/api/appointments-archive', authenticateToken, archiveAppointmentsRoutes);
app.use('/api/paymentRoutes', authenticateToken, paymentRoutes);

// const io = initializeSocket(server);

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;