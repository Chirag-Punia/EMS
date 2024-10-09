const mongoose = require("mongoose");
const connect = async () => {
    try {
        // mongodb connection
        const con = await mongoose.connect("mongodb+srv://cpuniabe21:RH7bxwKzcPyljZgR@cluster0.zxrnern.mongodb.net/", {
            dbName : "emp"
        });

        console.log(`MongoDB connected : ${con.connection.host}`);
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connect;
