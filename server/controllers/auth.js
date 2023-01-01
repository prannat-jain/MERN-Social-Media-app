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
