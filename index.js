const express = require('express');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();
const app = express();
app.use(express.json());

const authRoutes    = require('./routes/auth');
const careerRoutes  = require('./routes/career');
const driverRoutes  = require('./routes/drivers');
const teamRoutes    = require('./routes/teams');
const raceeventsRoutes = require('./routes/race-events')

app.use('/api/auth',    authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/teams',   teamRoutes);
app.use('/api/race-events', raceeventsRoutes);

db.getConnection().then(connec => {
    console.log("Connexion BDD réussie");
    connec.release();
}).catch(err => {
    console.error("Connexion à la BDD échouée", err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});