const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const peopleRouter = require("./routes/people.route");
const companiesRouter = require("./routes/companies.route");
const advertisementsRouter = require("./routes/advertisements.route");
const applicationsRouter = require("./routes/application.routes");
const auth = require('./routes/protectedRoutes');
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/people',peopleRouter);
app.use('/auth',auth)
app.use('/companies',companiesRouter)
app.use('/advertisements',advertisementsRouter);
app.use('/applications',applicationsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'route pas trouvée' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});