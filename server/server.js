const express = require('express')
const connect = require('./database/connection')
const cors = require('cors');
const employeeRoutes = require("./routes/employeeRoutes");
require('dotenv').config({ path: "./config.env"});
const PORT = process.env.PORT || 5002 ;

// create express instance
const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin:"*",
    // Change origin to client URL on Production
    methods:['GET','POST','UPDATE','DELETE','PUT']
}))

// database connection
connect();
app.use("/auth",require("./routes/auth"));
app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
