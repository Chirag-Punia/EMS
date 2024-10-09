const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../models/admin");
const user = mongoose.model("user", userSchema);
const jwt = require("jsonwebtoken");
const { SECRET,authenticateJwt } = require("../middleware/auth");

router.post("/login",async (req, res) => {
    const { email, password } = req.body;
    await user.findOne({ email }).then((user) => {
        if (user) {
            if (password !== user.password) {
                res.json({ msg: "Wrong password" });
            } else {
                const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
                res.json({ msg: "Login successfully", user, token });
            }
        } else {
            console.log("User does not exist");
            res.json({ msg: "User does not exist" });

        }
    });
});
router.get("/me", authenticateJwt, async (req, res) => {
    await user.findOne({ _id: req.headers.userID }).then((user) => {
        if (user) {
            res.json({ user });
        } else {
            res.json({ message: "User not logged in" });
        }
    });
});

module.exports = router;