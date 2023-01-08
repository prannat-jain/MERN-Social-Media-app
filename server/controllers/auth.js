//encryption password
import bcrypt from "bcrypt";
//web token for authorization
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*REGISTERING A USER*/

//call to a mongo database is always asynchronous, req is the request data from the front end, res is response thats sent back to the front end
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    //create a random salt provided by bcrypt, use this salt to encrypt our password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //instantiating new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
    });

    const savedUser = await newUser.save();
    //response by a user is converted to json for dev to interpret, and a status code 201 is sent to front end
    res.status(201).json(savedUser);
  } catch (err) {
    //error with status code 500 is sent to front end
    res.status(500).json({ error: err.message });
  }
};

/*LOGGING IN*/
export const login = async (req, res) => {
  try {
    //destructuring email and password from req
    const { email, password } = req.body;

    //using mongoose to find user with the specified/given email
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    //using bcrypt to check is the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

    //creating a web token by signing with user id and a secret string STORED IN env
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
