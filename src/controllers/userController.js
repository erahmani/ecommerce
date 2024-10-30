const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.createUser = async(req, res)=>{
    const{username, password, email} = req.body;
    try{
        const existingUser = await User.exists({email})
        if(existingUser){
            return res.status(400).json({message: 'User already exists.'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, password: hashedPassword, email});
        await newUser.save();
        res.status(201).json({message: 'User created successfully', user:{_id: newUser._id, userName: newUser.username, 
            email: newUser.email, createdAt: newUser.createdAt}})
    }catch(error){
        res.status(500).json({message:'Error creating user', error})
    }
}

exports.getAllUsers = async (req,res) => {
    try{
        const users = await User.find({},'-password -__v');
        res.status(200).json(users ?? {});
    }catch(error){
        res.status(500).json({message:'Error retrieving users', error})
    }
};

exports.getUserById = async(req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findById(id,'-password -__v -_id');
        if(!user){
            res.status(404).json({message:'User not found.'})
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:'Error retrieving user', error });
    }
};

exports.updateUser = async (req,res)=> {
    try{
        const {username, email} = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { username, email }, { projection:'-password -__v -id', new:true, runValidators:true})
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.json({message:'User updated successfully', user})
    }catch(error){
        res.status(500).json({message:'Error updating user',error});
    }    
};

exports.deleteUser = async(req, res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).json({message:'User not found'});
        }
        res.json({message:'User deleted successfully'})
    }catch(error){
        res.status(500).json({ message: 'Error deleting user', error });
    }
}
