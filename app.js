const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// api routes
mongoose.pluralize(null);

const patientsRoutes = require('./routes/patientsRoutes');
const doctorsRoutes = require('./routes/doctorsRoutes');
const diseaseRoutes = require('./routes/diseasesRoutes');
const categoryRoutes = require('./routes/treatmentCategoryRoutes');


dotenv.config();

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept-Type"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI, {
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
});

app.use('/api/patients', patientsRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/departments', categoryRoutes);
app.use('/api/diseases', diseaseRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});