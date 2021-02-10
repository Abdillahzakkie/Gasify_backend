const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/index');
const undgTransferRouter = require('./routes/referral.router');

const { loadBlockchainData } = require('./helpers/index')


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api/v1/referrer/", undgTransferRouter);

app.listen(port, async () => {
    await connectDB();
    await loadBlockchainData();
    console.log(`Server listeninig at port: http://localhost:${port}`)
});

