const express = require('express')
const connect = require('./database/connection')
const cors = require('cors');
const employeeRoutes = require("./routes/employeeRoutes");
require('dotenv').config({ path: "./config.env"});
const PORT = process.env.PORT || 5002 ;
const path = require('path');

const app = express();
app.use(express.json());

app.use(cors({
    origin:"*",
    methods:['GET','POST','UPDATE','DELETE','PUT']
}))

connect();

app.use("/auth",require("./routes/auth"));
app.use("/api/employees", employeeRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
