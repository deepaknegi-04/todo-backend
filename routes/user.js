const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../db/index")
const { signupSchema } = require("../types");

router.post(("/signup"), async (req, res) => {

    const userInputs = signupSchema.safeParse(req.body);

    if (userInputs.success) {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            password: hashedPassword
        })

        if (newUser) {
            res.status(200).json({
                msg: "User SignUp Successful!"
            })
        }
        else {
            res.json({
                msg: "Error SignUp!"
            })
        }
    } else {
        res.json({
            msg: "Invalid Inputs!"
        })
    }

})



router.post("/signin", async (req, res) => {
    const userInputs = signupSchema.safeParse(req.body);

    if (!userInputs.success) {
        return res.status(400).json({ msg: "Invalid inputs!" });
    }

    const { username, password } = userInputs.data;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password!" });
        }

        const jwtToken = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            msg: "User SignIn Successful!",
            token: jwtToken,
        });

    } catch (err) {
        res.status(500).json({ msg: "Server error during signIn", error: err.message });
    }
});


module.exports = router