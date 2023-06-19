import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password)
    return res.status(400).json({error: `Please enter the all required field`});

    //name validation
    if(name.length >= 25)
    return res.status(400).json({error: "name can only be less than 25 characters"})

    //email validation
    const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailReg.test(email))
    return res.status(400).json
    ({error: `please enter a valid email address`})

    //password validation
    if(password.length <= 6)
    return res.status(400).json({error: `password must be atleast 6 characters`})

    try{
        const doesUserAlreadyExist = await User.findOne({email})
        if(doesUserAlreadyExist)
        return res.status(400).json
        ({error: 'this email has already exists so please try another one'})
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({name, email, password:hashedPassword})
        //save the user
        const result = await newUser.save();
        result._doc.password= undefined;
        return res.status(201).json({...result._doc});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err.message})
    }
}

export const login = async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password)
    return res.status(400).json({error: `Please enter all the required fields`})

    //email validation
    const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailReg.test(email))
    return res.status(400).json
    ({error: `please enter a valid email address`})

    try{
        const doesUserExits = await User.findOne({email})
        if(!doesUserExits)
        return res.status(400).json({error: "Invalid email or password"})

        //if there any user present
        const doesPasswordMatch = await bcrypt.compare(
            password,
            doesUserExits.password
        )
        if(!doesPasswordMatch)
        return res.status(400).json({error: "Invalid email or password"})

        const payload = {_id: doesUserExits._id};
        const token = jwt.sign(payload, process.env.JWT, {
            expiresIn:"1h",
        })
        const user={...doesUserExits._doc, password:undefined};
        return res.status(200).json({token, user})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err.message})
    }
}