const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://ashil:Superman1275@ac-gawvbv0-shard-00-00.pzyiuyr.mongodb.net:27017,ac-gawvbv0-shard-00-01.pzyiuyr.mongodb.net:27017,ac-gawvbv0-shard-00-02.pzyiuyr.mongodb.net:27017/hackathondb?ssl=true&replicaSet=atlas-mzsy2b-shard-0&authSource=admin&appName=Cluster0').then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch(
    (error) => {
        console.error('Error connecting to MongoDB:', error);
    }
)

const Team = mongoose.model('Team', new mongoose.Schema(
    {
        teamId: String,
        teamName: String,
        teamLeaderName: String,
        leaderEmail: String,
        leaderPhone: Number,
        collegeName: String,
        numberOfMembers: Number,
        projectTitle: String,
        problemStatement: String,
        technologyStack: String,
        mentorName: String,
        registrationDate: String,
        stationNumber: Number
    }
));

app.post('/add-team', async (req, res) => {
    await Team.create(req.body);
    res.json({'status': 'success'});
})

app.post('/view-teams', async (req, res) => {
    const teams = await Team.find();
    res.json(teams);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
