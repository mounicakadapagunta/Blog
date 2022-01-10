const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//post-to publish//get-to fetch data
//put-to edit or update data
//delete- to delete data

//Register
//posting the user-creating data
router.post("/register", async (req, res) => {
    try {
        //to secure password we are using hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })
        //saving the user 
        const user = await newUser.save();
        res.status(200).json(user);


    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong Credentials!");

        //matching userpssword with hashed password
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong Credentials!");

        //to stop sending the hashed password to the username
        const { password, ...others } = user._doc;
        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router