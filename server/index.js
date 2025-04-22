const express = require('express');
const cors = require('cors');
const RunServer = require('./Database/connection');
const signupRouter = require('./Routes/signupRoutes');


const app = express();
const port=5000;
RunServer();
app.use(express.json());
app.use(cors());

app.use('/api/user',signupRouter);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});