const Users = require("./../models/users");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const getAllUsers = async (req, res) => {
    const allDiseases = await Users.find({});
    res.send(allDiseases);
}

const createUser = async (req, res) => {
    try {
        const newUser = new Users(req.body);
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            // Send a custom error response to the client
            res.status(400).send('already have a user with same login');
        } else {
            res.status(500).send('Error: ' + err.message);
        }
    }
}


const updateUser = async (req, res) => {
    try {
        const updatedUser = await Users.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });
        res.send(updatedUser);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}

const getOneUser = async (req, res) => {
    try {
        const foundUser = await Users.findOne({ _id: req.params.id });
        res.send(foundUser);
    } catch (error) {
        res.status(404).json({ error: 'user not found' });
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(204).json({ msg: "logout success" });
}

const loginUser = async (req, res) => {
    const { login, password, rememberMe } = req.body;
    const foundUser = await Users.findOne({ login, password });
    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_COOKIES_KEY, {
        expiresIn: '1h', // Token expiration time
    });

    const refreshToken = jwt.sign({ userId: foundUser._id }, process.env.SECRET_REFRESH_KEY, {
        expiresIn: '14d', // Refresh token expiration time (longer)
    });

    const refreshTokenCookieConfig = rememberMe ? { httpOnly: true, expires: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000), sameSite: 'None', secure: true } : { httpOnly: true, sameSite: 'None', secure: true }

    res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true });
    res.cookie('refreshToken', refreshToken, refreshTokenCookieConfig);

    return res.status(200).json({ msg: 'Login successful', user: foundUser });
}

module.exports = {
    getAllUsers,
    createUser,
    logoutUser,
    loginUser,
    updateUser,
    getOneUser
}