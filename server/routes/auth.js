import express from "express";
import {register, login} from "../controllers/auth.js";
import authMiddleware from "../middlewares/auth.js";
const router= express.Router();
//const auth = require("../middlewares/auth.js");


router.post('/register', register);
router.post('/login', login);
router.get("/me", authMiddleware, async(req,res) =>{
    return res.status(200).json({...req.user._doc})
})

export default router;