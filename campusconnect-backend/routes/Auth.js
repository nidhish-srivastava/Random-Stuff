import express from "express"
const router = express.Router()
import { Auth, User } from '../db/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { authenticateJwt } from '../middleware/auth.js'
import { uploadImage} from '../utils/index.js'
import {v2 as cloudinary} from 'cloudinary'
import { nanoid } from 'nanoid'
nanoid();
import { defaultImage } from "../utils/index.js"


router.get('/me', authenticateJwt, async (req, res) => {
    const admin = await Auth.findOne({ username: req.user.username })
    if (!admin) {
        res.status(403).json({ msg: "User doesnt exist" })
        return
    }
    res.json({
        username: admin.username,
        id: admin._id,
        dp : admin.dp
    })
})


const userCreatePromise = async(newAdmin) =>{
    // console.log("user create promise");
    await User.create({
        authId: newAdmin._id,
        username: newAdmin.username,
        followers: [],
        following: []
    })
}

router.put('/removeDp',async(req,res)=>{
    const {user,public_id} = req.body
    try {
        const removeRes = await cloudinary.uploader.destroy(public_id)
            const response = await Auth.findOneAndUpdate({ username:user }, {
                 dp: defaultImage ,
              },{new : true});
              res.status(200).json(response.dp);
    } catch (error) {
        
    }
})


router.post('/uploadImage',async(req,res)=>{
    const {username,dp} = req.body
    const imageId = nanoid().split('-')[0]
    try {
        const imageUrl = await uploadImage(dp,imageId)
        const response = await Auth.updateOne({username : username},{dp : imageUrl})
        if(response.modifiedCount>0){
            res.sendStatus(201)
        }
    } catch (error) {
        
    }
})


router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    try {
        const admin = await Auth.findOne({username})
        if (admin) {
            res.status(403).json({ message: "User already exists" })
        }
        else {
            const newAdmin = new Auth({ username: username, password: bcrypt.hashSync(password) })
            await newAdmin.save()
            const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: '1d' })
            res.json({ message: "User created successfully", token })
            await userCreatePromise(newAdmin)
        }
    }
    catch (error) {
    }
}
)

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Auth.findOne({ username });
        if (!user) {
            return res.status(403).json({ message: 'Invalid username or password' });
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result) {
                const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: '1d' });
                return res.status(200).json({ message: 'Logged in successfully', token, user });
            } else {
                return res.status(401).json({ message: 'Password does not match' });
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



export default router