import User from "../models/user.model.js";
import generateToken from "../ustils/generateToken.js";

const registerUser = async (req, res) => {
    console.log('registerUser', req.body);
    try {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Data is required' });
    }

    const existingUser = await User.findOne({ email });
    console.log('existingUser', existingUser);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user)   {
        generateToken(res, user._id);
        return res.status(201).json({ __id: user._id, name: user.name, email: user.email });
    }

    console.log('registerUser', name, email, password);

    return res.status(201).json({ success: true, message:"User is registered" });
    } catch (error) {
        console.log('Register user error', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export {
    registerUser
};