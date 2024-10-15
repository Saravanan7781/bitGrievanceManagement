const User = require('../models/loginSchema');

const createUser = async(req,res) => {
    console.log("Create user called"); // Add this to check if it's being hit.
    try{
        const { name,password,email,phone, rollno,roomNo,hostel,caretakerName, role} = req.body;
        console.log(req.body); // Log the request body to check if the data is correct.
        const newUser = new User({
            name,password,email,phone,rollno,roomNo,hostel,caretakerName,role
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch(err) {
        console.error("Error:", err.message); // Add this to see any error messages.
        res.status(400).json({message: err.message});
    }
};


const getAllUsers = async(req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Update user by ID
  const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

module.exports ={
    createUser,getAllUsers,getUserById,updateUser
}
